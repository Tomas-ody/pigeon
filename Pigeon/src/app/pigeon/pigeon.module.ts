import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigeonRoutingModule } from './pigeon-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PigeonRoutingModule,
    ListComponent,
    EditComponent,
    FamilyTreeComponent
  ]
})
export class PigeonModule { }
