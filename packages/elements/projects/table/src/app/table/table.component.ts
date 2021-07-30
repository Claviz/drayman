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
import { generate } from 'shortid';

import {
  DraymanTable,
  DraymanTableButtonCell,
  DraymanTableCheckboxCell,
  DraymanTableColumn,
  DraymanTableDatepickerCell,
  DraymanTableFileUploaderCell,
  DraymanTableNumberFieldCell,
  DraymanTableRow,
  DraymanTableSelectCell,
  DraymanTableTextCell,
  DraymanTableTextFieldCell,
  DraymanTableTimepickerCell,
  DraymanToolbarButton,
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

  @Input() title?: string;
  @Input() columns: DraymanTableColumn[];
  @Input() data: DraymanTableRow[];
  @Input() rowStyle?: any[];
  @Input() rowDrag?: boolean;
  @Input() search?: boolean;
  @Input() pagination?: boolean;
  @Input() sort?: boolean;
  @Input() pageSize?: number;
  @Input() pageIndex?: number;
  @Input() itemCount?: number;
  @Input() pageSizeOptions?: number[];
  @Input() initialSearchValue?: string;
  @Input() onCellButtonClick?: (data: {
    row: DraymanTableRow;
    field: string;
    rowIndex: number;
  }) => Promise<void>;
  @Input() onRowDragEnd?: (data: {
    row: DraymanTableRow;
    currentIndex: number;
    previousIndex: number;
  }) => Promise<void>;
  @Input() onPageChange?: (data: {
    pageIndex: number;
    pageSize: number;
  }) => Promise<void>;
  @Input() onSortChange?: (data: {
    field: string;
    order: 'asc' | 'desc';
  }) => Promise<void>;
  @Input() onCellValueChange?: (data: {
    row: DraymanTableRow;
    field: string;
    value: any;
    rowIndex: number;
  }) => Promise<void>;
  @Input() onCellClick?: (data: {
    row: DraymanTableRow;
    field: string;
    rowIndex: number;
  }) => Promise<void>;
  @Input() onCellDblClick?: (data: {
    row: DraymanTableRow;
    field: string;
    rowIndex: number;
  }) => Promise<void>;
  @Input() onSearchChange?: (data: {
    value: string
  }) => Promise<void>;
  @Input() disableInternalProcessing?: boolean;
  @Input() disableHeader?: boolean;
  @Input() select?: boolean;
  @Input() toolbarButtons?: DraymanToolbarButton[];
  @Input() onToolbarButtonClick?: (data: {
    selectedRows: {
      row: DraymanTableRow;
      rowIndex: number;
    }[];
    buttonDefinition: DraymanToolbarButton;
  }) => Promise<void>;
  @Input() onSelectSearchChange?: (data: {
    row: DraymanTableRow;
    field: string;
    value: string;
    rowIndex: number;
  }) => Promise<void>;
  @Input() onCellFocus?: (data: {
    row: DraymanTableRow;
    field: string;
    rowIndex: number;
  }) => Promise<void>;
  @Input() onFileUpload?: (data: {
    row: DraymanTableRow;
    field: string;
    rowIndex: number;
  }, files: (File | any)[]) => Promise<string>;
  @Input() onRemoveUploadedFile?: (data: {
    row: DraymanTableRow;
    field: string;
    fileId: string;
    rowIndex: number;
  }) => Promise<string>;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  displayedColumns: string[] = [];
  visibleData: DraymanTableRow[] = [];
  searchControl = new FormControl('');
  loading = false;
  noRecordsCellStyle = {};
  cellClickCount = 0;
  cellClickTimer;
  id = generate();

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
          if (this[actionName]) {
            console.log(this[actionName]);
            this[actionName](parameters).then((x) => {
              console.log(`xxxx`, x);
              this.loading = false
            });
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
          field: this.matSort.active,
          direction: this.matSort.direction,
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
    console.log(changes);
    if (changes.initialSearchValue?.firstChange) {
      this.searchControl.setValue(this.initialSearchValue, { emitEvent: false });
    }
    this.renderVisibleData();
    this.displayedColumns = [...(this.select ? ['__select__'] : []), ...this.columns?.map(x => x.field) || []];
    this.paginator.pageSizeOptions = this.pageSizeOptions || [5, 10, 25, 100];
    this.selection.clear();
  }

  onTableRowDragEnd(event: CdkDragDrop<DraymanTableRow[]>) {
    const data = event.item.data;
    if (this.onRowDragEnd) {
      this.onRowDragEnd({
        row: event.item.data,
        currentIndex: event.currentIndex,
        previousIndex: event.previousIndex,
      });
    }
    const prevIndex = this.visibleData.findIndex((d) => d === data);
    moveItemInArray(this.visibleData, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  onTableCellClick(rowIndex, field: string) {
    this.cellClickCount++;
    if (this.cellClickCount === 1) {
      this.cellClickTimer = setTimeout(() => {
        this.cellClickCount = 0;
        this.onCellClick?.({
          field,
          rowIndex,
          row: this.visibleData[rowIndex],
        });
      }, 400);
    } else if (this.cellClickCount === 2) {
      clearTimeout(this.cellClickTimer);
      this.cellClickCount = 0;
      this.onCellDblClick?.({
        field,
        rowIndex,
        row: this.visibleData[rowIndex],
      });
    }
  }

  renderVisibleData() {
    let newVisibleData = this.data;
    if (!this.disableInternalProcessing) {
      if (this.search) {
        const searchValue = (this.searchControl.value || '').trim().toLowerCase();
        newVisibleData = this.data?.filter(x => {
          for (const key of Object.keys(x)) {
            if (JSON.stringify(x[key].value).trim().toLowerCase().includes(searchValue)) {
              return true;
            }
          }
          return false;
        });
      }
      if (this.matSort.active && this.matSort.direction) {
        newVisibleData = newVisibleData.sort((a, b) => {
          if (a[this.matSort.active].value < b[this.matSort.active].value) {
            return this.matSort.direction === 'asc' ? -1 : 1;
          }
          if (a[this.matSort.active].value > b[this.matSort.active].value) {
            return this.matSort.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      if (this.pagination) {
        this.paginator.length = newVisibleData.length;
        const pageIndex = this.paginator.pageIndex || 0;
        const pageSize = this.paginator.pageSize || 5;
        newVisibleData = newVisibleData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
      }
    } else {
      if (this.pagination) {
        this.paginator.length = this.itemCount;
        this.paginator.pageSize = this.pageSize;
        this.paginator.pageIndex = this.pageIndex;
      }
    }
    this.visibleData = newVisibleData;
    this.renderGrid();
  }

  get rowDragEnabled() {
    return this.rowDrag &&
      !this.pagination &&
      !this.search &&
      !this.sort;
  }

  grid: GridCellType[][] = [];
  currentToolbarButtons: {
    options: DraymanButton;
  }[] = [];
  renderGrid() {
    const newGrid: GridCellType[][] = [];
    for (let rowIndex = 0; rowIndex < this.visibleData.length; rowIndex++) {
      const row: GridCellType[] = [];
      for (let columnIndex = 0; columnIndex < this.columns?.length; columnIndex++) {
        // const column = this.options.columns[columnIndex];
        const field = this.columns[columnIndex].field;
        const cell = { ...this.columns[columnIndex], ...this.visibleData[rowIndex][field] };
        // const style = { ...column.style, ...cell?.style };
        if (cell) {
          if (cell.type === 'button') {
            const buttonCell = cell as DraymanTableButtonCell;
            row.push({
              type: 'button',
              style: cell.style,
              options: {
                label: buttonCell.value,
                disabled: buttonCell.disabled,
                icon: buttonCell.icon,
                imgUrl: buttonCell.imgUrl,
                style: buttonCell.buttonStyle,
                tooltip: buttonCell.tooltip,
                view: buttonCell.view,
                onClick: this.onCellButtonClick ? async () => {
                  return this.onCellButtonClick({
                    row: this.visibleData[rowIndex],
                    field,
                    rowIndex,
                  });
                } : null,
              } as DraymanButton,
            } as GridButtonCell);
          } else if (cell.type === 'text-field') {
            const textFieldCell = cell as DraymanTableTextFieldCell;
            row.push({
              type: 'text-field',
              style: cell.style,
              options: {
                value: textFieldCell.value,
                error: textFieldCell.error,
                disabled: textFieldCell.disabled,
                updateOnBlur: textFieldCell.updateOnBlur,
                appearance: 'standard',
                suggestions: textFieldCell.suggestions,
                suggestionsPanelWidth: textFieldCell.suggestionsPanelWidth,
                mask: textFieldCell.mask,
                onFocus: this.onCellFocus ? async () => {
                  return this.onCellFocus({
                    row: this.visibleData[rowIndex],
                    field,
                    rowIndex,
                  });
                } : null,
                onValueChange: this.onCellValueChange ? async ({ value }) => {
                  return this.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridTextFieldCell);
          } else if (cell.type === 'number-field') {
            const numberFieldCell = cell as DraymanTableNumberFieldCell;
            row.push({
              type: 'number-field',
              style: cell.style,
              options: {
                value: numberFieldCell.value,
                error: numberFieldCell.error,
                disabled: numberFieldCell.disabled,
                updateOnBlur: numberFieldCell.updateOnBlur,
                appearance: 'standard',
                suggestions: numberFieldCell.suggestions,
                suggestionsPanelWidth: numberFieldCell.suggestionsPanelWidth,
                onFocus: this.onCellFocus ? async () => {
                  return this.onCellFocus({
                    row: this.visibleData[rowIndex],
                    field,
                    rowIndex,
                  });
                } : null,
                onValueChange: this.onCellValueChange ? async ({ value }) => {
                  return this.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridNumberFieldCell);
          } else if (cell.type === 'select') {
            const selectCell = cell as DraymanTableSelectCell;
            row.push({
              type: 'select',
              style: cell.style,
              options: {
                disabled: selectCell.disabled,
                error: selectCell.error,
                value: selectCell.value,
                options: selectCell.options,
                appearance: 'standard',
                multiple: selectCell.multiple,
                onValueChange: this.onCellValueChange ? async ({ value }) => {
                  return this.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field,
                    value,
                    rowIndex,
                  });
                } : null,
                onSearchChange: this.onSelectSearchChange ? async ({ value }) => {
                  return this.onSelectSearchChange({
                    row: this.visibleData[rowIndex],
                    field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridSelectCell);
          } else if (cell.type === 'file-uploader') {
            const fileUploaderCell = cell as DraymanTableFileUploaderCell;
            row.push({
              type: 'file-uploader',
              style: cell.style,
              options: {
                allowMultiple: fileUploaderCell.allowMultiple,
                initialFiles: fileUploaderCell.initialFiles,
                onUpload: this.onFileUpload ? async (data, files) => {
                  return this.onFileUpload({
                    row: this.visibleData[rowIndex],
                    field,
                    rowIndex,
                  }, files);
                } : null,
                onRemoveUploaded: this.onRemoveUploadedFile ? async ({ fileId }) => {
                  return this.onRemoveUploadedFile({
                    row: this.visibleData[rowIndex],
                    field,
                    fileId: fileId,
                    rowIndex,
                  });
                } : null,
              },
            } as GridFileUploaderCell);
          } else if (cell.type === 'checkbox') {
            const checkboxFieldCell = cell as DraymanTableCheckboxCell;
            row.push({
              type: 'checkbox',
              style: cell.style,
              options: {
                value: checkboxFieldCell.value,
                disabled: checkboxFieldCell.disabled,
                onValueChange: this.onCellValueChange ? async ({ value }) => {
                  return this.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridCheckboxCell);
          } else if (cell.type === 'datepicker') {
            const datepickerFieldCell = cell as DraymanTableDatepickerCell;
            row.push({
              type: 'datepicker',
              style: cell.style,
              options: {
                value: datepickerFieldCell.value,
                error: datepickerFieldCell.error,
                disabled: datepickerFieldCell.disabled,
                appearance: 'standard',
                dateFormat: datepickerFieldCell.dateFormat,
                showTodayButton: datepickerFieldCell.showTodayButton,
                onValueChange: this.onCellValueChange ? async ({ value }) => {
                  return this.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field,
                    value,
                    rowIndex,
                  });
                } : null,
              },
            } as GridDatepickerCell);
          } else if (cell.type === 'timepicker') {
            const timepickerFieldCell = cell as DraymanTableTimepickerCell;
            row.push({
              type: 'timepicker',
              style: cell.style,
              options: {
                value: timepickerFieldCell.value,
                error: timepickerFieldCell.error,
                disabled: timepickerFieldCell.disabled,
                appearance: 'standard',
                showNowButton: timepickerFieldCell.showNowButton,
                onValueChange: this.onCellValueChange ? async ({ value }) => {
                  return this.onCellValueChange({
                    row: this.visibleData[rowIndex],
                    field,
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
              style: cell.style,
              value: textCell.value,
            } as GridTextCell);
          }
        } else {
          row.push({
            type: 'text',
            style: cell.style,
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
    for (let button of (this.toolbarButtons || [])) {
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
            onClick: this.onToolbarButtonClick ? async () => {
              return this.onToolbarButtonClick({
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
    this.currentToolbarButtons = buttons;
  }
}