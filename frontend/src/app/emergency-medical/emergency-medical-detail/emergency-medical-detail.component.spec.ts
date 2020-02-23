import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyMedicalDetailComponent } from './emergency-medical-detail.component';

describe('EmergencyMedicalDetailComponent', () => {
  let component: EmergencyMedicalDetailComponent;
  let fixture: ComponentFixture<EmergencyMedicalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyMedicalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyMedicalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
