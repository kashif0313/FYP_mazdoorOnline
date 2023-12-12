import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';
import { User } from '../models/user.modal';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-latest-jobs',
  templateUrl: './latest-jobs.component.html',
  styleUrls: ['./latest-jobs.component.css']
})
export class LatestJobsComponent implements OnInit {
  jobID:any;
  LoginUser:any;
  constructor(public userService:UserDataService,private toast:HotToastService,private router:Router) { }
  jobsArray:any[] = [];
  ngOnInit(): void {
    this.getLatestJobs()
  }
  getLatestJobs()
  {

  this.userService.getJobs()
  
    .subscribe((resultData: any)=>
    {
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.jobsArray.push(doc);
      });
      this.jobsArray = this.jobsArray.reverse();
    });
}
openJobs(data:any)
{
  this.LoginUser = sessionStorage.getItem('LoginUserID');
  if(!this.LoginUser)
  {
   
    console.log("user not login");
    this.toast.error('Login to View Job Details');
  }
  else
  {    this.jobID = sessionStorage.setItem('JobID',data);
     if(!this.jobID)
     {
       this.jobID = sessionStorage.setItem('JobID',data);
       this.router.navigate(['/Viewjob']);
     }
    console.log("user login");
    this.router.navigate(['/Viewjob'])
    .then(() => {
      window.location.reload();
    });
  }
 
}
  
}
