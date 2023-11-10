import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { Task } from 'src/app/model/task';
import { AddUpdateFormComponent } from '../add-update-form/add-update-form.component';


@Component({
    selector: 'app-update-dialog',
    templateUrl: './update-dialog.component.html',
    styleUrls: ['../dialogs.scss']
})
/**
 * Component for the update dialog
 */
export class UpdateDialogComponent extends AbstractDialogComponent implements OnChanges {

    @ViewChild('updateForm') updateForm: AddUpdateFormComponent = new AddUpdateFormComponent(this.fb);
    @Input() updateID: number | undefined;
    public taskSearchForm: FormGroup = this.fb.group({});
    public taskToEdit: Task | undefined = undefined;

    constructor(fb: FormBuilder, taskService: TaskService) {
        super(fb, taskService);
        this.taskSearchForm = this.fb.group({
            id: [null],
        });
        this.taskSearchForm.controls['id'].valueChanges.subscribe((id: number) => {
            this.getTaskAndSetFormValues(id);
        });
    }

    /**
     * Gets the task to edit when the updateID changes
     */
    public ngOnChanges(): void {
        setTimeout(() => {
            this.updateID !== undefined && this.getTaskAndSetFormValues(this.updateID);
            this.taskSearchForm.controls['id'].setValue(this.updateID);
        }, 0);
    }

    /**
     * Gets the task to edit and sets the form values
     * @param id 
     */
    private getTaskAndSetFormValues(id: number): void {
        this.taskToEdit = this.taskService.getTaskById(id);
        this.taskToEdit && this.updateForm.setFormValues(this.taskToEdit);
    }

    /**
     * Logic to be executed when the confirm button is clicked
     */
    protected override confirmImplentation(): void {
        this.taskSearchForm.controls['id'].setValue(null);
        this.taskToEdit = this.updateForm.onSubmit();
        this.taskService.updateTask(this.taskToEdit.id, this.taskToEdit);
        this.taskToEdit = undefined;
    }
}