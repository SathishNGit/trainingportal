import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

import { TrainingService } from '../training.service';

 declare var $ : any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  model= {};
  editModel = {};
  scheduleList;
  scheduleCount;

  scheduleDetails;
  delScheduleName;
  note;
  datetime;

  constructor(public toastr: ToastrManager, private trnServ:TrainingService) {
  }   

  ngOnInit() {
    this.showScheduleList();
  }

  //All the Schedules list getting from the Service 
  showScheduleList(){
    this.trnServ.getScheduleList().subscribe(data => {
      this.scheduleList = data;
      console.log(this.scheduleList);
      this.scheduleCount = this.scheduleList.length;
      console.log(this.scheduleList.length);
    });
  }

  //Get Schedule record for passed id from the Service
  getSchedule(id){
    this.trnServ.getSchedule(id).subscribe(data => {
      this.scheduleDetails = data;
      console.log(this.scheduleDetails);

      this.delScheduleName = this.scheduleDetails[0].name;

      this.editModel = data;
      var name = this.editModel[0].name;
      var department = this.editModel[0].department;
      var datetime = this.editModel[0].datetime;
      var duration = this.editModel[0].duration;
      var description = this.editModel[0].description;
      var meetroom = this.editModel[0].meetroom;
      var id = this.editModel[0].id;
      this.editModel = {name, department, datetime, duration, description, meetroom, id}
    });
  }

  successOnCreate() {
    this.toastr.successToastr('Record Created successfully');
  }
  successOnUpdate() {
    this.toastr.successToastr('Record Updated successfully');
  }
  successOnDelete() {
    this.toastr.successToastr('Record Deleted successfully');
  }

  //Creating Schedule and send it to Service
  addSchedule(){
    let a = JSON.stringify(this.model);
    console.log(a);
    this.trnServ.createschedule(this.model).subscribe(data => {
      console.log("Sending it to service " + JSON.stringify(data));
      this.savePopup();
      this.clearModelData();
      this.successOnCreate();
    });
  }

  //After entering details hiding save popup
  savePopup(){
    $("#addModal").modal("hide");
    this.showScheduleList();
  }

  clearModelData(){
    this.model = {};
  }

  //Update Schedule information (Pushing the updated data into Service)
  updateSchedule(){
    this.trnServ.updateSchedule(this.editModel).subscribe(data =>{
      console.log(data);
      this.updatePopup();
      this.successOnUpdate();
    })
  }

  //After modifying the Schedule data hiding the popup
  updatePopup(){
    $('#editModal').modal('hide');
    this.showScheduleList();
  }

  //Delete Schedule call
  deleteConfirm(){
    var sid = this.scheduleDetails[0].id;
    this.trnServ.deleteSchedule(sid).subscribe(data => {
    console.log("deleted");
    this.deletePopup();
    this.successOnDelete();
   });
 }

 //After Clicking on deleting hiding the popup
 deletePopup(){
   $("#deleteModal").modal("hide");
   this.showScheduleList();
 }

}
