import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmergencyMedicalListComponent } from './emergency-medical-list/emergency-medical-list.component';
import { EmergencyMedicalDetailComponent } from './emergency-medical-detail/emergency-medical-detail.component'

const routes: Routes = [
    {
      path: 'hospitals', component: EmergencyMedicalListComponent
    },
    {
      path:'hospitals/:id',
      component: EmergencyMedicalDetailComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmergencyMedicalRoutingModule { }
