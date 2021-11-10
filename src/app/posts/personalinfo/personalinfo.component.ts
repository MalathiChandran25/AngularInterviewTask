import { Component, OnInit } from '@angular/core';
import { CredentialdataService } from 'src/app/credentialdata.service';
import * as faker from 'faker';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})
export class PersonalinfoComponent implements OnInit {

  logindata: any;
  personslist : any;
  data :any[]= [];
  sum = 40;
  direction = '';
  dummydata:any;

  constructor(private logincredentialService : CredentialdataService) {
    this.logincredentialService.getLoginCredentials().subscribe( res => {
      this.logindata = res;
      console.log(this.logindata);
    });
  }

  ngOnInit(): void {
    this.generatePersonsData(0,this.sum);
  }
  generatePersonsData(start: number,end:number){
    for (let i = start; i < end; ++i) {
      this.data.push({
        id:i,
        name: faker.name.firstName(),
        description: faker.lorem.paragraphs(2),
        picture: faker.image.avatar(),
        country: faker.address.country(),
        joining_date: faker.date.future(),
        likes: faker.random.number(),
      });
    }
    this.data.sort((a, b) => {
      return (b.joining_date) - (a.joining_date);
    });
    this.logincredentialService.setpostsDetails(this.data);
    this.logincredentialService.getpostsDetails().subscribe( res => {
      this.personslist = res;
    });
    // console.log(this.personslist);
  };
  
  appendItems(startIndex :number, endIndex : number) {
    this.generatePersonsData(startIndex, endIndex);
  }
  
  prependItems(startIndex : number, endIndex : number) {
    this.generatePersonsData(startIndex, endIndex);
  }

  onScrollDown (ev : any) {
    console.log('scrolled down!!', ev);
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);
    this.direction = 'down'
  }

  onScrollUp(ev: any) {
    console.log("scrolled up!", ev);
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);
    this.direction = "scroll up";
  }
}
