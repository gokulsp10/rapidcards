import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;
  reminder: Date;
  tasks: { name: string, reminder: Date, isExpired: boolean }[] = [];

  addTaskVisible = false;
  viewTaskVisible = true;
  deleteTaskVisible = false;

  showAddTask() {
    this.addTaskVisible = true;
    this.viewTaskVisible = false;
    this.deleteTaskVisible = false;
  }

  showViewTask() {
    this.addTaskVisible = false;
    this.viewTaskVisible = true;
    this.deleteTaskVisible = false;
  }

  showDeleteTask() {
    this.addTaskVisible = false;
    this.viewTaskVisible = false;
    this.deleteTaskVisible = true;
  }

  addTask() {
    const newTask = {
      name: this.name,
      reminder: new Date(this.reminder),
      isExpired: false
    };

    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.name = '';
    this.reminder = null;
    this.showViewTask();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteAllTasks() {
    this.tasks = [];
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.showViewTask();
  }

  ngOnInit() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }

    setInterval(() => {
      for (let task of this.tasks) {
        if (new Date() > new Date(task.reminder)) {
          task.isExpired = true;
        }
      }
    }, 1000);
  }
}
