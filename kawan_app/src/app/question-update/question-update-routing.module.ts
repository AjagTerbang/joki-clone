import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionUpdatePage } from './question-update.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionUpdatePageRoutingModule {}
