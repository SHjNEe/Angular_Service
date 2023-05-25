import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

// Create a new route guard that combines multiple guards
const canActivateChildRoutes: Route["canActivateChild"] = [AuthGuard];

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
  {
    path: "recipes",
    component: RecipesComponent,
    canActivateChild: canActivateChildRoutes, // Use the combined guard for child routes
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
  {
    path: "shopping-list",
    canActivate: [AuthGuard],
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
