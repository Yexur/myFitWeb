import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, RoleGuard } from './app.services/export.app.servies';

const routes: Routes = [
    { path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'login',
        loadChildren: './login/login.module#LoginPageModule'
    },
    { path: 'home',
        loadChildren: './home/home.module#HomePageModule',
        canActivate: [AuthGuard]
    },
    { path: 'change-display-name',
        loadChildren: './change-display-name/change-display-name.module#ChangeDisplayNamePageModule',
        canActivate: [AuthGuard]
    },
    { path: 'change-password',
        loadChildren: './change-password/change-password.module#ChangePasswordPageModule',
        canActivate: [AuthGuard]
    },
    { path: 'fitness-class',
        loadChildren: './fitness-class/fitness-class.module#FitnessClassPageModule',
        canActivate: [AuthGuard],
        children: [
            { path: 'fitness-class-registration/:fitnessClassId',
                loadChildren: './fitness-class-registration/fitness-class-registration.module#FitnessClassRegistrationPageModule',
                canActivate: [RoleGuard]
            },
            { path: 'fitness-class-modal',
                loadChildren: './fitness-class-modal/fitness-class-modal.module#FitnessClassModalPageModule',
                canActivate: [RoleGuard]
            }
        ]
    },
    { path: 'fitness-classes-calendar',
        loadChildren: './fitness-classes-calendar/fitness-classes-calendar.module#FitnessClassesCalendarPageModule',
        canActivate: [AuthGuard],
        children: [
            { path: 'fitness-class-modal',
                loadChildren: './fitness-class-modal/fitness-class-modal.module#FitnessClassModalPageModule',
                canActivate: [RoleGuard]
            }
        ]
    },
    { path: 'lookups',
        loadChildren: './lookups/lookups.module#LookupsPageModule',
        canActivate: [RoleGuard],
        children: [
            { path:'fitness-class-template-modal',
                loadChildren: './fitness-class-template-modal/fitness-class-template-modal.module#FitnessClassTemplateModalPageModule',
                canActivate: [RoleGuard]
            },
            { path: 'instructor-modal',
                loadChildren: './instructor-modal/instructor-modal.module#InstructorModalPageModule',
                canActivate: [RoleGuard]
            },
            { path: 'location-modal',
                loadChildren: './location-modal/location-modal.module#LocationModalPageModule',
                canActivate: [RoleGuard]
            }
        ]
    },
    { path: 'manage-attendees',
        loadChildren: './manage-attendees/manage-attendees.module#ManageAttendeesPageModule',
        canActivate: [RoleGuard]
    },
    { path: 'registration',
        loadChildren: './registration/registration.module#RegistrationPageModule',
        canActivate: [AuthGuard]
    },
    { path: 'registration-report',
        loadChildren: './registration-report/registration-report.module#RegistrationReportPageModule',
        canActivate: [RoleGuard]
    },
    { path: 'reset-password',
        loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule'
    },
    { path: 'sign-up/:email',
        loadChildren: './sign-up/sign-up.module#SignUpPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
