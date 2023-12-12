import { Component, OnInit } from '@angular/core';
import { JobDetails } from '../models/jo-details.model';
import { UserDataService } from '../BackendServices/user-data.service';
import { JobsComponent } from '../jobs/jobs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  jobDetails = new JobDetails;
  constructor( private userService:UserDataService,private router:Router, private jobsComp:JobsComponent) { }
  imageSrc: any= "../../assets/Upload.png";
  loginID:any;
  file:any;
  imagePath:any ;
finalPath:any;
catArray : any[] = [];

  ngOnInit(): void {
    this.getLabourCategories()
  }
  closePost()
  {this.jobsComp.display = false}
  getLabourCategories()
  {
    this.userService.getLabourCat().subscribe((resultData: any)=>
    {
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.catArray.push(doc);
      });
    })
  }
  uploadedImage(data:any)
  {
    if (data.target.files && data.target.files[0]) {
     this.file = data.target.files[0];

        const reader = new FileReader();
        reader.onload = e =>this.imageSrc = reader.result;

        reader.readAsDataURL(this.file);
        //this.jobDetails.jobImage = data.target.files[0];
    }
  }
  jobCost(data:any)
  {
    this.jobDetails.jobCost = data;
  }
  postJobData()
  {
    this.loginID = sessionStorage.getItem('LoginUserID');
    this.jobDetails.uploadedBy = this.loginID;
    // this.jobDetails.jobImage = this.file.name;
    //this.jobDetails.jobImage.append("file",this.file,this.file.name);
    var newFormData = new FormData();
    newFormData.append("file",this.file,this.file.name);
    // this.imagePath = 'E:\AngularProjects\FYP_mazdoorOnline\src\assets';
    // this.finalPath = this.imagePath.concat(this.jobDetails.jobImage);
    //var str3 = str1.concat(str2.toString());
    newFormData.append("jobImage",this.file.name);
    newFormData.append("jobTitle",this.jobDetails.jobTitle);
    newFormData.append("jobDetails",this.jobDetails.jobDetails);
    newFormData.append("jobCost",this.jobDetails.jobCost);
    newFormData.append("jobLocation",this.jobDetails.jobLocation);
    newFormData.append("uploadedby",this.jobDetails.uploadedBy);
    newFormData.append("jobLabour",this.jobDetails.jobLabour);
    console.log(newFormData);
    this.userService.postJob(newFormData).subscribe((res)=>{
      console.log("post sending data "+res);
      this.jobsComp.display = false;
      this.router.navigate(['/Jobs'])
      .then(() => {
    window.location.reload();
  });
    })
  }
  


}
