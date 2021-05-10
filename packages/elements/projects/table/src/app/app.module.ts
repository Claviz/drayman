import { DragDropModule } from '@angular/cdk/drag-drop';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { ButtonModule } from 'projects/button/src/app/app.module';
import { CheckboxModule } from 'projects/checkbox/src/app/app.module';
import { DatepickerModule } from 'projects/datepicker/src/app/app.module';
import { FileUploaderModule } from 'projects/file-uploader/src/app/app.module';
import { NumberFieldModule } from 'projects/number-field/src/app/app.module';
import { SelectModule } from 'projects/select/src/app/app.module';
import { TextFieldModule } from 'projects/text-field/src/app/app.module';
import { TimepickerModule } from 'projects/timepicker/src/app/app.module';

import { SafeHtmlPipe } from '../../../shared/pipes/safe-html';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    ButtonModule,
    MatCheckboxModule,
    TextFieldModule,
    SelectModule,
    FileUploaderModule,
    NumberFieldModule,
    CheckboxModule,
    DatepickerModule,
    TimepickerModule,
  ],
  declarations: [TableComponent, SafeHtmlPipe,],
})
export class TableModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(TableComponent, this.injector);
    const el = createCustomElement(TableComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-table', el);
  }
}