/**
 * Created by ashish on 2/20/17.
 */
import {Component} from "@angular/core";
import {Task} from "../models/Task.model";
import {AppService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'create-task',
  templateUrl: './createTask.component.html',
  styleUrls: ['./createTask.component.css']
})

export class CreateTaskComponent {

  dayButtonLabel: string = 'Day';
  monthButtonLabel: string = 'Month';
  yearButtonLabel: string = 'Year';
  priorityButtonLabel: string = 'Priority';

  taskTitle: string = '';
  taskDescription: string = '';

  dayArray: number[] = [1, 2, 3, 4, 5, 6, , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  monthArray: string[] = [
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

  yearArray: number[] = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027,];

  priorityArray: string[] = [
    'Low',
    'Medium',
    'High'
  ];

  constructor(private appService: AppService, private _router: Router) {
  }


  dayClicked = function (event: any) {
    event.preventDefault();

    this.dayButtonLabel = event.target.innerText;

  };

  monthClicked = function (event: any) {
    event.preventDefault();

    this.monthButtonLabel = event.target.innerText;

  };

  yearClicked = function (event: any) {
    event.preventDefault();

    this.yearButtonLabel = event.target.innerText;

  };

  priorityClicked = function (event: any) {
    event.preventDefault();

    this.priorityButtonLabel = event.target.innerText;

  };

  captureTitle = function (title: string) {
    this.taskTitle = title;
  };

  captureDescription = function (description: string) {
    this.taskDescription = description;
  };

  addTask = function (event: any) {
    //event.preventDefault();

    let day = parseInt(this.dayButtonLabel);
    let month = this.monthButtonLabel;
    let year = parseInt(this.yearButtonLabel);
    let title = this.taskTitle;
    let description = this.taskDescription;
    let priority = this.priorityButtonLabel;

    console.log(year % 4);

    if (month in ['April', 'June', 'September', 'November'] && day == 31) {
      this.errorMessage = "This is a 30 days' month!";
    } else if (month == 'February' && year % 4 == 0 && day > 29) {
      this.errorMessage = "This is a 29 days' month!";
    } else if (month == 'February' && year % 4 != 0 && day > 28) {
      this.errorMessage = "This is a 28 days' month!";
    } else if (isNaN(year)) {
      this.errorMessage = "Choose year";
    } else if (isNaN(day)) {
      this.errorMessage = "Choose day";
    } else if (month.trim() == 'Month') {
      this.errorMessage = "Choose month";
    } else if (title.trim() == '') {
      this.errorMessage = "Write title for the task";
    } else if (description.trim() == '') {
      this.errorMessage = "Write description for the task";
    } else if (priority.trim() == 'Priority') {
      this.errorMessage = "Choose priority";
    }

    console.error("Error: " + this.errorMessage);

    if (this.errorMessage != '') {
      this.displayErrorFlag = 1;
      return;
    }

    this.appService.insertDataOnServer(
      new Task(
        day + ' ' + month + ' ' + year,
        title,
        description,
        priority
      )
    ).subscribe((data: any) => {
      this.displayErrorFlag = 0;
      this._router.navigate(['show-task']);
    }, (err: any) => {
      this._router.navigate(['show-task']);

    });


  };

  errorMessage: string = '';

  displayErrorFlag: number = 0;

  hideErrorPanel = function () {
    this.displayErrorFlag = 0;
    this.errorMessage = '';
  }


}
