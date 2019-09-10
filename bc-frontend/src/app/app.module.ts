import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth';
import { CustomRequestOptions } from './custom-request-options';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomRequestOptions, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
