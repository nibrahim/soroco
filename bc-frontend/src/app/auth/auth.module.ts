import { NgModule } from '@angular/core';
import { LoginComponent } from './index';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
    LoginComponent
  ],
  exports: [],
})
export class AuthModule { }
