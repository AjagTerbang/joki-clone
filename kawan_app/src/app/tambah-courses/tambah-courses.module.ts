import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahCoursesPageRoutingModule } from './tambah-courses-routing.module';

import { TambahCoursesPage } from './tambah-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahCoursesPageRoutingModule
  ],
  declarations: [TambahCoursesPage]
})
export class TambahCoursesPageModule {}
