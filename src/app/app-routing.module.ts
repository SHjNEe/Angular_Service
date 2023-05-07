import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full",
  },
  {
    path: "recipes",
    component: RecipesComponent,
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  // `{useHash: true}` là một đối tượng tùy chọn được sử dụng để cấu hình Location Strategy của Angular Router.
  // Khi `useHash` được đặt là `true`, Angular Router sẽ sử dụng HashLocationStrategy để xử lý các URL của ứng dụng.
  exports: [RouterModule],
})
export class AppRoutingModule {}
