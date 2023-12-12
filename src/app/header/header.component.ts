import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserDataService } from '../BackendServices/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private router: Router, public service:UserDataService) { }
menuHeight:number = 0;
closebtnMenu:any="none";
openbtnMenu:any="block";
scrWidth:any;
loginID:any;
activeUser:any;
adminLogin:any;

userLogin:any;

  ngOnInit(): void {
    this.deviceInfo()
    this.loginID = sessionStorage.getItem('LoginUserID');
    if(this.loginID!=undefined)
    {
      this.userLogin = this.loginID;
      console.log("session value = "+this.userLogin)
      this.activeUser = sessionStorage.getItem('ActiveUser');
      if(this.activeUser == "Admin")
      {
        console.log("admin Active!!!")
        this.adminLogin = this.activeUser;
      }
    }
    
   
  }
  deviceInfo()
  {
    this.scrWidth = window.innerWidth;
    //alert(this.scrWidth);
    if(this.scrWidth>1100)
    {
      this.closebtnMenu = "none"
    this.openbtnMenu = "none"
    }
  }
  openMenu()
  {
    this.scrWidth = window.innerWidth;
    //alert(this.scrWidth);
    if(this.scrWidth<1100)
    {
      this.menuHeight = 300;
    }
    else if(this.scrWidth<600)
    {
      this.menuHeight = 200;
    }
    this.closebtnMenu = "block"
    this.openbtnMenu = "none"
  }
  closeMenu()
  {
    this.menuHeight = 0;
    this.openbtnMenu = "block"
    this.closebtnMenu = "none"
  }
  openLoginPage(path:string)
  {
    this.router.navigate([path]);
  }
  logOut()
  {
    this.userLogin=false;
    sessionStorage.clear();
    this.router.navigate(['Home']);
  }

}
