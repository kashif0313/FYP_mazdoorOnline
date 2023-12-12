import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.modal';
import { UserDataService } from '../BackendServices/user-data.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 
  userObj = new User;
  errorName:any;
  withoutQuotes:any;
  constructor( private userService:UserDataService,private toast:HotToastService, private router:Router,private header:HeaderComponent) { }
moveView1:any;
Retypepassword:any;
passwordUnmatch:any="true";
progressBar:string = "30%";
file:any;
  imageSrc:any = "../../assets/profileImages/myLogo.png";
  ngOnInit(): void {
  }
  changeView(data:any)
  {
    if(data =="step1")
    {
      if(!this.userObj.user)
      {
        
        this.errorName="Select user Type First";
      }
      else
      {
      this.moveView1 = "-100%"
      this.progressBar = "70%";
      this.errorName="";
      }
    }
    if(data =="step1.1")
    {
      this.moveView1 = "0%"
      this.progressBar = "30%";
    }
    if(data =="step2")
    {
      if(!this.userObj.name || !this.userObj.password || !this.userObj.phoneNo)
      {
        
        this.errorName="Field / Fields Empty";
      }
      else
      {
        
        this.errorName="";
        if(this.userObj.password != this.Retypepassword)
        {
          this.passwordUnmatch = "false";
          this.errorName="Password Not matched";
        }
          else
        { 
          this.moveView1 = "-200%"
          this.progressBar = "100%";
          this.errorName="";
        }
      }
      
    }
    if(data =="step2.1")
    {
      this.moveView1 = "-100%";
      this.progressBar = "70%";
    }
    if(data =="lastStep")
    {
      if(!this.userObj.password || !this.Retypepassword || !this.userObj.name || !this.userObj.phoneNo)
      {
        this.errorName="Field / Fields Empty";
      }
      
      else
      {
        if(!this.userObj.email || !this.userObj.address || !this.userObj.profileImage)
      {
        this.errorName="Field / Fields Empty";
      }
      else
      {
        this.errorName="";
        this.imageForm();
      }      
        
      }
      
    }
    if(data =="skip")
    {
      this.userObj.email="na";
      this.userObj.address="na";
      this.userObj.profileImage="DefaultProfile.png";
      this.simpleForm();
    }
  }
  imageForm()
  {
    var newFormData = new FormData();
    newFormData.append("name",this.userObj.name);
    newFormData.append("file",this.file,this.file.name);
    newFormData.append("profileImage",this.userObj.profileImage);
    newFormData.append("address",this.userObj.address);
    newFormData.append("user",this.userObj.user);
    newFormData.append("password",this.userObj.password);
    newFormData.append("email",this.userObj.email);
    newFormData.append("phoneNo",this.userObj.phoneNo);
  this.submituserdb(newFormData);
  }
  simpleForm()
  {
    var newForm = new FormData();
    newForm.append("name",this.userObj.name);
    newForm.append("profileImage",this.userObj.profileImage);
    newForm.append("address",this.userObj.address);
    newForm.append("user",this.userObj.user);
    newForm.append("password",this.userObj.password);
    newForm.append("email",this.userObj.email);
    newForm.append("phoneNo",this.userObj.phoneNo);
  this.submituserdb(newForm);
  }
  submituserdb(data:any)
  {
    var newFormData = data;
    console.log(newFormData);
    this.userService.postDataFormApi(newFormData).subscribe((res)=>{
      this.withoutQuotes = res;
      this.toast.loading('Creating Account!!!',{
        autoClose: true,
        duration:2000,
      });
      if(this.withoutQuotes[0]  == "Success")
      {
        this.toast.success('success!');
          sessionStorage.setItem('LoginUserID',this.withoutQuotes[1]);
          sessionStorage.setItem('ActiveUser',this.userObj.name);
          sessionStorage.setItem('ActiveUserTitle',this.userObj.user);
          this.header.userLogin = true;
          this.router.navigate(['/Home'])
  .then(() => {
    window.location.reload();
  });
      }
      console.log("post sending data "+this.withoutQuotes);
    })
  }
  uploadProfileImage(data:any)
  {
    if (data.target.files && data.target.files[0]) {
      this.file = data.target.files[0];
 
         const reader = new FileReader();
         reader.onload = e =>this.imageSrc = reader.result;
 
         reader.readAsDataURL(this.file);
         this.userObj.profileImage = this.file.name;
         //this.jobDetails.jobImage = data.target.files[0];
     }
  }

}
