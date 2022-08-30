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
  currentTask = {
    id: 0,
    title: "",
    description: "",
    complete: false,
    created: 0,
  };
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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList() {
    this.retrieveTasks();
    this.currentTask = {
      id: 0,
      title: "",
      description: "",
      complete: false,
      created: 0,
    };
    this.currentIndex = -1;
  }

  setActiveTask(task, index) {
    this.currentTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      complete: task.complete,
      created: task.created,
    };
    this.currentIndex = index;
  }

  deleteTask(id) {
    id = this.currentTask.id;
    console.log(id);
    if (!this.currentTask.complete) {
      if (confirm("Isto irá deletar a tarefa, você já completou??")) {
        this.crudService.delete(id).subscribe((response) => {
          this.retrieveTasks();
          this.refreshList();
        });
      }
    } else {
      this.crudService.delete(id).subscribe((response) => {
        this.retrieveTasks();
        this.refreshList();
      });
    }
  }

  editTask(id) {
    const data = {
      title: this.currentTask.title,
      description: this.currentTask.description,
      complete: false,
    };

    id = this.currentTask.id;
    this.crudService.update(id, data).subscribe((response) => {
      this.retrieveTasks();
      this.refreshList();
    });
  }

  completeTask(id) {
    const data = {
      title: this.currentTask.title,
      description: this.currentTask.description,
      complete: true,
    };

    id = this.currentTask.id;

    this.crudService.update(id, data).subscribe(
      (response) => {
        this.retrieveTasks();
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
