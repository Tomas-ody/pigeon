import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigeonRoutingModule } from './pigeon-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PigeonRoutingModule,
    ListComponent
  ]
})
export class PigeonModule { }
