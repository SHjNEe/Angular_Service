import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinner } from "./loading-spiner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinner,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinner,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
