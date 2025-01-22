import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddNewComponent } from './add-new/add-new.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';

const routes: Routes = [
  {path: "list", component: ListComponent},
  {path: "add", component: AddNewComponent},
  {path: "family-tree/:id", component: FamilyTreeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigeonRoutingModule { }
