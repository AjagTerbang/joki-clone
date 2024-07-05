import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleUpdatePage } from './module-update.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleUpdatePageRoutingModule {}
