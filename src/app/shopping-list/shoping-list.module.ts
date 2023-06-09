import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule.forChild([
      {
        path: "shopping-list",
        // canActivate: [AuthGuard],
        component: ShoppingListComponent,
      },
    ]),
    FormsModule,
    SharedModule,
  ],
  exports: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
