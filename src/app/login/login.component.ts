import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {error} from 'util';
import {SessionResponseModel} from '../models/responses/session-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: boolean;
  newUser: boolean;
  loginUserForm: FormGroup;
  newUserForm: FormGroup;
  passwordConfirm: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.newUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.passwordConfirm = true;
  }

  /**
   * To new users
   * Display new user form
   */
  public signUp(): void {
    this.newUser = !this.newUser;
    this.loginUser = false;
  }

  /**
   * Users with an account
   * Display login form.
   */
  public login(): void {
    this.loginUser = !this.loginUser;
    this.newUser = false;
  }

  /**
   * Get errors in new user form
   */
  get fuser() {
    return this.newUserForm.controls;
  }

  /**
   * Show or hide Passwords isn't equals error.
   */
  public onPasswordChange(): void {
    this.passwordConfirm = this.newUserForm.controls.password.value === this.newUserForm.controls.passwordConfirmation.value;
  }

  /**
   * Make request to login user
   * If response it's successful go to main page
   */
  public loginRequest(): void {
    // TODO: only do this when server response with a successful response
    const body = {
      email: this.loginUserForm.controls.email.value,
      password: this.loginUserForm.controls.password.value
    };
    console.log(body);
    this.http.post(environment.API_URL + 'sessions', body)
      .subscribe((response) => {
        const session = new SessionResponseModel(response);
        localStorage.setItem('token', session._id);
        this.router.navigate(['/time_registry']);
      }, err => {
        alert('Email or password invalid');
        console.log('Oooops something wrong');
      });
  }

  /**
   * Make request to sign up user.
   * If response it's successful go to main page
   */
  public signUpRequest(): void {
    const body = {
      email: this.newUserForm.controls.email.value,
      password: this.newUserForm.controls.password.value
    };
    console.log(body);
    console.log(environment.API_URL + 'users');
    this.http.post(environment.API_URL + 'users', body)
      .subscribe((response) => {
        alert('WELCOME!! Now you can LOGIN :)');
      }, err => {
        console.log('Oooops something wrong');
      });
  }
}
