import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigeonRoutingModule } from './pigeon-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PigeonRoutingModule,
    ListComponent,
    EditComponent
  ]
})
export class PigeonModule { }
