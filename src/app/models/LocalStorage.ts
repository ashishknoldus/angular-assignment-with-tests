import {Task} from "./Task.model";
/**
 * Created by ashish on 2/21/17.
 */


export class LocalStorage {

  add = function (key: string, value: Task) {

    localStorage.setItem(key, JSON.stringify(value));
  };

  get = function () {

    let items: Object[]= [];

    for (let i = 0; items.length < localStorage.length; i++) {
      if (localStorage.getItem(''+i) != null ) {
        items.push(JSON.parse(localStorage.getItem(''+i)));
      }
    }
    return items;
  };

  delete = function (key: string) {
    localStorage.removeItem(key);
  }

}
