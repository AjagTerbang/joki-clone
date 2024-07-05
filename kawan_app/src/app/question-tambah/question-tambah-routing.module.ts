import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionTambahPage } from './question-tambah.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionTambahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionTambahPageRoutingModule {}
