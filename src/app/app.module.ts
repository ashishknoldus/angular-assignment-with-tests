import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { CreateTaskComponent} from "./createTask/createTask.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ShowTaskComponent} from "./showTask/showTask.component";
import {AppService} from "./app.service";
import {HttpModule} from "@angular/http";
import {HomeComponent} from "./home/home.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {UpdateTaskComponent} from "./updateTask/updateTask.component";

@NgModule({
  imports:      [ BrowserModule, CommonModule, FormsModule, HttpModule, RouterModule.forRoot(routes)],
  declarations: [ AppComponent , HomeComponent, CreateTaskComponent, ShowTaskComponent, UpdateTaskComponent],
  bootstrap:    [ AppComponent ],
  providers:    [ AppService]
})
export class AppModule {  }
