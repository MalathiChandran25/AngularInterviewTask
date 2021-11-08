import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { credential } from 'src/app/credential';
import { CredentialdataService } from 'src/app/credentialdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginForm = new FormGroup({});
  typeValue : boolean = false;
  error: string | undefined;
  credentialList: credential[] = [];

  constructor(private fb : FormBuilder,private router : Router,
    private logincredentialService : CredentialdataService){
  }

  displayInputField(){
    this.typeValue = true;
  }

  ngOnInit(): void {
    // this.logincredentialService.getLoginCredentials().subscribe(
    //   res => {
    //     this.credentialList = res;
    //     console.log(res);
    //   }
    // );
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
    });
  }
  
  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.logincredentialService.getcredentials(this.loginForm.value.email).subscribe( res => {
      if(Object.keys(res).length != 0){
        console.log(res);
        this.logincredentialService.setLoginCredentials(res);
        this.router.navigate(['/posts']);
      }
      else{
        this.logincredentialService.setLoginCredentials(this.loginForm.value);
        this.router.navigate(['/signup']);
      }
    },
    (error) => {
      this.error = error.error.error;
    });
  }

  openSignup(){
    this.router.navigate(['/signup']);
  }
}
