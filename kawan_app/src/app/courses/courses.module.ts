import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursesPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [CoursesPage],
})
export class CoursesPageModule {}
