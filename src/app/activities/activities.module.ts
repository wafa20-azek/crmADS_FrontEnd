import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    DialogModule,
    FieldsetModule,
    SplitButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FileUploadModule,
    HttpClientModule,
    CalendarModule
  ],
  exports:[ActivitiesComponent]
})
export class ActivitiesModule {}
