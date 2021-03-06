import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageAttendeesPage } from './manage-attendees.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAttendeesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageAttendeesPage]
})
export class ManageAttendeesPageModule {}
