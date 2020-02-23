import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { EmergencyMedicalService } from '../service/emergency-medical.service';
import { EmergencyMedical } from '../model/emergency-medical-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-medical-list',
  templateUrl: './emergency-medical-list.component.html',
  styleUrls: ['./emergency-medical-list.component.css']
})
export class EmergencyMedicalListComponent implements OnInit {

  offset = 0
  emergencyList: EmergencyMedical[] = [];

  constructor(private emergencyMedicalService: EmergencyMedicalService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEmergencyMedicalList();
  }

  fetchEmergencyMedicalList() {
    if (this.emergencyList.length === 400) {
      return;
    }

    let params = new HttpParams();
    params = params.append('offset', String(this.offset));
    this.emergencyMedicalService.fetchEmergencyMedicalList(params).subscribe((res: Array<EmergencyMedical>) => {  
      console.log(res);    
      this.emergencyList = [...this.emergencyList, ...res];
      this.offset += 4;
    }, err => {
      console.log(err);
    })
  }

  goDetail(emergencyId) {
    this.router.navigate([`/hospitals/${emergencyId}`]).then();
  }

}
