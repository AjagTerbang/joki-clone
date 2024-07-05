import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-module-update',
  templateUrl: './module-update.page.html',
  styleUrls: ['./module-update.page.scss'],
})
export class ModuleUpdatePage implements OnInit {
  id: any;
  isi: any = {
    name: '',
    content: '',
  };
  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        window.location.href = '/courses';
      }
      const id = paramMap.get('id');
      this.id = id;
    });
    this.ngOnInit();
  }

  async ngOnInit() {
    this.getData();
  }

  async updateModule() {
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
      `${environment.nopalEndPoint}/api/modules/${this.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: this.isi.name,
          content: this.isi.content,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status_code == 200) {
          this.alertCtrl
            .create({
              header: 'Success',
              message: 'Module berhasil diupdate',
              buttons: ['OK'],
            })
            .then((alertEl) => {
              alertEl.present();
              alertEl.onDidDismiss().then(() => {
                this.navCtrl.back();
              });
            });
        } else {
          this.alertCtrl
            .create({
              header: 'Error',
              message: 'Module gagal diupdate',
              buttons: ['OK'],
            })
            .then((alertEl) => {
              alertEl.present();
            });
        }
      });
  }

  async getData() {
    const response = await fetch(
      `${environment.nopalEndPoint}/api/modules/${this.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const responseData = await response.json();

    console.log(responseData);
    this.isi.name = responseData.data.title;
    this.isi.content = responseData.data.content;
  }

  batal() {}
}
