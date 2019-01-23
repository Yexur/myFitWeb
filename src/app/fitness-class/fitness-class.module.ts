import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FitnessClassPage } from './fitness-class.page';
import { FitnessClassModalPageModule } from '../fitness-class-modal/fitness-class-modal.module';

const routes: Routes = [
  {
    path: '',
    component: FitnessClassPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitnessClassModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FitnessClassPage]
})
export class FitnessClassPageModule {}
