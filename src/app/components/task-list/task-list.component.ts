import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task.models';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [MatCheckboxModule,MatIconModule,CommonModule,MatButtonModule],
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Task list to display

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // Subscribe to tasks observable
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks; // Update local task list whenever tasks change
    });
  }

  toggleCompletion(id: number) {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}
