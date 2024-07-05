import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleUpdatePageRoutingModule } from './module-update-routing.module';

import { ModuleUpdatePage } from './module-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleUpdatePageRoutingModule
  ],
  declarations: [ModuleUpdatePage]
})
export class ModuleUpdatePageModule {}
