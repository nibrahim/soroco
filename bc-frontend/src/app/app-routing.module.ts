import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
