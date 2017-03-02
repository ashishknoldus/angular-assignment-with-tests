/**
 * Created by ashish on 2/20/17.
 */

export class Task {

  public date: string;
  public title: string;
  public description: string;
  public priority: string;

  constructor(
    date: string,
    title: string,
    description: string,
    priority: string
  ){
    this.date = date;
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}
