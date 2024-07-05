import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseUpdatePage } from './course-update.page';

const routes: Routes = [
  {
    path: '',
    component: CourseUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseUpdatePageRoutingModule {}
