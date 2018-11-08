import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FitnessClassRegistrationPage } from './fitness-class-registration.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessClassRegistrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FitnessClassRegistrationPage]
})
export class FitnessClassRegistrationPageModule {}
