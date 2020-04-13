import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { generateURL } from '../shared/shared';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmergencyMedicalService {
  public baseURL;
  constructor(private http: HttpClient) {
    const currentMode = environment.production ? 'prod' : 'dev';
    this.baseURL = generateURL(currentMode);
  }

  fetchEmergencyMedicalList(params: HttpParams) {
    return this.http.get(`${this.baseURL}/hospitals`, { params });
  }

  fetchEmergencyMedical(emergencyId: string) {
    return this.http.get(`${this.baseURL}/hospitals/${emergencyId}`);
  }

  searchEmergencyList(searchPhrase: string) {
    return this.http.get(`${this.baseURL}/hospitals/${searchPhrase}/search`);
  }
}
