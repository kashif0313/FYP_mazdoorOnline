import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  display = false;
  EmployeeArray : any[] = [];
  jobID:any;
  loginID:any;
  currentUserAdmin:boolean = false;
  delJobId:any;
  delJobImg:any;
  confirmDisplay:any;

  constructor(private userService:UserDataService,private toast:HotToastService,private router:Router) { }

  ngOnInit(): void {
    this.loadJobs();
    this.loginID = sessionStorage.getItem('LoginUserID');
    if(this.loginID =="admin")
    {
      this.currentUserAdmin = true;
    }
   
  }
  adminDeleteJob(JobId:any,jobImg:any )
  {
    this.delJobId = JobId;
    this.delJobImg = jobImg;
    //var JobId12 = "44";
   var newForm = new FormData();
    console.log("admion Delete");
   newForm.append("imageSrc",this.delJobImg);
    newForm.append("jobID",this.delJobId);
    //console.log(JobId12);
    this.userService.rejectJob(newForm).subscribe((res)=>{
      this.toast.success('success!');
      console.log("post sending data "+res);
      if(res=='"success"')
      {
        
          window.location.reload();
       
      }
      
    })
  }
postJob()
{
  this.display = true;
}
openJob(data:any)
{

  
  this.jobID = sessionStorage.setItem('JobID',data);
  if(!this.jobID)
  {
    this.jobID = sessionStorage.setItem('JobID',data);
    this.router.navigate(['Viewjob']);
  }
  
}
loadJobs()
{
  this.userService.getJobs()
  
    .subscribe((resultData: any)=>
    {
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.EmployeeArray.push(doc);
      });
    });
}
confirmBtn()
{
  this.confirmDisplay=true;
}
}


 