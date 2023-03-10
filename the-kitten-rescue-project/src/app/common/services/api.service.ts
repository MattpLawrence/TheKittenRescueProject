import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { petFinderCredentials } from 'src/environments/config';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private apiKey: string = petFinderCredentials.apiKey;
  private oAuth: string = petFinderCredentials.oAuth;
  private apiUrl: string = 'https://api.petfinder.com/v2';

  constructor(private http: HttpClient) { }

  // public searchAnimals(animalType: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/animals?type=${animalType}`, {
  //     headers: {
  //       Authorization: `Bearer ${this.oAuth}`
  //     }
  //   });
  // }

  public searchAnimals(animalType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/organizations?location=30338&distance=50&limit=100`, {
      headers: {
        Authorization: `Bearer ${this.oAuth}`
      }
    });
  }
  // public searchAnimals(animalType: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/animals?organization=GA335&limit=100`, {
  //     headers: {
  //       Authorization: `Bearer ${this.oAuth}`
  //     }
  //   });
  // }
}
// curl -d "grant_type=client_credentials&client_id=iqhIcRJ9JJslUyrAkophmSMaw4MCbYMM85pugSbMiz6YWiOoY1&client_secret=UjPsYnNTKtA7j2LBxEW8O1pbOkbu8KvyVtXmHtQ6" https://api.petfinder.com/v2/oauth2/token
