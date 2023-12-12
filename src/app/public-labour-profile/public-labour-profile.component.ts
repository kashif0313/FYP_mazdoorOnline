import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-public-labour-profile',
  templateUrl: './public-labour-profile.component.html',
  styleUrls: ['./public-labour-profile.component.css']
})
export class PublicLabourProfileComponent implements OnInit {
  userArray:any[] = [];
  userRatings:any[] = [];
  i:number = 0;
  FinalRatings:number=0;
  Final_Ratings:any;
  rated:boolean = true;
  imageSrc:any = "../../assets/profileImages/myLogo.png";
  constructor(private userService:UserDataService,private router:Router) { }
  profileId:any;
  activeUser:any;
  ratingsLabour:any;
  ngOnInit(): void {
    this.profileId = sessionStorage.getItem('LabourProfileID');
    this.activeUser = sessionStorage.getItem('LoginUserID');
    this.openLabourProfile(this.profileId);
    this.getRatings();
  }
  openLabourProfile(data:any)
  {
    var newFormData = new FormData();
    newFormData.append("bidderID",data);
    this.userService.openBidderProfile(newFormData).subscribe((res:any)=>{
      console.log("post sending data "+res);
      res.forEach((doc:any)=>{
        console.log(doc);
        this.userArray.push(doc);
      });
    });
  }
  submitRating()
  {
    var newFormData = new FormData();
    newFormData.append("profileID",this.profileId);
    newFormData.append("ratingBy",this.activeUser);
    newFormData.append("rating",this.ratingsLabour);
    this.userService.submitRatings(newFormData).subscribe((res)=>{
      console.log("post sending data "+res);
      this.router.navigate(['/labourProfile'])
  .then(() => {
    window.location.reload();
  });
    })

  }
  getRatings()
  {
    var newFormData = new FormData();
    newFormData.append("profileID",this.profileId);
    this.userService.retriveRatings(newFormData).subscribe((res:any)=>{
      console.log("post sending data "+res);
      res.forEach((doc:any)=>{
        console.log(doc);
        this.userRatings.push(doc);
        if(doc.ratingBy == this.activeUser)
        {
          this.rated = false;
        }
      });
      for(this.i=0 ; this.i<this.userRatings.length; this.i++)
      {
        this.FinalRatings = this.FinalRatings + this.userRatings[this.i].rating;
        
      console.log("finalRatng = " , this.FinalRatings);
      }
      this.Final_Ratings = this.FinalRatings / this.userRatings.length;
    });
  }
}
