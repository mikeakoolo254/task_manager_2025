import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task.models';
import { FilterComponent } from "../filter/filter.component";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [MatCheckboxModule, MatIconModule, CommonModule, MatButtonModule, FilterComponent],
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  allTasks: Task[] = [] // Full task list
  tasks: Task[] = []; // Filtered task list
  selectedFilter: string = 'All'; // Default filter

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // Subscribe to tasks observable
    this.taskService.tasks$.subscribe((tasks) => {
      this.allTasks = tasks; // Update full task list
      this.applyFilter(); // Apply the current filter
    });
  }

  toggleCompletion(id: number) {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  // Handle filter change
  onFilterChange(filter: string) {
    this.selectedFilter = filter; // Update the selected filter
    this.applyFilter(); // Re-apply the filter to the task list
  }
  // Apply filtering logic
  private applyFilter() {
    if (this.selectedFilter === 'All') {
      this.tasks = this.allTasks;
    } else if (this.selectedFilter === 'Completed') {
      this.tasks = this.allTasks.filter((task) => task.completed);
    } else if (this.selectedFilter === 'Pending') {
      this.tasks = this.allTasks.filter((task) => !task.completed);
    }
  }
}
