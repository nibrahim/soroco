import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BookListComponent } from '../book-list/book-list.component';
import { ShelfListComponent } from '../shelf-list/shelf-list.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { ShelfDetailsComponent } from '../shelf-details/shelf-details.component';
import { BookListService } from '../book-list/book-list.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShelfListService } from '../shelf-list/shelf-list.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [
      HomeComponent,
      BookListComponent,
      BookDetailsComponent,
      ShelfListComponent,
      ShelfDetailsComponent
  ],
  providers: [
    BookListService,
    ShelfListService
  ],
})
export class HomeModule { }
