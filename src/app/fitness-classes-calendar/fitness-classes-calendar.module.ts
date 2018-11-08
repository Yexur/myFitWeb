import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FitnessClassesCalendarPage } from './fitness-classes-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessClassesCalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FitnessClassesCalendarPage]
})
export class FitnessClassesCalendarPageModule {}
