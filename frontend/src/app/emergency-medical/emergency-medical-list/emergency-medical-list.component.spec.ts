import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyMedicalListComponent } from './emergency-medical-list.component';

describe('EmergencyMedicalListComponent', () => {
  let component: EmergencyMedicalListComponent;
  let fixture: ComponentFixture<EmergencyMedicalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyMedicalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyMedicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
