import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { ActivitiesComponent } from './activities/activities/activities.component';

const routes: Routes =[
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('src/app/contacts/contacts.module').then(m => m.ContactsModule) 
  },
  {
    path: 'activities',
    loadChildren: () => import('src/app/activities/activities.module').then(m => m.ActivitiesModule) 
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
