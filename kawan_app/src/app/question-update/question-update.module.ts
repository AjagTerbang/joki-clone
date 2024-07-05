import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionUpdatePageRoutingModule } from './question-update-routing.module';

import { QuestionUpdatePage } from './question-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionUpdatePageRoutingModule
  ],
  declarations: [QuestionUpdatePage]
})
export class QuestionUpdatePageModule {}
