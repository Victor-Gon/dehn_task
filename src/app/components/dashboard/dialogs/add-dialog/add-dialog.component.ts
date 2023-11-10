import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { Task } from 'src/app/model/task';
import { StatusEnum } from 'src/app/model/status-enum';
import { AddUpdateFormComponent } from '../add-update-form/add-update-form.component';


@Component({
    selector: 'app-add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['../dialogs.scss']
})
/**
 * Component for the add dialog
 */
export class AddDialogComponent extends AbstractDialogComponent {

    @ViewChild('addForm') addForm: AddUpdateFormComponent = new AddUpdateFormComponent(this.fb);
    public task: Task = new Task(0, '', '', new Date(), StatusEnum.PENDING);

    constructor(fb: FormBuilder, taskService: TaskService
     ) {
        super(fb, taskService);
    }

    /**
     * Logic to be executed when the confirm button is clicked
     */
    protected override confirmImplentation(): void {
        this.task = this.addForm.onSubmit();
        this.taskService.addTaskAsItem(this.task);
    }
}