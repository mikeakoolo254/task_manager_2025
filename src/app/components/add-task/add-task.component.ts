import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  taskTitle : string = ''
  

  constructor(private taskService: TaskService){}

  addTask() {
    if(this.taskTitle.trim()){
      this.taskService.addTask(this.taskTitle)
      this.taskTitle = ''
    }
  }
}
