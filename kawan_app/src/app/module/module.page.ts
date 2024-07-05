import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-module',
  templateUrl: './module.page.html',
  styleUrls: ['./module.page.scss'],
})
export class ModulePage implements OnInit {
  role: string = '';
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    //get token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      return this.alertController
        .create({
          header: 'Error',
          message: 'You need to login first',
          buttons: ['OK'],
        })

        .then((alert) => {
          alert.present();
          alert.onDidDismiss().then(() => {
            window.location.href = '/login';
          });
        });
    }

    //decode token
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);

    //parse the payload
    const { exp, role } = JSON.parse(decodedPayload);
    console.log(exp, role);
    this.role = role;
    console.log(role);

    const loading = await this.loadingCtrl.create({ message: 'Loading...' });
    loading.present();

    loading.dismiss();
  }

  deleteModule() {}
  tambahModule() {}
  editModule() {}
  back() {}
}
