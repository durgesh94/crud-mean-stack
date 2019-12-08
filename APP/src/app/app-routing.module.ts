import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ViewComponent } from "./view/view.component";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { PageNotFoundComponent } from "./_utilities/common/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "view", component: ViewComponent },
  { path: "add-edit/:id", component: AddEditComponent },
  { path: "404", component: PageNotFoundComponent },
  { path: "", redirectTo: "view", pathMatch: "full" },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const RoutingComponents = [
  ViewComponent,
  AddEditComponent,
  PageNotFoundComponent
];
