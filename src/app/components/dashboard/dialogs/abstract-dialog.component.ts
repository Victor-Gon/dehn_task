import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';


@Component({
    selector: 'app-abstract-dialog',
    template: ''
})
/**
 * Abstract component for dialogs. All dialogs should extend this component.
 */
export abstract class AbstractDialogComponent {

    @Input() public displayDialog: boolean = false;
    @Output() public onClose: EventEmitter<void> = new EventEmitter<void>();
    public form: FormGroup = this.fb.group({});

    constructor(
        protected fb: FormBuilder,
        protected taskService: TaskService
    ) {}

    /**
     * Fired when the cancel button is clicked, closes the dialog
     */
    public onCancelClick(): void {
        this.onClose.emit();
    }

    /**
     * Fired when the confirm button is clicked,
     * closes the dialog and calls the confirmImplementation logic
     */
    public onConfirmClick(): void {
        if (this.form.invalid) {
            return;
        }
        this.confirmImplentation();
        this.onClose.emit();
    }

    /**
     * Abstract method to be implemented by the extending component,
     * contains the logic to be executed when the confirm button is clicked
     */
    protected abstract confirmImplentation(): void;

    /**
     * Closes the dialog when the escape key is pressed
     * @param event 
     */
    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.onCancelClick();
    }
}