import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsRoutingModule } from './contacts-routing.module';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { ActivitiesModule } from '../activities/activities.module';
@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    DialogModule,
    FieldsetModule,
    SplitButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    DividerModule,
    SplitterModule,TabViewModule,
    ActivitiesModule
  ],
})
export class ContactsModule {}
