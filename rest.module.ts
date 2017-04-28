import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestBase } from "./parent/rest.base";
import { ResponseList } from "./parent/response-list.base";
import { RestService } from "./service/rest.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    RestService
  ],
  declarations: [],
  exports: []
})
export class RestModule { }
