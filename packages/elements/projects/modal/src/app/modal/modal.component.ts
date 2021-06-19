import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'drayman-modal-internal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  @Input() onRequestClose?: () => Promise<void>;
  @Input() height?: string;
  @Input() width?: string;
  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;

  dialogRef: MatDialogRef<any>;

  constructor(private dialog: MatDialog) { }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  ngAfterViewInit() {
    const width = this.width || '50vw';
    const height = this.height || '80vh';

    this.dialogRef = this.dialog.open(this.secondDialog, {
      height,
      width,
      maxHeight: height,
      maxWidth: width,
      disableClose: true,
    });
    this.dialogRef.backdropClick().subscribe(() => {
      this.onRequestClose?.();
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

}
