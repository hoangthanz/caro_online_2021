import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public name: string = '';
  public decodedToken: any;
  constructor(
    private _jwtHelperService: JwtHelperService,
    private _router: Router
  ) {

    const token = localStorage.getItem('access_token')?.toString();

    this.decodedToken = this._jwtHelperService.decodeToken(token);
  }

  ngOnInit() {
  }

  public logout = () => {
    //localStorage.clear(); // xóa toàn bộ những cặp giá trị key-value 
    localStorage.removeItem('access_token');

    this.goToNav('login');
  };


  public goToNav = (url: string) => this._router.navigate([`/${url}`]);

}
