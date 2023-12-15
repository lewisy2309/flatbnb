
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

import {from} from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../model/login-response.model';
import { Login } from '../model/login.model';
import { UserCreation } from '../model/user-creation.model';
import { UserPasswordInfo } from '../model/user-password-infos.model';
import { UserModel } from '../model/user.model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private _isAdmin$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin$.asObservable();
  private _isHost$ = new BehaviorSubject<boolean>(false);
  isHost$ = this._isHost$.asObservable();
  private _isClient$ = new BehaviorSubject<boolean>(false);
  isClient$ = this._isClient$.asObservable();
  private _isAgent$ = new BehaviorSubject<boolean>(false);
  isAgent$ = this._isAgent$.asObservable();
  protected isloggedIn = false;
  protected roles: string[] =[];
  protected loggedInUser: string="";
  user: UserModel={
    sub: '',
    roles: []
  };
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    const token = this.tokenService.getToken();
    this._isLoggedIn$.next(!!token);
    if (token) {
      this.user = this.getUser(token);
    }
    if (token) {
      const roles:string[] = this.tokenService.getUserRoles();
      if (roles.indexOf('ROLE_ADMIN') >= 0) {
        this._isAdmin$.next(true);
      }
      if (roles.indexOf('ROLE_HOST') >= 0) {
        this._isHost$.next(true);
      }
      if (roles.indexOf('ROLE_AGENT') >= 0) {
        this._isAgent$.next(true);
      }
      if (
        roles.indexOf('ROLE_USER') >= 0 ||
        roles.indexOf('ROLE_CLIENT') >= 0
      ) {
        this._isClient$.next(true);
      }
    }
  }

  getRoles() {
    const token = this.tokenService.getToken();
    if (token) {
      const roles:string[]  = this.tokenService.getUserRoles();
      if (roles.indexOf('ROLE_ADMIN') >= 0) {
        this._isAdmin$.next(true);
      }
      if (roles.indexOf('ROLE_HOST') >= 0) {
        this._isHost$.next(true);
      }
      if (roles.indexOf('ROLE_AGENT') >= 0) {
        this._isAgent$.next(true);
      }
      if (
        roles.indexOf('ROLE_USER') >= 0 ||
        roles.indexOf('ROLE_CLIENT') >= 0
      ) {
        this._isClient$.next(true);
      }
    }
  }
  signIn(login: Login): Observable<boolean> {

    let endpoint:string=environment.apiUrl + 'login';
    return this.httpClient.post<LoginResponse>(endpoint,login)
      .pipe(
        map((data) => {
          this.handleSignInResponse(data)
          return true;
        })
      );;

  }

  private handleSignInResponse(data: LoginResponse): void {
    // Logic to handle the response and set user information
    this.tokenService.initLocalStorageValues(data);
          // console.log(data);
          // this.isloggedIn = true;
          this._isLoggedIn$.next(true);
          const jeton = this.tokenService.decodeToken();
          this.roles = this.tokenService.getUserRoles();
          this.getRoles();
          this.user = this.getUser(this.tokenService.getToken());
          if (this.isAdmin()) {
            this._isAdmin$.next(true);
          }
          if (this.isHost()) {
            this._isHost$.next(true);
          }
          if (this.isClient()) {
            this._isClient$.next(true);
          }
          if (this.isAgent()) {
            this._isAgent$.next(true);
          }
  }

  private handleSignInResponseCapacitor(data: any): void {
    // Logic to handle the response and set user information
    this.tokenService.initLocalStorageValuesForCapacitor(data);
          // console.log(data);
          // this.isloggedIn = true;
          this._isLoggedIn$.next(true);
          const jeton = this.tokenService.decodeToken();
          this.roles = this.tokenService.getUserRoles();
          this.getRoles();
          this.user = this.getUser(this.tokenService.getToken());
          if (this.isAdmin()) {
            this._isAdmin$.next(true);
          }
          if (this.isHost()) {
            this._isHost$.next(true);
          }
          if (this.isClient()) {
            this._isClient$.next(true);
          }
          if (this.isAgent()) {
            this._isAgent$.next(true);
          }
  }

  createClientAccount(user: UserCreation) {
    let endpoint:string=environment.apiUrl + 'users/new';
      return this.httpClient.post(endpoint,user);

  }

  createHostAccount(user: UserCreation): Observable<any> {
    let endpoint:string=environment.apiUrl + 'users/new/host';
    return this.httpClient.post(endpoint,user);

  }

  createAgentAccount(user: UserCreation): Observable<any> {
    let endpoint:string=environment.apiUrl + 'authentication/agents/signup';
      return this.httpClient.post(endpoint,user);
  }

  logout() {
    let endpoint:string=environment.apiUrl + 'authentication/logout';

      this.httpClient.post(endpoint,{
        token: this.tokenService.getRefreshToken(),
      }).subscribe((data) => {
        this.loggedInUser = '';
        this._isLoggedIn$.next(false);
        this.isloggedIn = false;
        this.tokenService.cleanLocalStorage();
        this.reinitializeConnectionStatusValues();
      });
  }

  reinitializeConnectionStatusValues(){
    this._isLoggedIn$.next(false);
    if (this.isAdmin()) {
      this._isAdmin$.next(false);
    }
    if (this.isHost()) {
      this._isHost$.next(false);
    }
    if (this.isClient()) {
      this._isClient$.next(false);
    }
    if (this.isAgent()) {
      this._isAgent$.next(false);
    }
  }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() != null;
  }

  isAdmin(): boolean {
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf('ROLE_ADMIN') >= 0;
  }
  isClient(): boolean {
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf('ROLE_CLIENT') >= 0;
  }
  isHost(): boolean {
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf('ROLE_HOST') >= 0;
  }

  isAgent(): boolean {
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf('ROLE_AGENT') >= 0;
  }

  getPhoneNumber() {
    return this.tokenService.getPhoneNumber();
  }

  private getUser(token: string): UserModel {
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }

  askPasswordReset(email: String) {
    let endpoint:string='authentication/reset-password-request';
    return this.httpClient.post(endpoint+"?email="+email,null);

  }

  resetPassword(userPasswordInfo: UserPasswordInfo) {
    let endpoint:string=environment.apiUrl + 'authentication/confirm-password-reset';
    return this.httpClient.post(endpoint,userPasswordInfo);
  }

  activateAccount(activationToken: string){
    let endpoint:string=environment.apiUrl +'authentication/account-activation?token=' + activationToken;
    return this.httpClient.get(endpoint);

  }

  resendActivationLink(activationToken: string){
    let endpoint:string=environment.apiUrl +'authentication/resend-activation-link?token=' + activationToken;
    return this.httpClient.get(endpoint);
  }

}
