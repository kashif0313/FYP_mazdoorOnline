import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  serviceArray : any[] = [];
  constructor(private userService:UserDataService) { }

  ngOnInit(): void {
    this.loadServices();
  }
  loadServices()
  {
    this.userService.getDashboardDataCategory()
  
    .subscribe((resultData: any)=>
    {
      resultData.forEach((doc:any)=>{
        console.log(doc);
        this.serviceArray.push(doc);
      });
    });
  }
}
