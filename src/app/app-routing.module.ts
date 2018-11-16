import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'announcement-modal', loadChildren: './announcement-modal/announcement-modal.module#AnnouncementModalPageModule' },
  { path: 'attendees-list', loadChildren: './attendees-list/attendees-list.module#AttendeesListPageModule' },
  { path: 'change-display-name', loadChildren: './change-display-name/change-display-name.module#ChangeDisplayNamePageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'fitness-class', loadChildren: './fitness-class/fitness-class.module#FitnessClassPageModule' },
  { path: 'fitness-class-modal', loadChildren: './fitness-class-modal/fitness-class-modal.module#FitnessClassModalPageModule' },
  { path: 'fitness-class-registration', loadChildren: './fitness-class-registration/fitness-class-registration.module#FitnessClassRegistrationPageModule' },
  { path: 'fitness-class-template-modal', loadChildren: './fitness-class-template-modal/fitness-class-template-modal.module#FitnessClassTemplateModalPageModule' },
  { path: 'fitness-classes-calendar', loadChildren: './fitness-classes-calendar/fitness-classes-calendar.module#FitnessClassesCalendarPageModule' },
  { path: 'fitness-type-modal', loadChildren: './fitness-type-modal/fitness-type-modal.module#FitnessTypeModalPageModule' },
  { path: 'instructor-modal', loadChildren: './instructor-modal/instructor-modal.module#InstructorModalPageModule' },
  { path: 'location-modal', loadChildren: './location-modal/location-modal.module#LocationModalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'lookups', loadChildren: './lookups/lookups.module#LookupsPageModule' },
  { path: 'manage-attendees', loadChildren: './manage-attendees/manage-attendees.module#ManageAttendeesPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'registration-report', loadChildren: './registration-report/registration-report.module#RegistrationReportPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
