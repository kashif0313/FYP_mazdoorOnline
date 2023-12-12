import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';
import { Bidder } from '../models/bidder.Model';
import { DatePipe } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  bidderObj = new Bidder;
  jobID:any;
jobArray: any[] = [];
bidArray: any[] = [];
userLabel:any;
openBid:boolean = false;
user:any;
currentDate:any;
changeFormat:any;
pipe:any;
ChangedFormat:any;
noBid:any;
userLabourID:any;
bidopen:boolean = false;
  constructor(private route:Router, private userService:UserDataService,private toast:HotToastService,) { }

  ngOnInit(): void {
    this.jobID = sessionStorage.getItem('JobID');
    this.userLabel =  sessionStorage.getItem('ActiveUserTitle');
    this.user =  sessionStorage.getItem('ActiveUser');
    this.userLabourID = sessionStorage.getItem('LoginUserID');
    console.log(this.jobID);
    this.getJobfromDB();
    this.getBidderInfo();
  }
  getJobfromDB()
  {
    console.log("job Called = ");
    var newFormData = new FormData();
    newFormData.append("jobID",this.jobID);
    this.userService.openJob(newFormData).subscribe((resultData: any)=>
    {
      console.log(resultData);
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.jobArray.push(doc);
      });
    })
  }
  jobBid()
  {
    console.log(this.userLabel);
    if(this.userLabel == "labour")
    {
      this.openBid = true;
    }
    else
    {
      this.toast.error('You are not a labour!!',{
        autoClose: true,
        duration:2000,
      });
    }
  }
  closeBid()
  {
    this.openBid = false;
  }
  bidNow()
  {
    this.currentDate =  new Date();
    this.pipe = new DatePipe('en-US');
    this.ChangedFormat = this.pipe.transform(this.currentDate, 'dd/MM/YYYY');
    var newFormData = new FormData();
    newFormData.append("jobID",this.jobID);
    newFormData.append("Bidder",this.user);
    newFormData.append("date",this.ChangedFormat);
    newFormData.append("amount",this.bidderObj.amount);
    newFormData.append("bidderID",this.userLabourID);
    console.log(this.ChangedFormat);
    this.userService.bidJob(newFormData).subscribe((resultData: any)=>
    {
      console.log(resultData);
      if(resultData == "success")
         {
          window.location.reload();
         }
      
    })
  }
  getBidderInfo()
  {
    var newFormData = new FormData();
    newFormData.append("jobID",this.jobID);
    this.userService.getBidJob(newFormData).subscribe((resultData: any)=>
    {
      this.bidopen = true;
      this.noBid= "";
      console.log(resultData);
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.bidArray.push(doc);
      });
         if (this.bidArray.length == 0)
    {console.log("\narray Empty");
    this.noBid= "No Bid yet";  
    this.bidopen = false;
  }
    })
   
  }
  openLabourProfile(data:any)
  {
    sessionStorage.setItem('LabourProfileID',data);
    this.route.navigate(['/labourProfile']);
  }
}
