import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahCoursesPage } from './tambah-courses.page';

const routes: Routes = [
  {
    path: '',
    component: TambahCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahCoursesPageRoutingModule {}
