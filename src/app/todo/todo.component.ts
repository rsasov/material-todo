import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ITodo } from '../models/todo.model';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-todo',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  searchTerm: string = '';

  todos: ITodo[] = [
    { value: 'Learn Angular', isCompleted: false },
    { value: 'Build an app', isCompleted: false },
    { value: 'Deploy to production', isCompleted: true }
  ]
  
  canAddTodo(): boolean {
    const trimmedSearchTerm = this.searchTerm.trim();
    const searchTermIsProvided = trimmedSearchTerm.length > 0;
    const hasNoMatchingTodos = !this.todos.some(todo => todo.value.toLowerCase() === trimmedSearchTerm.toLowerCase());
    return searchTermIsProvided && hasNoMatchingTodos;
  }

  addTodo(): void {
    const todoToAdd: ITodo = { value: this.searchTerm.trim(), isCompleted: false };
    if (!this.todos.includes(todoToAdd)) {
      this.todos.push(todoToAdd);
      this.searchTerm = '';
    }
  }

  canDeleteTodo(): boolean {
    return this.todos.some(todo => todo.isCompleted);
  }

  deleteCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.isCompleted);
  }
}
