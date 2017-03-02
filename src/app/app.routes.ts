/**
 * Created by knoldus on 21/2/17.
 */
import {Routes} from "@angular/router";
import {ShowTaskComponent} from "./showTask/showTask.component";
import {CreateTaskComponent} from "./createTask/createTask.component";
import {HomeComponent} from "./home/home.component";
import {UpdateTaskComponent} from "./updateTask/updateTask.component";

export const routes: Routes = [
  {
    path: 'show-task',
    component: ShowTaskComponent
  }, {
    path: 'create-task',
    component: CreateTaskComponent
  }, {
    path: 'update-task',
    component: UpdateTaskComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix'
  }
];


