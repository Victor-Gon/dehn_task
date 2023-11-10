import { Injectable } from '@angular/core';
import { Task } from 'src/app/model/task';
import { StatusEnum } from 'src/app/model/status-enum';
import { LocalStorageService } from '../persistance/local-storage.service';

@Injectable({
    providedIn: 'root',
})
/**
 * CRUD Service for managing tasks
 */
export class TaskService {

    private readonly LOCAL_STORAGE_TASKS_KEY = 'tasks';
    private tasks: Task[] = [];


    constructor(
        private localStorageService: LocalStorageService
    ) {
        this.tasks = this.localStorageService.loadData(this.LOCAL_STORAGE_TASKS_KEY) || [];
        if (this.tasks.length === 0) {
            this.generateMockTasks();
        }
    }

    /**
     * Generates mock tasks for testing purposes
     * @private
     */
    private generateMockTasks(): void {
        this.addTask('Task 1', 'Description 1', new Date('2023-11-10'), StatusEnum.PENDING);
        this.addTask('Task 2', 'Description 2', new Date('2023-11-10'), StatusEnum.PENDING);
        this.addTask('Task 3', 'Description 3', new Date('2023-11-10'), StatusEnum.COMPLETED);
        this.addTask('Task 4', 'Description 4', new Date('2023-11-10'), StatusEnum.PENDING);
        this.addTask('Task 5', 'Description 5', new Date('2023-11-10'), StatusEnum.COMPLETED);
    }

    /**
     * Returns the list of all tasks
     * @returns {Task[]} the list of tasks
     */
    public getTasks(): Task[] {
        return this.tasks;
    }

    /**
     * Returns the task with the given id
     * @param id 
     * @returns {Task | undefined} the task with the given id or undefined if not found
     */
    public getTaskById(id: number): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    /**
     * Returns next available id
     * @returns {number} the next id
     */
    public getNextId(): number {
        return this.tasks.map(task => task.id).reduce((max, current) => Math.max(max, current), 0) + 1;
    }

    /**
     * Adds a new task to the list
     * @param title 
     * @param description 
     * @param dueDate 
     * @param status 
     * @returns {Task} the added task
     */
    public addTask(title: string, description: string, dueDate: Date, status: StatusEnum): Task {
        const id = this.getNextId();
        const newTask = new Task(id, title, description, dueDate, status);
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    /**
     * Adds a new task to the list
     * @param task 
     * @returns {Task} the added task
     */
    public addTaskAsItem(task: Task): Task {
        const id = this.getNextId();
        const newTask = new Task(id, task.title, task.description, task.dueDate, task.status);
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    /**
     * Updates the task with the given id
     * @param id 
     * @param updatedTask 
     * @returns {Task | undefined} the updated task or undefined if not found
     */
    public updateTask(id: number, updatedTask: Task): Task | undefined {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks[index] = { ...updatedTask, id: id };
            this.saveTasks();
            return this.tasks[index];
        }
        return undefined;
    }

    /**
     * Deletes the task with the given id
     * @param id 
     * @returns {boolean} true if the task was deleted, false otherwise
     */
    public deleteTask(id: number): boolean {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            return true;
        }
        return false;
    }

    /**
     * Saves the tasks to the local storage
     * @private
     */
    private saveTasks(): void {
        this.localStorageService.saveData(this.LOCAL_STORAGE_TASKS_KEY, this.tasks);
    }
}