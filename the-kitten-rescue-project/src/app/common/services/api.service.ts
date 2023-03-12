import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
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
  // queryString: string = '/animals?organization=GA335&limit=20';
  queryString: string = '/animals?organization=GA477&limit=20';
  // queryString: string = '/organizations?query=circle'

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  //subjects
  private animalsSubject = new BehaviorSubject<any>(undefined)

  searchAnimals():Observable<any>{
    return new Observable<any>(observer => {

      //with no search or filter function, simply return subject if already set.
      if(this.animalsSubject.value != undefined){
        console.log(this.animalsSubject)
        observer.next(this.animalsSubject);
        observer.complete();
      }else{
        //get oAuth token
        this.authService.getTokenSubject().subscribe(res => {
          if(res){
            let token:string = res;
            this.http.get(`${this.apiUrl}${this.queryString}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).subscribe(response => {
              console.log(response)
              this.setAnimalsSubject(response);
              observer.next(response);
              observer.complete();
            })
          }else observer.next('error');
        })
      }

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

