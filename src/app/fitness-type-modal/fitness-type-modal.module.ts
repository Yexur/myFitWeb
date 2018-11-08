import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FitnessTypeModalPage } from './fitness-type-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessTypeModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FitnessTypeModalPage]
})
export class FitnessTypeModalPageModule {}
