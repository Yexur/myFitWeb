import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
//import { NgCalendarModule  } from 'ionic2-calendar';
import { FullCalendarModule } from 'ng-fullcalendar';
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
    FullCalendarModule,
    //NgCalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FitnessClassesCalendarPage]
})
export class FitnessClassesCalendarPageModule {}
