import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-module',
  templateUrl: './module.page.html',
  styleUrls: ['./module.page.scss'],
})
export class ModulePage implements OnInit {
  id: any;
  role: string = '';
  modules: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {
    this.ngOnInit();
  }

  async ngOnInit() {
    //get token from local storage
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        window.location.href = '/courses';
      }
      const id = paramMap.get('id');
      this.id = id;
    });
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
    //get param id

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
    //get data from api
    const response = await fetch(
      `${environment.nopalEndPoint}/api/courses/${this.id}/modules`
    );
    const data = await response.json();
    console.log(data.data);
    this.modules = data.data;

    loading.dismiss();
  }

  deleteModule() {}
  tambahModule(id: number) {
    window.location.href = `/module-tambah/${id}`;
  }
  editModule() {}
  back() {
    window.location.href = '/courses';
  }
}
