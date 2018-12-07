import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LookupsPage } from './lookups.page';
import { FitnessClassTemplateModalPageModule } from '../fitness-class-template-modal/fitness-class-template-modal.module';
import { InstructorModalPageModule } from '../instructor-modal/instructor-modal.module';
import { LocationModalPageModule } from '../location-modal/location-modal.module';


const routes: Routes = [
  {
    path: '',
    component: LookupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitnessClassTemplateModalPageModule,
    InstructorModalPageModule,
    LocationModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LookupsPage]
})
export class LookupsPageModule {}
