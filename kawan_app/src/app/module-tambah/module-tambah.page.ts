import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-module-tambah',
  templateUrl: './module-tambah.page.html',
  styleUrls: ['./module-tambah.page.scss'],
})
export class ModuleTambahPage implements OnInit {
  id: any;
  isi: any = {
    name: '',
    content: '',
  };
  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        window.location.href = '/courses';
      }
      const id = paramMap.get('id');
      this.id = id;
    });
  }

  async tambahModule() {
    if (this.isi.name == '' || this.isi.content == '') {
      return this.alertCtrl
        .create({
          header: 'Error',
          message: 'Form tidak boleh kosong',
          buttons: ['OK'],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
    const response = await fetch(
      `${environment.nopalEndPoint}/api/courses/${this.id}/modules`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: this.isi.name,
          content: this.isi.content,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData.status_code == 200) {
      this.alertCtrl
        .create({
          header: 'Success',
          message: 'Module berhasil ditambahkan',
          buttons: ['OK'],
        })
        .then((alertEl) => {
          alertEl.present();
          alertEl.onDidDismiss().then(() => {
            window.location.href = `/module/${this.id}`;
          });
        });
    } else {
      this.alertCtrl
        .create({
          header: 'Error',
          message: responseData.message,
          buttons: ['OK'],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
  }
  batal(id: number) {
    window.location.href = `/module/${id}`;
  }
}
