/**
 * Created by knoldus on 2/3/17.
 */
"use strict";
import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {ShowTaskComponent} from "./showTask.component";
import {DebugElement} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {By} from "@angular/platform-browser";
import {AppService} from "../app.service";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Task} from "../models/Task.model";


describe('Show Task Component\'s Tests', function () {

  let comp: ShowTaskComponent;
  let fixture: ComponentFixture<ShowTaskComponent>;
  let service: AppService;
  let router: Router;

  let debugTaskDate: DebugElement[];
  let debugTaskTitle: DebugElement[];
  let debugTaskDescription: DebugElement[];
  let debugTaskPriority: DebugElement[];
  let debugTaskId: DebugElement[];
  let debugDeleteButton: DebugElement[];
  let debugEditButton: DebugElement[];

  let taskDates: any[];
  let taskTitles: any[];
  let taskDescriptions: any[];
  let taskPriorities: any[];
  let taskIds: any[];

  class MockRouter {
    navigate() {
      return Promise.resolve(true)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTaskComponent],
      providers: [{provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute}, AppService],
      imports: [RouterTestingModule, CommonModule, HttpModule]
    })
      .compileComponents();
  }));

  beforeEach( () => {

    fixture = TestBed.createComponent(ShowTaskComponent);
    service = fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);

    let dummyTasks: any[] = [
      {
        "date": "12 October 2017",
        "title": "Demo task 1",
        "description": "Demo task 1 desc",
        "priority" : "High",
        "_id" : "1"
      },
      {
        "date": "1 January 2018",
        "title": "Demo task 2",
        "description": "Demo task 2 desc",
        "priority" : "Low",
        "_id" : "2"
      },
      {
        "date": "5 July 2017",
        "title": "Demo task 3",
        "description": "Demo task 3 desc",
        "priority" : "High",
        "_id" : "3"
      },
      {
        "date": "19 October 2019",
        "title": "Demo task 4",
        "description": "Demo task 4 desc",
        "priority" : "Medium",
        "_id" : "4"
      }
    ];

    spyOn(service, 'retrieveDataFromServer').and.returnValue(Observable.of<any[]>(dummyTasks));


    fixture = TestBed.createComponent(ShowTaskComponent);
    comp = fixture.componentInstance;
    console.log("----------------------------> comp ", comp);



    debugTaskDate = fixture.debugElement.queryAll(By.css('div.task-date'));
    console.log("----------------------------> debugTaskDate ", debugTaskDate);

    debugTaskTitle = fixture.debugElement.queryAll(By.css('div.task-title'));
    console.log("----------------------------> debugTaskTitle ", debugTaskTitle);

    debugTaskDescription = fixture.debugElement.queryAll(By.css('div.task-description'));
    debugTaskPriority = fixture.debugElement.queryAll(By.css('div.task-priority'));
    debugTaskId = fixture.debugElement.queryAll(By.css('a.btn.edit')); //delete would also work

    let counter: number = 0;

    for(let date of debugTaskDate) {
      taskDates.push(date.nativeElement);
      taskDates[counter].innerText = dummyTasks[counter].date;
      counter ++;
    }

    counter = 0;

    for(let title of debugTaskTitle) {
      taskTitles.push(title.nativeElement);
      taskTitles[counter].innerText = dummyTasks[counter].title;
      counter ++;
    }

    counter = 0;

    for(let desc of debugTaskDescription) {
      taskDescriptions.push(desc.nativeElement);
      taskDescriptions[counter].innerText = dummyTasks[counter].description;
      counter ++;
    }

    counter = 0;

    for(let priority of debugTaskPriority) {
      taskPriorities.push(priority.nativeElement);
      taskPriorities[counter].innerText = dummyTasks[counter].priority;
      counter ++;
    }

    counter = 0;

    for(let id of debugTaskId) {
      taskIds.push(id.nativeElement);
      taskIds[counter].innerText = dummyTasks[counter]._id;
      counter ++;
    }

  });

  it('should load all the tasks on page', () =>{

    expect(4).toBe(comp.tasks.length);

  });

  it('test whether a correct test has loaded', () =>{

    expect(taskTitles).toBe(["Demo task 1", "Demo task 2", "Demo task 3", "Demo task 4"]);

  });

  it

});
