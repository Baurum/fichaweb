import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    this.router.navigate(['/time_registry']);
  }

  /**
   * Make request to sign up user.
   * If response it's successful go to main page
   */
  public signUpRequest(): void {
    this.router.navigate(['/time_registry']);

  }
}
