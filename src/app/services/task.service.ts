import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  // Observable to track tasks
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    if (this.isBrowser()) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
        this.tasksSubject.next(this.tasks); // Notify subscribers of the initial tasks
      }
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.updateTasks();
  }

  toggleTaskCompletion(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.updateTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.updateTasks();
  }

  private updateTasks() {
    this.tasksSubject.next(this.tasks); // Emit updated tasks to subscribers
    this.saveTasks();
  }

  private saveTasks() {
    if (this.isBrowser()) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
