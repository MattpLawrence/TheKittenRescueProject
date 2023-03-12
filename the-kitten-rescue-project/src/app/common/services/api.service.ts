import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { PetDisplay } from '../models/common.model';
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
  queryString: string = '/animals?organization=GA477&limit=100';
  // queryString: string = '/organizations?query=circle'

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  //subjects
  private animalsSubject = new BehaviorSubject<any>(undefined)
  private currentAnimalsSubject = new BehaviorSubject<any>(undefined)

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
      
              this.animalsSubject.next(this.filterData(response))
              observer.next(this.filterData(response));
              observer.complete();
            })
          }else observer.next('error');
        })
      }

    })
  }



  filterData = (response: any):any => {
    //set with animals KVP to match original object
    let filteredList = {animals: response.animals.filter((object: any) => object.videos.length >= 1)};

    return filteredList;
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
    console.log(currentAnimal)
    this.currentAnimalsSubject.next(currentAnimal)
  }


}

