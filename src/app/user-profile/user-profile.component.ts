import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.modal';
import { UserDataService } from '../BackendServices/user-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService:UserDataService) { }
  userObj = new User;
  profileID:any;
  openDisplay:boolean = false;
  userArray:any[] = [];
  file:any;
  imageSrc:any = "../../assets/profileImages/myLogo.png";
  ngOnInit(): void {
    this.profileID = sessionStorage.getItem('LoginUserID');
    this.getUserProfile();
  }
  updateProfile()
{
  var newFormData = new FormData();
  newFormData.append("id",this.profileID);
  newFormData.append("name",this.userArray[0].name);
  newFormData.append("address",this.userArray[0].address);
  newFormData.append("email",this.userArray[0].email);
  newFormData.append("phoneNo",this.userArray[0].phoneNo);

    this.userService.updateUserDetails(newFormData).subscribe((res)=>{
      console.log("post sending data "+res);
      if(res =="success")
      {
        window.location.reload();
      }
      
    })
}
  getUserProfile()
  {
    
    console.log("profile : ",this.profileID);
    var newFormData = new FormData();
  newFormData.append("id",this.profileID);
    this.userService.getUserProfileDB(newFormData).subscribe((res:any)=>{
      console.log("post sending data "+res);
      res.forEach((doc:any)=>{
        console.log(doc);
        this.userArray.push(doc);
      });
      
        
    });
  }
  uploadProfileImageBox()
  {
    
    var newFormData = new FormData();
  newFormData.append("id",this.profileID);
  newFormData.append("file",this.file,this.file.name);
  newFormData.append("profileImage",this.userObj.profileImage);

    this.userService.updateUser(newFormData).subscribe((res)=>{
      console.log("post sending data "+res);
      if(res =="success")
      {
        window.location.reload();
      }
      
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
