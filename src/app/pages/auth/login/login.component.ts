import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/core/model/login.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup=new UntypedFormGroup({
    username: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });;
  loginCredentials: Login;
  isloginFailed = false;
  hide = true;
  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.loginCredentials = { username: '', password: '' };
   }

  ngOnInit(): void {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  signIn() {
    this.loginCredentials.username = this.loginForm.value.username;
    this.loginCredentials.password = this.loginForm.value.password;
    console.log(this.loginCredentials)
    this.authenticationService
      .signIn(this.loginCredentials)
      .subscribe((data) => {
        this.authenticationService.isHost$.subscribe((isHost)=>{
          if (isHost) {
            this.router.navigate(['/airbnb.com/hosting'], { replaceUrl: true });
          }
        })
        this.authenticationService.isClient$.subscribe((isClient)=>{
          if (isClient) {
            this.router.navigate(['/home'], { replaceUrl: true });
          }
        })
        this.authenticationService.isAdmin$.subscribe((isAdmin)=>{
          if (isAdmin) {
            this.router.navigate(['/admin'], { replaceUrl: true });
          }
        })
        this.authenticationService.isAgent$.subscribe((isAgent)=>{
          if (isAgent) {
            this.router.navigate(['/admin'], { replaceUrl: true });
          }
        })
      });
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }
}
