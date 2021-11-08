import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredentialdataService {

  credentialUrl = "http://localhost:3000/loginCredentials";

  constructor(private http : HttpClient) {
    // this.getcredentials().subscribe( res => {
    //   this.setLoginCredentials(res);
    // });
   }

  getcredentials(email : string){
    const url = this.credentialUrl + "?q=" + email;
    return this.http.get(url);
  }

  postcredentials(data : any){
    return this.http.post(this.credentialUrl,data);
  }

  //login credential datas
  public loginCredentialList : BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setLoginCredentials(logindata : any){
    this.loginCredentialList.next(logindata);
  }

  getLoginCredentials(){
    return this.loginCredentialList.asObservable();
  }

  //posts datas
  public postsDetails : BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setpostsDetails(logindata : any){
    this.postsDetails.next(logindata);
  }

  getpostsDetails(){
    return this.postsDetails.asObservable();
  }
}
