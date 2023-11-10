import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DialogsModule } from "./dialogs/dialogs.module";

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
    imports: [
        CommonModule,
        DialogsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }