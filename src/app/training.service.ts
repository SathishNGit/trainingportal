import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://127.0.0.1:3000/';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http:HttpClient) {
  }

  getScheduleList():Observable<any>{
    var getResults = this.http.get(endpoint+'getallschedules');
    return getResults;
  }

  getSchedule(sid):Observable<any>{
    var getScheduleResults = this.http.get(endpoint+'getschedule/'+sid);
    return getScheduleResults;
  }

  createschedule(scheduleData):Observable<any>{
    var postResults = this.http.post(endpoint+'createschedule', scheduleData);
    return postResults;
  }

  updateSchedule(scheduleData):Observable<any>{
    var results = this.http.put(endpoint+'updateschedule', scheduleData);
    return results;
  }

  deleteSchedule(sid):Observable<any>{
    console.log(sid);
    var results = this.http.delete(endpoint+'deleteschedule/'+sid);
    return results;
  }
}