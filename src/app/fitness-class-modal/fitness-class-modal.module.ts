import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FitnessClassModalPage } from './fitness-class-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessClassModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FitnessClassModalPage]
})
export class FitnessClassModalPageModule {}
