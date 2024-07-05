import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleTambahPage } from './module-tambah.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleTambahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleTambahPageRoutingModule {}
