import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../BackendServices/user-data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
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
