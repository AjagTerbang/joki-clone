import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleTambahPageRoutingModule } from './module-tambah-routing.module';

import { ModuleTambahPage } from './module-tambah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleTambahPageRoutingModule
  ],
  declarations: [ModuleTambahPage]
})
export class ModuleTambahPageModule {}
