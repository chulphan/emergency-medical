import { Component, OnInit } from '@angular/core';
import { EmergencyMedicalService } from '../service/emergency-medical.service';
import { ActivatedRoute } from '@angular/router';
import { EmergencyMedical } from '../model/emergency-medical-model';

@Component({
  selector: 'app-emergency-medical-detail',
  templateUrl: './emergency-medical-detail.component.html',
  styleUrls: ['./emergency-medical-detail.component.css']
})
export class EmergencyMedicalDetailComponent implements OnInit {

  emergencyMedical: EmergencyMedical;
  htmlMedicalList: string;

  constructor(private emergencyMedicalService: EmergencyMedicalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const emergencyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchEmergencyMedical(emergencyId);
  }

  fetchEmergencyMedical(emergencyId: string) {
    this.emergencyMedicalService.fetchEmergencyMedical(emergencyId).subscribe((emergencyMedicalRes: EmergencyMedical) => {
      this.emergencyMedical = emergencyMedicalRes;
    });
  }

  makeMedicalList(medicalList: string) {
    const splitedByMedicalListByComma = medicalList.split(',');
    const htmlMedicalList = splitedByMedicalListByComma.map((medical, index) => {
      if (index !== 0 && index % 4 == 0) {
        return `<span>${medical}</span><br/>`;
      }
      return `<span>${medical}</span> `;
    });
    // this.htmlMedicalList = htmlMedicalList.join('');
    return htmlMedicalList.join('');
  }

}
