import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnnouncementModalPage } from './announcement-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnnouncementModalPage],
  entryComponents: [AnnouncementModalPage]
})
export class AnnouncementModalPageModule {}
