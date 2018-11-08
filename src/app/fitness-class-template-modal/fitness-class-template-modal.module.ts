import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FitnessClassTemplateModalPage } from './fitness-class-template-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessClassTemplateModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FitnessClassTemplateModalPage]
})
export class FitnessClassTemplateModalPageModule {}
