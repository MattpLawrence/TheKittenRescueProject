import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PetDisplay } from '../models/common.model';
import { AdoptionForm } from '../models/form.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * @class - APIService 
 */

export class APIService {

  //variables
  private petFinderUrl: string = 'https://api.petfinder.com/v2';
  // queryString: string = '/animals?organization=GA477&limit=100';
  // bad call to return no results
  queryString: string = '/animals?organization=GA1077&limit=100';

  apiUrl:string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  //subjects
  private animalsSubject = new BehaviorSubject<any>(undefined)
  private currentAnimalsSubject = new BehaviorSubject<any>(undefined)

  
  postApplication = (body:AdoptionForm) => {
    return new Observable(observer => {
      let url: string = `${this.apiUrl}/send` ;
      console.log(url)
      console.log(body)

      this.http.post(url, body).subscribe({
        next: (result:any) => {
            if(result){
              console.log(result);
              observer.next(result);
              observer.complete()
            };
        },
        error: (err: any) => {
          console.log(err)
          // add error logging here
          observer.next(err);
          observer.complete()
        }
      })
    })
  }


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
            this.http.get(`${this.petFinderUrl}${this.queryString}`, {
              headers: {
                
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              }
            }).subscribe({
              next: (result:any) => {  
                console.log(result)    
                this.animalsSubject.next(this.filterData(result))
                observer.next(this.filterData(result));
                observer.complete();
              },
              error: (err: any) => {
                console.log(err)
                // add error logging here
                observer.next(err);
                observer.complete()
              }
            })             
          }else observer.next('error');
        })
      }

    })
  }



  filterData = (response: any):any => {
    //set with animals KVP to match original object
    // let filteredList = {animals: response.animals.filter((object: any) => object.videos.length >= 1)};

    // return filteredList;

    return response;
  }




  //***************getters and setters******************
  getAnimalsSubject = () => {
    return this.animalsSubject.asObservable();
  }

  setAnimalsSubject = (animals:any) => {
    this.animalsSubject.next(animals)
  }

  getCurrentAnimalsSubject = () => {
    return this.currentAnimalsSubject.asObservable();
  }

  setCurrentAnimalsSubject = (animals:PetDisplay) => {
    //take id and set full animal object
    let currentAnimal = this.animalsSubject.value.animals.find((pet:any) => pet.id === animals.petId)
    this.currentAnimalsSubject.next(currentAnimal)
  }


}

