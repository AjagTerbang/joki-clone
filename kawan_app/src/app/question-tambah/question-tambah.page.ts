import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-tambah',
  templateUrl: './question-tambah.page.html',
  styleUrls: ['./question-tambah.page.scss'],
})
export class QuestionTambahPage implements OnInit {
  isi: any = {};
  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  buttonSubmit() {}
}
