import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EmergencyMedicalRoutingModule } from './emergency-medical-routing.module';
import { EmergencyMedicalListComponent } from './emergency-medical-list/emergency-medical-list.component';
import { EmergencyMedicalDetailComponent } from './emergency-medical-detail/emergency-medical-detail.component';



@NgModule({
  declarations: [EmergencyMedicalListComponent, EmergencyMedicalDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    FlexLayoutModule,
    EmergencyMedicalRoutingModule
  ]
})
export class EmergencyMedicalModule { }
