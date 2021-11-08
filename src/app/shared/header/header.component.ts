import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialdataService } from 'src/app/credentialdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logindata: any;
  username : string | any;

  constructor(private logincredentialService : CredentialdataService,
    private router : Router) {
    this.logincredentialService.getLoginCredentials().subscribe( res => {
      this.logindata = res;
    });
    console.log(this.logindata.username);
    if(this.logindata instanceof Array){
      this.username = this.logindata[0].username;
      console.log(this.username);
    }
    else{
      this.username = this.logindata.username;
      console.log(this.username);
    }
    
   }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/login']);
  }
}
