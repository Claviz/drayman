import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DraymanButton } from 'projects/shared/models/button-options';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, take, tap } from 'rxjs/operators';

import {
  DraymanTable,
  DraymanTableButtonCell,
  DraymanTableCheckboxCell,
  DraymanTableDatepickerCell,
  DraymanTableFileUploaderCell,
  DraymanTableNumberFieldCell,
  DraymanTableRow,
  DraymanTableSelectCell,
  DraymanTableTextCell,
  DraymanTableTextFieldCell,
  DraymanTableTimepickerCell,
  GridButtonCell,
  GridCellType,
  GridCheckboxCell,
  GridDatepickerCell,
  GridFileUploaderCell,
  GridNumberFieldCell,
  GridSelectCell,
  GridTextCell,
  GridTextFieldCell,
  GridTimepickerCell,
} from '../models/table-options';

@Component({
  selector: 'drayman-table-internal',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() options: DraymanTable;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [];
  visibleData: DraymanTableRow[] = [];
  searchControl = new FormControl('');
  loading = false;
  noRecordsCellStyle = {};
  cellClickCount = 0;
  cellClickTimer;

  pageChange = new Subject();
  sortChange = new Subject();

  selection = new SelectionModel<DraymanTableRow>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visibleData.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.visibleData.forEach(row => this.selection.select(row));
  }
  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    this.ngZone.onMicrotaskEmpty
      .pipe(take(3))
      .subscribe(() => this.table.updateStickyColumnStyles())
  }

  loadingPipe() {
    return (source: Observable<{ actionName: string, parameters: any }>) => {
      return source.pipe(
        tap(() => this.loading = true),
        debounceTime(500),
        tap(({ actionName, parameters }) => {
          if (this.options?.[actionName]) {
            this.options[actionName](parameters).finally(() => this.loading = false);
          } else {
            this.loading = false;
            this.renderVisibleData();
          }
        })
      );
    }
  }

  ngOnInit() {
    this.pageChange.pipe(
      map(() => ({
        actionName: 'onPageChange',
        parameters: {
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
        }
      })),
      this.loadingPipe()
    ).subscribe();
    this.sortChange.pipe(
      map(() => ({
        actionName: 'onSortChange',
        parameters: {
          field: this.sort.active,
          direction: this.sort.direction,
        }
      })),
      this.loadingPipe()
    ).subscribe();
    this.searchControl.valueChanges.pipe(
      map(() => ({
        actionName: 'onSearchChange',
        parameters: {
          value: this.searchControl.value,
        }
      })),
      this.loadingPipe(),
    ).subscribe();
    this.selection.changed.subscribe(() => this.renderGrid());
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      if (changes.options.firstChange) {
        this.searchControl.setValue(this.options?.initialSearchValue, { emitEvent: false });
      }
      this.renderVisibleData();
      this.displayedColumns = [...(this.options?.select ? ['__select__'] : []), ...this.options?.columns?.map(x => x.field) || []];
      this.paginator.pageSizeOptions = this.options?.pageSizeOptions || [5, 10, 25, 100];
      this.selection.clear();
    }
  }

  onRowDragEnd(event: CdkDragDrop<DraymanTableRow[]>) {
    const data = event.item.data;
    if (this.options?.onRowDragEnd) {
      this.options.onRowDragEnd({
        row: event.item.data,
        currentIndex: event.currentIndex,
      });
    }
    const prevIndex = this.visibleData.findIndex((d) => d === data);
    moveItemInArray(this.visibleData, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  onCellClick(rowIndex, field: string) {
    this.cellClickCount++;
    if (this.cellClickCount === 1) {
      this.cellClickTimer = setTimeout(() => {
        this.cellClickCount = 0;
        this.options?.onCellClick?.({
          field,
          rowIndex,
          row: this.visibleData[rowIndex],
        });
      }, 400);
    } else if (this.cellClickCount === 2) {
      clearTimeout(this.cellClickTimer);
      this.cellClickCount = 0;
      this.options?.onCellDblClick?.({
        field,
        rowIndex,
        row: this.visibleData[rowIndex],
      });
    }
  }

  renderVisibleData() {
    let newVisibleData = this.options?.data;
    if (!this.options?.disableInternalProcessing) {
      if (this.options?.search) {
        const searchValue = (this.searchControl.value || '').trim().toLowerCase();
        newVisibleData = this.options?.data?.filter(x => {
          for (const key of Object.keys(x)) {
            if (JSON.stringify(x[key].value).trim().toLowerCase().includes(searchValue)) {
              return true;
            }
          }
          return false;
        });
      }
      if (this.sort.active && this.sort.direction) {
        newVisibleData = newVisibleData.sort((a, b) => {
          if (a[this.sort.active].value < b[this.sort.active].value) {
            return this.sort.direction === 'asc' ? -1 : 1;
          }
          if (a[this.sort.active].value > b[this.sort.active].value) {
            return this.sort.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      if (this.options?.pagination) {
        this.paginator.length = newVisibleData.length;
        newVisibleData = newVisibleData.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize);
      }
    } else {
      if (this.options?.pagination) {
        this.paginator.length = this.options?.itemCount;
        this.paginator.pageSize = this.options?.pageSize;
        this.paginator.pageIndex = this.options?.pageIndex;
      }
    }
    this.visibleData = newVisibleData;
    this.renderGrid();
  }

  get rowDragEnabled() {
    return this.options?.rowDrag &&
      !this.options?.pagination &&
      !this.options?.search &&
      !this.options?.sort;
  }

  grid: GridCellType[][] = [];
  toolbarButtons: {
    options: DraymanButton;
  }[] = [];
  renderGrid() {
    const newGrid: GridCellType[][] = [];
    for (let rowIndex = 0; rowIndex < this.visibleData.length; rowIndex++) {
      const row: GridCellType[] = [];
      for (let columnIndex = 0; columnIndex < this.options?.columns?.length; columnIndex++) {
        const column = this.options.columns[columnIndex];
        const cell = this.visibleData[rowIndex][column.field];
        const style = { ...column.style, ...cell?.style };
        if (cell) {
          const type = cell.type || column.type;
          if (type === 'button') {
            const buttonCell = cell as DraymanTableButtonCell;
            row.push({
              type: 'button',
              style,
              options: {
                label: buttonCell.value,
                disabled: buttonCell.disabled,
                icon: buttonCell.icon,
                imgUrl: buttonCell.imgUrl,
                style: buttonCell.buttonStyle,
                tooltip: buttonCell.tooltip,
                view: buttonCell.view,
                onClick: this.options?.onCellButtonClick ? async () => {
                  return this.options.onCellButtonClick({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    rowIndex,
                  });
                } : null,
              } as DraymanButton,
            } as GridButtonCell);
          } else if (type === 'text-field') {
            const textFieldCell = cell as DraymanTableTextFieldCell;
            row.push({
              type: 'text-field',
              style,
              options: {
                value: textFieldCell.value,
                error: textFieldCell.error,
                disabled: textFieldCell.disabled,
                updateOnBlur: textFieldCell.updateOnBlur,
                appearance: 'standard',
                suggestions: textFieldCell.suggestions,
                suggestionsPanelWidth: textFieldCell.suggestionsPanelWidth,
                mask: textFieldCell.mask,
                onFocus: this.options?.onCellFocus ? async () => {
                  return this.options.onCellFocus({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    rowIndex,
                  });
                } : null,
                onValueChangeStart: this.options?.onCellValueChangeStart ? async () => {
                  return this.options.onCellValueChangeStart();
                } : null,
                onValueChange: this.options?.onCellValueChange ? async ({ value }) => {
                  return this.options.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridTextFieldCell);
          } else if (type === 'number-field') {
            const numberFieldCell = cell as DraymanTableNumberFieldCell;
            row.push({
              type: 'number-field',
              style,
              options: {
                value: numberFieldCell.value,
                error: numberFieldCell.error,
                disabled: numberFieldCell.disabled,
                updateOnBlur: numberFieldCell.updateOnBlur,
                appearance: 'standard',
                suggestions: numberFieldCell.suggestions,
                suggestionsPanelWidth: numberFieldCell.suggestionsPanelWidth,
                onFocus: this.options?.onCellFocus ? async () => {
                  return this.options.onCellFocus({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    rowIndex,
                  });
                } : null,
                onValueChangeStart: this.options?.onCellValueChangeStart ? async () => {
                  return this.options.onCellValueChangeStart();
                } : null,
                onValueChange: this.options?.onCellValueChange ? async ({ value }) => {
                  return this.options.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridNumberFieldCell);
          } else if (type === 'select') {
            const selectCell = cell as DraymanTableSelectCell;
            row.push({
              type: 'select',
              style,
              options: {
                disabled: selectCell.disabled,
                error: selectCell.error,
                value: selectCell.value,
                options: selectCell.options,
                multiple: selectCell.multiple,
                onValueChangeStart: this.options?.onCellValueChangeStart ? async () => {
                  return this.options.onCellValueChangeStart();
                } : null,
                onValueChange: this.options?.onCellValueChange ? async ({ value }) => {
                  return this.options.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    value,
                    rowIndex,
                  });
                } : null,
                onSearchChange: this.options?.onSelectSearchChange ? async ({ value }) => {
                  return this.options.onSelectSearchChange({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridSelectCell);
          } else if (type === 'file-uploader') {
            const fileUploaderCell = cell as DraymanTableFileUploaderCell;
            row.push({
              type: 'file-uploader',
              style,
              options: {
                allowMultiple: fileUploaderCell.allowMultiple,
                initialFiles: fileUploaderCell.initialFiles,
                onUpload: this.options?.onFileUpload ? async (data, files) => {
                  return this.options.onFileUpload({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    rowIndex,
                  }, files);
                } : null,
                onRemoveUploaded: this.options?.onRemoveUploadedFile ? async ({ fileId }) => {
                  return this.options.onRemoveUploadedFile({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    fileId: fileId,
                    rowIndex,
                  });
                } : null,
              },
            } as GridFileUploaderCell);
          } else if (type === 'checkbox') {
            const checkboxFieldCell = cell as DraymanTableCheckboxCell;
            row.push({
              type: 'checkbox',
              style,
              options: {
                value: checkboxFieldCell.value,
                disabled: checkboxFieldCell.disabled,
                onValueChangeStart: this.options?.onCellValueChangeStart ? async () => {
                  return this.options.onCellValueChangeStart();
                } : null,
                onValueChange: this.options?.onCellValueChange ? async ({ value }) => {
                  return this.options.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridCheckboxCell);
          } else if (type === 'datepicker') {
            const datepickerFieldCell = cell as DraymanTableDatepickerCell;
            row.push({
              type: 'datepicker',
              style,
              options: {
                value: datepickerFieldCell.value,
                error: datepickerFieldCell.error,
                disabled: datepickerFieldCell.disabled,
                appearance: 'standard',
                dateFormat: datepickerFieldCell.dateFormat,
                showTodayButton: datepickerFieldCell.showTodayButton,
                onValueChangeStart: this.options?.onCellValueChangeStart ? async () => {
                  return this.options.onCellValueChangeStart();
                } : null,
                onValueChange: this.options?.onCellValueChange ? async ({ value }) => {
                  return this.options.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridDatepickerCell);
          } else if (type === 'timepicker') {
            const timepickerFieldCell = cell as DraymanTableTimepickerCell;
            row.push({
              type: 'timepicker',
              style,
              options: {
                value: timepickerFieldCell.value,
                error: timepickerFieldCell.error,
                disabled: timepickerFieldCell.disabled,
                appearance: 'standard',
                showNowButton: timepickerFieldCell.showNowButton,
                onValueChangeStart: this.options?.onCellValueChangeStart ? async () => {
                  return this.options.onCellValueChangeStart();
                } : null,
                onValueChange: this.options?.onCellValueChange ? async ({ value }) => {
                  return this.options.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field: column.field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridTimepickerCell);
          } else {
            const textCell = cell as DraymanTableTextCell;
            row.push({
              type: 'text',
              style,
              value: textCell.value,
            } as GridTextCell);
          }
        } else {
          row.push({
            type: 'text',
            style,
            value: null,
          } as GridTextCell);
        }
      }
      newGrid.push(row);
    }
    this.grid = newGrid;
    const buttons: {
      options: DraymanButton;
    }[] = [];
    for (let button of (this.options?.toolbarButtons || [])) {
      if (!button.selectionButton || this.selection.hasValue()) {
        const draymanButton: {
          options: DraymanButton;
        } = {
          options: {
            disabled: button.disabled,
            icon: button.icon,
            imgUrl: button.imgUrl,
            label: button.label,
            buttonStyle: button.buttonStyle,
            tooltip: button.tooltip,
            view: button.view,
            onClick: this.options?.onToolbarButtonClick ? async () => {
              return this.options.onToolbarButtonClick({
                selectedRows: this.selection.selected.map(x => ({
                  row: x,
                  rowIndex: this.visibleData.indexOf(x),
                })),
                buttonDefinition: button,
              });
            } : null,
          },
        };
        buttons.push(draymanButton);
      }
    }
    this.toolbarButtons = buttons;
  }
}