/**
 * Created by knoldus on 22/2/17.
 */


import {Component} from "@angular/core";
import {Task} from "../models/Task.model";
import {AppService} from '../app.service';
import {ShowTaskComponent} from "../showTask/showTask.component";
import {Router} from "@angular/router";

@Component({
  moduleId : module.id,
  selector : 'update-task',
  templateUrl : './updateTask.component.html',
  styleUrls: ['./updateTask.component.css']
})

export class UpdateTaskComponent{

  updateTaskID: string = ShowTaskComponent.taskToUpdate? ShowTaskComponent.taskIdToUpdate :
      this._router.navigate(['show-task']) + '';

  date:string[] = ShowTaskComponent.taskToUpdate? ShowTaskComponent.taskToUpdate.date.trim().split(' '): [];

  dayButtonLabel: string = ShowTaskComponent.taskToUpdate? this.date[0] : 'Day';
  monthButtonLabel: string = ShowTaskComponent.taskToUpdate? this.date[1] : 'Month';
  yearButtonLabel:string = ShowTaskComponent.taskToUpdate? this.date[2] : 'Year';

  taskTitle = ShowTaskComponent.taskToUpdate? ShowTaskComponent.taskToUpdate.title : '';
  taskDescription = ShowTaskComponent.taskToUpdate? ShowTaskComponent.taskToUpdate.description : '';
  priorityButtonLabel = ShowTaskComponent.taskToUpdate? ShowTaskComponent.taskToUpdate.priority : 'Priority';

  dayArray : number[] = [1,2,3,4,5,6,,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

  monthArray : string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  yearArray : number[] = [2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,];

  priorityArray : string[] = [
    'Low',
    'Medium',
    'High'
  ];

  dayClicked = function(event:any) {
    event.preventDefault();

    this.dayButtonLabel = event.target.innerText;
  };

  monthClicked = function(event:any) {
    event.preventDefault();

    this.monthButtonLabel = event.target.innerText;
  };

  yearClicked = function(event:any) {
    event.preventDefault();

    this.yearButtonLabel = event.target.innerText;
  };

  priorityClicked = function(event:any) {
    event.preventDefault();

    this.priorityButtonLabel = event.target.innerText;
  };

  captureTitle = function (title: string) {
    this.taskTitle = title;
  };

  captureDescription = function (description: string) {
    this.taskDescription = description;
  };

  updateTask = function() {

    event.preventDefault();

    this.appService.updateDataOnServer(this.updateTaskID,
      new Task(
        parseInt(this.dayButtonLabel)+' '+
        this.monthButtonLabel+' '+
        parseInt(this.yearButtonLabel),
        this.taskTitle,
        this.taskDescription,
        this.priorityButtonLabel
      )
    ).subscribe();

    this._router.navigate(['show-task']);

  };

  constructor(private appService: AppService, private _router: Router) {}

}
