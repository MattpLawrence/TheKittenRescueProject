import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { petFinderCredentials } from 'src/environments/config';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private http: HttpClient) {}

  //variables
  private apiKey: string = petFinderCredentials.apiKey;
  private apiSecret: string = petFinderCredentials.apiSecret;

  
  //subjects
  private tokenSubject = new ReplaySubject<string>(1)


  //set timer to refresh oAuth
  public startTokenTimer = () => {
    interval(3400000).subscribe(()=> {
      this.getToken();
    })
  }

  getToken(){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.apiSecret}`;

    this.http.post('https://api.petfinder.com/v2/oauth2/token', body, { headers: headers }).subscribe( (res:any)=> {
      if(res.access_token != undefined){
        this.setTokenSubject(res.access_token);
      }
    });
  };


  //getters and setters
  getTokenSubject = () => {
    return this.tokenSubject.asObservable();
  }

  setTokenSubject = (token: string) => {
    this.tokenSubject.next(token)
  }
}
