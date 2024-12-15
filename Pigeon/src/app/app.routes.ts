import { Routes } from '@angular/router';


export const routes: Routes = [
    {path: 'users', loadChildren: () => import("./user/user.module").then(m => m.UserModule)},
    {path: "pigeon", loadChildren: () => import("./pigeon/pigeon.module").then(m => m.PigeonModule)},
    {path: 'users', redirectTo: 'users', pathMatch: "full"}
];