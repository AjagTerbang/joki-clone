import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionTambahPageRoutingModule } from './question-tambah-routing.module';

import { QuestionTambahPage } from './question-tambah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionTambahPageRoutingModule
  ],
  declarations: [QuestionTambahPage]
})
export class QuestionTambahPageModule {}
