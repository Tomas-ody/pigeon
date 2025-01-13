import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddNewComponent } from './add-new/add-new.component';

const routes: Routes = [
  {path: "list", component: ListComponent},
  {path: "add", component: AddNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigeonRoutingModule { }
