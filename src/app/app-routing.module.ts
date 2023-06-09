import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

// Create a new route guard that combines multiple guards
// const canActivateChildRoutes: Route["canActivateChild"] = [AuthGuard];

// Define your routes
const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full",
  },
  {
    path: "auth",
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  // `{useHash: true}` là một đối tượng tùy chọn được sử dụng để cấu hình Location Strategy của Angular Router.
  // Khi `useHash` được đặt là `true`, Angular Router sẽ sử dụng HashLocationStrategy để xử lý các URL của ứng dụng.
  exports: [RouterModule],
})
export class AppRoutingModule {}
