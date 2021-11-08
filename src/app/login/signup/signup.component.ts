import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators , FormGroupName } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialdataService } from 'src/app/credentialdata.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({});
  logindata : any;
  viewLoginCredential: boolean = true;

  constructor(private fb : FormBuilder,private router : Router,
    private logincredentialService : CredentialdataService){
      this.logincredentialService.getLoginCredentials().subscribe( res => {
        this.logindata = res;
        console.log(this.logindata);
      })
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['',Validators.required],
      password:['',Validators.required],
      username: ['',Validators.required],
      photo: [''],
      imageInput : [''],
      requestdate: ['',[Validators.required]],
      phoneno: ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      address: this.fb.group({
        street: ['',[Validators.required]],
        city: ['',[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]],
        state: ['',[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]],
        zip: ['',[Validators.required,Validators.pattern("^[0-9]{6}$")]],
      })
    });
    console.log(this.signupForm.controls);
    if(this.logindata){
      this.signupForm.controls['email'].setValue(this.logindata.email);
      this.signupForm.controls['password'].setValue(this.logindata.password);
      this.viewLoginCredential = false;
    }
    // this.signupForm.get('requestdate')?.patchValue(this.formatDate(new Date()));
  }

  onImageChange(e : any) {
    const reader = new FileReader();
    if(e.target.files && e.target.files.length) {
      let file = e.target.files[0];
    reader.readAsText(e.target.files[0]);
    console.log(file);
    this.signupForm.controls['imageInput'].setValue(file ? file.name : '');
    this.signupForm.controls['photo'].setValue(file? file : '');
    reader.onload = () => {
      this.signupForm.patchValue({
        photo: reader.result
      });
    }
    }
  }

  get f(){
    return this.signupForm.controls;
  }

  keyPressNumbers(event : any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.logincredentialService.postcredentials(this.signupForm.value).subscribe( res => {
      console.log(res);
    });
    this.logincredentialService.setLoginCredentials(this.signupForm.value);
    this.router.navigate(["/posts"]);
  }
}
