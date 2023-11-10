import { Observable } from 'rxjs';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { StatusEnum } from 'src/app/model/status-enum';


@Component({
    selector: 'app-add-update-form',
    templateUrl: './add-update-form.component.html',
    styleUrls: ['../dialogs.scss']
})
export class AddUpdateFormComponent {

    public object = Object;
    public statusEnum = StatusEnum;
    public form: FormGroup = new FormGroup({});
    @Output() formChange = new EventEmitter<void>();

    public task: Task = new Task(0, '', '', new Date(), StatusEnum.PENDING);

    constructor(
        private fb: FormBuilder
    ) {
        this.initForm();
    }


    /**
     * Initializes the form with empty values
     * and subscribes to value changes
     */
    private initForm(): void {
        this.form = this.fb.group({
            title: ['', Validators.required, this.notOnlyWhitespaceValidator],
            description: ['', Validators.required, this.notOnlyWhitespaceValidator],
            dueDate: ['', Validators.required],
            status: ['', Validators.required]
        });
        this.form.valueChanges.subscribe(() => {
            this.formChange.emit();
        });

        // Little hack to trigger formChange on init after form is initialized
        setTimeout(() => {
            this.formChange.emit();
        }, 0);
    }

    /**
     * Returns the task object with the form values
     * @returns Task
     */
    public onSubmit(): Task {
        this.task.title = this.form.controls['title'].value;
        this.task.description = this.form.controls['description'].value;
        this.task.dueDate = this.form.controls['dueDate'].value;
        this.task.status = this.form.controls['status'].value;
        return this.task;
    }

    /**
     * Sets the form values with the task values
     * @param task 
     */
    public setFormValues(task: Task): void {
        this.task = task;
        this.form.controls['title'].setValue(task.title);
        this.form.controls['description'].setValue(task.description);
        this.form.controls['dueDate'].setValue(task.dueDate);
        this.form.controls['status'].setValue(task.status);
    }

    /**
     * Validator to check if the value is not only whitespace
     * @param control 
     * @returns Observable<ValidationErrors | null>
     */
    private notOnlyWhitespaceValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        const value: string = control.value;
        if (value && value.trim().length === 0) {
            return new Observable<ValidationErrors | null>(observer => {
                observer.next({ required: true });
                observer.complete();
            });
        } else {
            return new Observable<ValidationErrors | null>(observer => {
                observer.next(null);
                observer.complete();
            });
        }
    }
}