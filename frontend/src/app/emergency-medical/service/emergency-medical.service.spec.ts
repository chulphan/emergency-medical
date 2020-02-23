import { TestBed } from '@angular/core/testing';

import { generateURL } from '../shared/shared'
import { EmergencyMedicalService } from './emergency-medical.service';

describe('EmergencyMedicalService', () => {
  let service: EmergencyMedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyMedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetch data from server in development mode', () => {
    service.baseURL = generateURL('dev');
    expect(service.baseURL).toEqual('http://localhost:5000/api/v1');
  });

  it('fetch data from server in production mode', () => {
    service.baseURL = generateURL('prod');
    expect(service.baseURL).toEqual('http://chulphan.me/api/v1');
  });
});
