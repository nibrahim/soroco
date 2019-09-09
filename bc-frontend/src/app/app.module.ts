import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListService } from './book-list/book-list.service';
import { BookDetailsComponent } from './book-details/book-details.component';


@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        BookDetailsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [BookListService],
    bootstrap: [AppComponent]
})
export class AppModule { }
