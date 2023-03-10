import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * @class - APIService - Class which has methods that are common to the application and apply to APIs
 */

export class APIService {

  //variables
  private apiUrl: string = 'https://api.petfinder.com/v2';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  //subjects
  private animalsSubject = new ReplaySubject<any>(1)

  searchAnimals():Observable<any>{
    return new Observable<any>(observer => {
      //get oAuth token
      this.authService.getTokenSubject().subscribe(res => {
        if(res){
          let token:string = res;
          this.http.get(`${this.apiUrl}/animals?organization=GA335&limit=20`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).subscribe(response => {
            this.setAnimalsSubject(response);
            observer.next(response);
            observer.complete();
          })
        }else observer.next('error');
      })
    })
  }


    //getters and setters
    getAnimalsSubject = () => {
      return this.animalsSubject.asObservable();
    }
  
    setAnimalsSubject = (animals:any) => {
      this.animalsSubject.next(animals)
    }


}
