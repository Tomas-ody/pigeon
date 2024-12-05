import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { FamilyTreeComponent } from './pigeon/family-tree/family-tree.component';
import { ListComponent } from './pigeon/list/list.component';

export const routes: Routes = [
    {path: 'users', loadChildren: () => import("./user/user.module").then(m => m.UserModule)},


];
