import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'drayman-snack-bar-internal',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements AfterViewInit, OnDestroy {

  @Input() onClose?: (data: any) => Promise<void>;

  @Input() duration?: number;
  @Input() horizontalPosition?: MatSnackBarHorizontalPosition;
  @Input() verticalPosition?: MatSnackBarVerticalPosition;
  @Input() action?: string;
  @Input() message?: string;

  snackBarRef: MatSnackBarRef<any>;

  constructor(private snackBar: MatSnackBar) { }

  ngOnDestroy() {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  ngAfterViewInit() {
    this.snackBarRef = this.snackBar.open(this.message, this.action, {
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.snackBarRef.afterDismissed().subscribe((data) => {
      this.onClose?.({ dismissedByAction: data.dismissedByAction });
      this.snackBarRef = null;
    })
  }

}
