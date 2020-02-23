import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmergencyMedicalListComponent } from './emergency-medical-list/emergency-medical-list.component';

const routes: Routes = [
  {
    path: 'hospitals', component: EmergencyMedicalListComponent,
    children: [
      {
        path: '',
        component: EmergencyMedicalListComponent
      },
    //   {
    //     path:':id',
    //     component: EmerMedicalDetailComponent
    //   }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmergencyMedicalRoutingModule { }
