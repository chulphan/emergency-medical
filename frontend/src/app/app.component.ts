import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EmergencyMedicalService } from './emergency-medical/service/emergency-medical.service'
import { EmergencyMedical } from './emergency-medical/model/emergency-medical-model';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from './emergency-medical/shared/common-dialog/common-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '응급실 진료목록';
  isSearchBarOpen: boolean;

  constructor(
    private router: Router,
    private emergencyService: EmergencyMedicalService,
    private dialog: MatDialog,
  ) {

  }

  goMain() {
    this.router.navigate([`/`]).then();
  }

  toggleSearchBar() {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }

  executeSearch($event) {
    const { value } = $event.target;
    console.log(value);
    this.emergencyService.searchEmergencyList(value)
      .subscribe((res: Array<EmergencyMedical>) => {
        const dialogRef = this.dialog.open(CommonDialogComponent, {
          width: '650px',
          data: {
            searchPhrase: value,
            searchList: res
          }
        });
      })
  }
}
