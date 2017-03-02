/**
 * Created by ashish on 2/20/17.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Task} from "../models/Task.model";
import {AppService} from "../app.service";

@Component({
  moduleId : module.id,
  selector : 'show-task',
  templateUrl : './showTask.component.html',
  styleUrls: ['./showTask.component.css'],
})

export class ShowTaskComponent extends OnInit{

  tasks:Task[];

  static taskToUpdate: Task = null;
  static taskIdToUpdate:string = '';

  displayDetailsFlag:number = 0;

  displayTaskDate: string;
  displayTaskTitle: string;
  displayTaskDescription: string;
  displayTaskPriority: string;

  displayWarningFlag: number = 0;
  warningMessage: string = 'Do you really want to delete this task?';
  eventOfDeletionFiredFrom:any ;

  ngOnInit() {
    setInterval(() => {this.refreshTasks()}, 3000);
  }

  constructor(private appService: AppService, private _router:Router){
    super();
    this.refreshTasks();
  }

  refreshTasks = function() {

    this.appService.retrieveDataFromServer().subscribe((data: any) => {

      //this.appService.taskArray = data;

      this.tasks = data;

    });

  };

  deleteTask = function(event: any) {

    event.preventDefault();

    event = this.eventOfDeletionFiredFrom;

    let id = event.target.title;

    this.appService.deleteDataOnServer(id).subscribe();

    this.displayWarningFlag = 0;

    this.refreshTasks();
  };

  updateTask = function(event: any) {
    event.preventDefault();

    ShowTaskComponent.taskIdToUpdate = event.target.title;

    let taskWrapper: any = event.target.parentNode.parentNode.parentNode;
    let taskDate: string = taskWrapper.querySelector('div.task-date').innerText;
    let taskTitle: string = taskWrapper.querySelector('div.task-title').innerText;
    let taskDescriptor: string = taskWrapper.querySelector('div.task-descriptor').innerText;
    let taskPriority: string = taskWrapper.querySelector('div.task-priority').innerText;

    ShowTaskComponent.taskToUpdate = new Task(
      taskDate,
      taskTitle,
      taskDescriptor,
      taskPriority
    );

    this._router.navigate(['update-task']);

  };


  displayDetails = function(event: any) {

    event.preventDefault();

    this.displayDetailsFlag = 1;

    let taskWrapper: any = event.target.parentNode.parentNode;

    this.displayTaskDate = taskWrapper.querySelector('div.task-date').innerText;
    this.displayTaskTitle = taskWrapper.querySelector('div.task-title').innerText;
    this.displayTaskDescription = taskWrapper.querySelector('div.task-descriptor').innerText;
    this.displayTaskPriority = taskWrapper.querySelector('div.task-priority').innerText;

  };

  hideDetails = function(event: any) {
    event.preventDefault();

    this.displayDetailsFlag = 0;
  };

  showDeletionWarning = function(event:any) {
    event.preventDefault();

    this.eventOfDeletionFiredFrom = event;

    this.displayWarningFlag = 1;
  };

  hideWarningPanel = function(event: any) {
    if(event) {
      event.preventDefault();
    }
    this.displayWarningFlag = 0;
  };

}
