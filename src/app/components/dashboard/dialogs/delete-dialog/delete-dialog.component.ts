import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { AbstractDialogComponent } from '../abstract-dialog.component';


@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['../dialogs.scss']
})
/**
 * Component for the delete dialog
 */
export class DeleteDialogComponent extends AbstractDialogComponent {

    constructor(fb: FormBuilder, taskService: TaskService
     ) {
        super(fb, taskService);
        this.form = this.fb.group({
            id: [null, [Validators.required], [this.idExistsValidator()]],
        });
    }

    /**
     * Logic to be executed when the confirm button is clicked
     */
    protected override confirmImplentation(): void {
        const id = this.form.controls['id'].value;
        this.taskService.deleteTask(id);
    }

    /**
     * Validator to check if the id exists in the task list
     * @returns Observable<ValidationErrors | null>
     */
    private idExistsValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const id = control.value;

            const task = this.taskService.getTaskById(id);
            if (task) {
                return new Observable<ValidationErrors | null>(observer => {
                    observer.next(null);
                    observer.complete();
                });
            } else {
                return new Observable<ValidationErrors | null>(observer => {
                    observer.next({ idNotFound: true });
                    observer.complete();
                });
            }
        };
    }
}