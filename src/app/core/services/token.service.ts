import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import {from,map} from 'rxjs';
import { LoginResponse } from '../model/login-response.model';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const DATE_EXPIRATION_KEY = 'dateExpiration';
const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  decodedToken: { [key: string]: string[] & string; } | undefined;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  initLocalStorageValues(data: LoginResponse) {
    this.localStorage.store(TOKEN_KEY, data.token);
    this.localStorage.store(REFRESH_TOKEN_KEY, data.refreshToken);
    this.localStorage.store(DATE_EXPIRATION_KEY, data.expirationDate);
  }

  initLocalStorageValuesForCapacitor(data: any) {
    this.localStorage.store(TOKEN_KEY, data['accessToken']);
    this.localStorage.store(REFRESH_TOKEN_KEY, data['refreshToken']);
    this.localStorage.store(DATE_EXPIRATION_KEY, data['expirationDate']);
  }

  reloadToken(refreshToken: string) {
    let endpoint:string=environment.apiUrl + 'authentication/refresh/token';
    return this.httpClient.post<LoginResponse>(endpoint,{ token: refreshToken });
  }

  cleanLocalStorage() {
    this.localStorage.clear(TOKEN_KEY);
    this.localStorage.clear(REFRESH_TOKEN_KEY);
    this.localStorage.clear(DATE_EXPIRATION_KEY);
  }

  decodeToken() {
    if (this.getToken) {
      this.decodedToken = jwtDecode (this.getToken());
    }
  }

  getUserId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['userid'] : null;
  }

  getToken(): string {
    return this.localStorage.retrieve('accessToken');
  }

  getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }
  getPhoneNumber() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['sub'] : null;
  }

  getUserRoles() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['roles'] : [];
  }

  getTokenExpirationDate() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }
}
