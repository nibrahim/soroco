import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';
import { ShelfListComponent } from '../shelf-list/shelf-list.component';
import { ShelfDetailsComponent } from '../shelf-details/shelf-details.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', redirectTo: 'book', pathMatch: 'full'},
    { path: 'book', component: BookListComponent, children: [
        { path: ':slug', component: BookDetailsComponent }
    ] },
      { path: 'shelf', component: ShelfListComponent, children: [
          { path: ':number', component: ShelfDetailsComponent }
      ] }
  ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
