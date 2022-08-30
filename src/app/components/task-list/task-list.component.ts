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
    completed: false,
  };
  currentIndex = -1;
  title = "";

  ngOnInit() {
    this.retrieveTasks();
    console.log(this.currentTask);
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
    this.currentTask = {
      id: 0,
      title: "",
      description: "",
      completed: false,
    };
    this.currentIndex = -1;
  }

  setActiveTask(task, index) {
    this.currentTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
    };
    this.currentIndex = index;
    console.log(this.currentTask);
  }

  deleteTask(id) {
    id = this.currentTask.id;
    console.log(id);
    if (confirm("Isto irá deletar a tarefa, você já completou??")) {
      this.crudService.delete(id).subscribe((response) => {
        console.log(response);
        this.retrieveTasks();
        this.refreshList();
      });
    }
  }

  editTask(id) {
    const data = {
      title: this.currentTask.title,
      description: this.currentTask.description,
    };

    id = this.currentTask.id;
    this.crudService.update(id, data).subscribe((response) => {
      console.log(response);
      this.retrieveTasks();
      this.refreshList();
    });
  }
}
