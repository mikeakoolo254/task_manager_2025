import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  imports:[CommonModule]
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<string>();

  filterOptions: string[] = ['All', 'Completed', 'Pending'];
  selectedFilter: string = 'All';

  applyFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterChanged.emit(filter); // Notify parent component
  }
}
