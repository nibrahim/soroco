import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent} from './book-list/book-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'book', pathMatch: 'full'},
    { path: 'book', component: BookListComponent},
    // { path: 'books/:id', component: StudentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
