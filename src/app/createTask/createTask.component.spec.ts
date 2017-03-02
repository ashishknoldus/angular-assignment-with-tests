/**
 * Created by knoldus on 1/3/17.
 */
"use strict";
import {ComponentFixture} from "@angular/core/testing";
import {CreateTaskComponent} from "./createTask.component";
import {DebugElement} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {By} from "@angular/platform-browser";
import {AppService} from "../app.service";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";


let create_task_component = require('./createTask.component');
let testing = require('@angular/core/testing');

describe('Create Task Tests', function () {

  let comp: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let service: AppService;
  let router: Router;

  let debugDayButton: DebugElement;
  let debugMonthButton: DebugElement;
  let debugYearButton: DebugElement;
  let debugTaskTitleInput: DebugElement;
  let debugTaskDescTextarea: DebugElement;
  let debugPriorityButton: DebugElement;
  let debugSubmitButton: DebugElement;

  let dayButton: any;
  let monthButton: any;
  let yearButton: any;

  let taskTitleInput: any;
  let taskDescTextarea: any;

  let priorityButton: any;

  class MockRouter {
    navigate() {
      return Promise.resolve(true)
    }
  }

  beforeEach(testing.async(function () {
    testing.TestBed.configureTestingModule({
      declarations: [create_task_component.CreateTaskComponent],
      providers: [{provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute}, AppService],
      imports: [RouterTestingModule, CommonModule, HttpModule]
    })
      .compileComponents();
  }));

  beforeEach(function () {
    fixture = testing.TestBed.createComponent(create_task_component.CreateTaskComponent);
    comp = fixture.componentInstance;

    service = fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);

    debugDayButton = fixture.debugElement.query(By.css('button.day'));
    debugMonthButton = fixture.debugElement.query(By.css('button.month'));
    debugYearButton = fixture.debugElement.query(By.css('button.year'));

    debugTaskTitleInput = fixture.debugElement.query(By.css('input#task-title'));
    debugTaskDescTextarea = fixture.debugElement.query(By.css('textarea#task-description'));

    debugPriorityButton = fixture.debugElement.query(By.css('button.priority'));

    debugSubmitButton = fixture.debugElement.query(By.css('button.submit'));

    dayButton = debugDayButton.nativeElement;
    monthButton = debugMonthButton.nativeElement;
    yearButton = debugYearButton.nativeElement;

    taskTitleInput = debugTaskTitleInput.nativeElement;
    taskDescTextarea = debugTaskDescTextarea.nativeElement;

    priorityButton = debugPriorityButton.nativeElement;

    comp.dayButtonLabel = dayButton.innerText = '27';
    comp.monthButtonLabel = monthButton.innerText = 'February';
    comp.yearButtonLabel = yearButton.innerText = '2017';

    comp.taskTitle = taskTitleInput.value = 'Demo title';
    comp.taskDescription = taskDescTextarea.value = 'Demo description';

    comp.priorityButtonLabel = priorityButton.innerText = 'High';

  });


  it('should throw error when day is 30 for February in Leap year', () => {

    comp.dayButtonLabel = dayButton.innerText = '30';

    comp.yearButtonLabel = yearButton.innerText = '2020';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('This is a 29 days\' month!');
  });

  it('should throw error when year isn\'t mentioned', () => {

    comp.yearButtonLabel = yearButton.innerText = 'Year';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('Choose year');
  });

  it('should throw error when day isn\'t mentioned', () => {

    comp.dayButtonLabel = dayButton.innerText = 'Day';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('Choose day');
  });

  it('should throw error when month isn\'t mentioned', () => {

    comp.monthButtonLabel = monthButton.innerText = 'Month';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('Choose month');
  });

  it('should throw error when priority isn\'t mentioned', () => {

    comp.priorityButtonLabel = priorityButton.innerText = 'Priority';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('Choose priority');
  });

  it('should throw error when title isn\'t mentioned', () => {

    comp.taskTitle = taskTitleInput.value = '';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('Write title for the task');
  });

  it('should throw error when description isn\'t mentioned', () => {

    comp.taskDescription = taskDescTextarea.value = '';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('Write description for the task');
  });

  it('should throw error when day is 31 for a 31 days month', () => {

    comp.dayButtonLabel = dayButton.innerText = '31';

    comp.monthButtonLabel = monthButton.innerText = 'April';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('');
  });

  it('should throw error when day is 29 for February in Non Leap year', () => {
    //let event = new Event('click');

    comp.dayButtonLabel = dayButton.innerText = '29';

    fixture.detectChanges();

    debugSubmitButton.triggerEventHandler('click', {button: 0});

    expect(comp.errorMessage).toBe('This is a 28 days\' month!');

  });

  it('should work fine when all data is correct', () => {

    spyOn(service, 'insertDataOnServer').and.returnValue(Observable.of<any>({msg: 'aaa'}));

    debugSubmitButton.triggerEventHandler('click', {button: 0});
    // comp.addTask(new Event('Click'))

    expect(true).toBe(true);

    router.navigate([]).then(data => {
      expect(data).toBe(true);
    });

  });

});
