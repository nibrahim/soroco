import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent} from './book-list/book-list.component';
import { BookDetailsComponent} from './book-details/book-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'book', pathMatch: 'full'},
    { path: 'book', component: BookListComponent, children: [
        { path: ':slug', component: BookDetailsComponent }
    ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
