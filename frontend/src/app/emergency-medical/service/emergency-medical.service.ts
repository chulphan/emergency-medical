import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { generateURL } from '../shared/shared';


@Injectable({
  providedIn: 'root'
})
export class EmergencyMedicalService {
  public baseURL;
  constructor(private http: HttpClient) {
    this.baseURL = generateURL('prod');
  }

  fetchEmergencyMedicalList(params: HttpParams) {
    return this.http.get(`${this.baseURL}/hospitals`, {params});
  }

  fetchEmergencyMedical(emergencyId: string) {
    return this.http.get(`${this.baseURL}/hospitals/${emergencyId}`);
  }
}
