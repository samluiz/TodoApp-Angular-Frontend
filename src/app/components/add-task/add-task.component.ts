import { Component, OnInit } from "@angular/core";
import { CrudService } from "src/app/services/crud.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent implements OnInit {
  constructor(private crudService: CrudService) {}

  task = {
    title: "",
    description: "",
  };

  submitted = false;

  ngOnInit() {}

  saveTask() {
    const data = {
      title: this.task.title,
      description: this.task.description,
    };

    this.crudService.create(data).subscribe(
      (response) => {
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newTask() {
    this.submitted = false;
    this.task = {
      title: "",
      description: "",
    };
  }
}
