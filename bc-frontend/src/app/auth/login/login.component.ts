import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginInvalid = false;
  loginError: string = null;
  isLoading = false;
  isProcessing = false;

  constructor(
    private title: Title,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { title.setTitle('Login'); }

  ngOnInit() {
    this.createForms();
  }

  login(form: any) {
    this.isLoading = true;
    if (form.invalid) {
      return false;
    }
    const formValues = form.value;
    this.isProcessing = true;
    this.authService.loginUser(formValues.username, formValues.password).then(res => {
      this.router.navigate(['']);
      this.isLoading = false;
      this.isProcessing = false;
      setTimeout(() => this.isLoading = false, 2000);
    }).catch(err => {
      this.isProcessing = false;
      this.loginInvalid = true;
      this.loginError = 'You have entered an invalid email or password';
    });
  }

  protected createForms() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
}
