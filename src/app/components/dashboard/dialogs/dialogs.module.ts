import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { AddUpdateFormComponent } from "./add-update-form/add-update-form.component";
import { UpdateDialogComponent } from "./update-dialog/update-dialog.component";


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AddDialogComponent,
        UpdateDialogComponent,
        DeleteDialogComponent,
        AddUpdateFormComponent
    ],
    exports: [
        AddDialogComponent,
        UpdateDialogComponent,
        DeleteDialogComponent
    ]
})
export class DialogsModule { }