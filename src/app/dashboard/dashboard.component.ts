import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';
import { NewCategory } from '../models/new-category.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  DashboardArray : any[] = [];
  categoryArray:any[] = [];
  constructor(private userService:UserDataService) { }
  categoryName=new NewCategory;
  openNewAddCatory:boolean = false;
  updateCategoryId:any;
  updateCategoryOldName:any;
  openUpdate:boolean=false;
  iconSrc:any;
  imgSrc:any;
  file:any;
  file1:any;
  fileName:any;
  fileName1:any;
 newFormData = new FormData();

  ngOnInit(): void {
    this.getData();
    this.getCategoryData();
  }
  addNewCategory()
  {
    this.openNewAddCatory = true;
    
  }
  getCategoryData()
  {
    this.userService.getDashboardDataCategory()
  
    .subscribe((resultData: any)=>
    {
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.categoryArray.push(doc);
      });
    });
  }
getData()
{
  this.userService.getDashboardData()
  
    .subscribe((resultData: any)=>
    {
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.DashboardArray.push(doc);
      });
    });
}
uploadCatIcon(data:any)
{
  if (data.target.files && data.target.files[0]) {
    this.file = data.target.files[0];

       const reader = new FileReader();
       reader.onload = e =>this.iconSrc = reader.result;

       reader.readAsDataURL(this.file);
       //this.fileName = this.file.split('.').pop();
       var newFileName=this.file.name;
       var fileExt =newFileName.split('.').pop();
       var addExtention = "."
       this.fileName = this.categoryName.category.concat(addExtention);
       this.fileName = this.fileName.concat(fileExt);
       //console.log("file extention = "+this.fileName);
        this.categoryName.icon = this.fileName;
       //this.jobDetails.jobImage = data.target.files[0];
       this.newFormData.append("file",this.file,this.file.name);
  
   }
}
uploadCatImage(data:any)
{
  if (data.target.files && data.target.files[0]) {
    this.file1 = data.target.files[0];

       const reader = new FileReader();
       reader.onload = e =>this.imgSrc = reader.result;

       reader.readAsDataURL(this.file1);
       //this.fileName = this.file.split('.').pop();
       var newFileName1=this.file1.name;
       var fileExt1 =newFileName1.split('.').pop();
       var addExtention = "."
        this.fileName1 = this.categoryName.category.concat(addExtention);
       this.fileName1 = this.fileName1.concat(fileExt1);
       //console.log("file extention = "+this.fileName);
        this.categoryName.catImage = this.fileName1;
       //this.jobDetails.jobImage = data.target.files[0];
       this.newFormData.append("file1",this.file1,this.file1.name);
   }
}
uploadNewCategory()
{    
  this.newFormData.append("category",this.categoryName.category);
  
  this.newFormData.append("icon",this.categoryName.icon);
  this.newFormData.append("catImage",this.categoryName.catImage);
  this.userService.uploadCategory(this.newFormData).subscribe((res)=>{
    console.log("post sending data "+res);
    this.openNewAddCatory = false;
    //window.location.reload();
  })
}
updateCategory(data:any,name:any)
{
  this.updateCategoryId = data;
  this.updateCategoryOldName = name;
  this.openUpdate=true;
  
}
updateNewCategory()
{
  var newFormData = new FormData();
  newFormData.append("id",this.updateCategoryId);
  newFormData.append("name",this.categoryName.category);
  this.userService.updateCategory(newFormData).subscribe((res)=>{
    console.log("post sending data "+res);
    if(res =="success")
    {
      window.location.reload();
    }
    
  })
}
deleteCategory(data:any)
{
  this.userService.deleteCategory(data).subscribe((res)=>{
    console.log("post sending data "+res);
    if(res =="success")
    {
      window.location.reload();
    }
    
  })
}
blockUser(data:any)
{
  this.userService.deleteUser(data).subscribe((res)=>{
    console.log("admin data "+res);
    if(res=='"success"')
    {
      window.location.reload();
    }
    
  })
}
unblockUser(data:any)
{
  this.userService.restoreUser(data).subscribe((res)=>{
    console.log("unblock data "+res);
    if(res=='"success"')
    {
      window.location.reload();
    }
  })
}
}