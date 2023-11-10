import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
/**
 * Component for the dashboard, SPA root
 */
export class DashboardComponent {

    public tasks: Task[];
    public displayAddDialog: boolean = false;
    public displayDeleteDialog: boolean = false;
    public displayUpdateDialog: boolean = false;
    public updateID: number | undefined;

    constructor(private taskService: TaskService) {
        this.tasks = this.taskService.getTasks();
    }

    public onDeleteTask(id: number): void {
        this.taskService.deleteTask(id);
    }

    public onUpdateTask(id: number): void {
        this.updateID = id;
        this.displayUpdateDialog = true;
    }
}