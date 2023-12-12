import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';
import { LoginUser } from '../models/login-user.model';
import { Route, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginObj = new LoginUser;
  postPass:any;
  withoutQuotes:any;
  loginID:any;
  loginSuccess:boolean = false;
  
  constructor(private userService:UserDataService,private toast:HotToastService, private router:Router,private header:HeaderComponent) { }

  ngOnInit(): void {
    if(this.loginSuccess == true)
    {
      console.log("reload success");
    }
    else
    {
      console.log("reload false")
    }
    
  }
  loginUser()
  {
    console.log(this.userLoginObj);
    console.log("sendingData!!\n");
    this.userService.LoginUser(this.userLoginObj).subscribe((res)=>{

          this.withoutQuotes = res;
          this.toast.loading('logging!',{
            autoClose: true,
            duration:2000,
          });

         if(this.withoutQuotes[0] == "success")
         {
           this.toast.success('success!');
          sessionStorage.setItem('LoginUserID',this.withoutQuotes[1]);
          sessionStorage.setItem('ActiveUser',this.withoutQuotes[2]);
          sessionStorage.setItem('ActiveUserTitle',this.withoutQuotes[3]);
            this.loginID = sessionStorage.getItem('LoginUserID');

          this.header.userLogin = true;
          this.router.navigate(['/Home'])
  .then(() => {
    window.location.reload();
  });
              
       }
       else if (this.withoutQuotes[0] == "Admin")
       {
        sessionStorage.setItem('LoginUserID',this.withoutQuotes[1]);
        sessionStorage.setItem('ActiveUser',this.withoutQuotes[2]);
        this.header.userLogin = true;
        this.router.navigate(['/Dashboard'])
  .then(() => {
    window.location.reload();
  });
        
       }
       else if (this.withoutQuotes[0] == "Blocked")
       {
        this.toast.error('Blocked by admin!');
        
       }
         else
         {  console.log("login failed");
         this.toast.error('Wrong Email / Password!');
        }
         this.header.userLogin = false;
       }
      )
  }
}
