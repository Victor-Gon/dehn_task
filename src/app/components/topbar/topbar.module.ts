import { NgModule } from "@angular/core";
import { TopbarComponent } from "./topbar.component";

@NgModule({
    declarations: [
        TopbarComponent
    ],
    exports: [TopbarComponent]
})
export class TopbarModule { }