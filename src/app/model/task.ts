import { StatusEnum } from "./status-enum";

/**
 * Class representing a task
 */
export class Task {
    
    public id: number;
    public title: string;
    public description: string;
    public dueDate: Date;
    public status: StatusEnum;

    constructor(id: number, title: string, description: string, dueDate: Date, status: StatusEnum) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}