import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { CrudService } from "src/app/services/crud.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  constructor(private crudService: CrudService) {}

  tasks: any;
  currentTask = null;
  currentIndex = -1;
  title = "";

  ngOnInit() {
    this.retrieveTasks();
  }

  onClose() {
    this.retrieveTasks();
  }

  retrieveTasks() {
    this.crudService.getAll().subscribe(
      (data) => {
        this.tasks = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList() {
    this.retrieveTasks();
    this.currentTask = null;
    this.currentIndex = -1;
  }

  setActiveTask(task, index) {
    this.currentTask = task;
    this.currentIndex = index;
  }
}
