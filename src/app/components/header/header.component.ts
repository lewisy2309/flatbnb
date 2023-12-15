import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  TOKEN_KEY = 'access';
  REFRESH_TOKEN_KEY = 'refreshToken';
  DATE_EXPIRATION_KEY = 'dateExpiration';
  constructor(private localStorage:LocalStorageService,private router:Router,) { }

  ngOnInit(): void {
  }


  logout(){
    this.cleanLocalStorage();
    this.router.navigateByUrl('/login')
  }

  cleanLocalStorage() {
    this.localStorage.clear(this.TOKEN_KEY);
    this.localStorage.clear(this.REFRESH_TOKEN_KEY);
    this.localStorage.clear(this.DATE_EXPIRATION_KEY);
  }
}
