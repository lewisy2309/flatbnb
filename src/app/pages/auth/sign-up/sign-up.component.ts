import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreation } from 'src/app/core/model/user-creation.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: UntypedFormGroup = new UntypedFormGroup(
    {
      firstname: new UntypedFormControl('', [Validators.required]),
      surname: new UntypedFormControl('', [Validators.required]),
      phoneNumber: new UntypedFormControl('', [Validators.required]),
      username: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new UntypedFormControl('', Validators.required),
    },

  );
  user: UserCreation;
  isloginFailed = false;
  isSuccessful = false;
  errorMessage = '';
  successMessage = '';
  isSignUpFailed: boolean=false;
  constructor(private authenticationService: AuthenticationService,
    private router: Router,) {
    this.user = { firstname: '', surname: '', username: '',email: '',  password: '',  phoneNumber: '' };
  }

  ngOnInit(): void {
    this.initSignUpForm()
  }

  retrieveUserInfos() {
    this.user.phoneNumber =  this.signUpForm.value.phoneNumber;
    this.user.email = this.signUpForm.value.email;
    this.user.firstname = this.signUpForm.value.firstname;
    this.user.surname = this.signUpForm.value.surname;
    this.user.username = this.signUpForm.value.username;
    this.user.password = this.signUpForm.value.password;
  }

  initSignUpForm() {
    this.signUpForm = new UntypedFormGroup(
      {
        firstname: new UntypedFormControl('', [Validators.required]),
        surname: new UntypedFormControl('', [Validators.required]),
        phoneNumber: new UntypedFormControl('', [Validators.required]),
        username: new UntypedFormControl('', [Validators.required]),
        email: new UntypedFormControl('', [Validators.required, Validators.email]),
        password: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        confirmPassword: new UntypedFormControl('', Validators.required),
      },

    );
  }

  signUpClientAccount(): void {
    this.retrieveUserInfos();
    console.log(this.user)
    this.authenticationService.createClientAccount(this.user).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.successMessage =
          'Vous avez bine été inscrit vous pouvez dès à présent vous connecter';
      },
      (err) => {
        // this.errorMessage = err.error.errors[0];
        this.isSignUpFailed = true;
      }
    );
  }

}
