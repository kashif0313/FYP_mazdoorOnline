import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private API_URl =environment.API_URl;
  constructor(private httpRequest:HttpClient) { }

  getDataFormApi()
  {
     return this.httpRequest.get(this.API_URl+'/Users',{responseType: 'text'});
  }
  postDataFormApi(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/UsersData',data,{responseType: 'json'});
  }
  LoginUser(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/LoginUser',data,{responseType: 'json'});
  }
  postJob(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/jobData',data,{responseType: 'text'});
  }
  getJobs()
  {
    return this.httpRequest.get(this.API_URl+'/JobsDB',{responseType: 'json'});
  }
  getDashboardData()
  {
    return this.httpRequest.get(this.API_URl+'/DashboardData',{responseType: 'json'});
  }
  uploadCategory(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/newCategory',data,{responseType: 'text'});
  }
  updateCategory(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/updateCategory',data,{responseType: 'text'});
  }
  deleteCategory(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/deleteCategory',data,{responseType: 'text'});
  }
  deleteUser(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/removeUser',data,{responseType: 'text'});
  }
  restoreUser(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/restoreUser',data,{responseType: 'text'});
  }
  updateUserDetails(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/updateUserDetails',data,{responseType: 'text'});
  }
  getDashboardDataCategory()
  {
    return this.httpRequest.get(this.API_URl+'/getCategory',{responseType: 'json'});
  }

  getUserProfileDB(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/getProfile',data,{responseType: 'json'});
  }
  updateUser(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/updateProfile',data,{responseType: 'text'});
  }
  getLabourCat()
  {
    return this.httpRequest.get(this.API_URl+'/getCategory',{responseType: 'json'});
  }
  openJob(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/getjobDB',data,{responseType: 'json'});
  }
  rejectJob(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/rejectJob',data,{responseType: 'text'});
  }
  bidJob(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/bidJob',data,{responseType: 'json'});
  }
  getBidJob(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/bidJobGet',data,{responseType: 'json'});
  }
  openBidderProfile(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/bidProfile',data,{responseType: 'json'});
  }
  submitRatings(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/ratings',data,{responseType: 'json'});
  }
  retriveRatings(data:any)
  {
    return this.httpRequest.post(this.API_URl+'/ratingsGet',data,{responseType: 'json'});
  }
}
