import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PersonalinfoComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    SharedModule
  ],
  exports: [
    PersonalinfoComponent
  ]
})
export class PostsModule { }
