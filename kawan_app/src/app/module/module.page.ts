import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { environmentProd } from 'src/environments/environment.prod';
@Component({
  selector: 'app-module',
  templateUrl: './module.page.html',
  styleUrls: ['./module.page.scss'],
})
export class ModulePage implements OnInit {
  id: any;
  idModule: any;
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
      this.idModule = id;
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
      `${environmentProd.apiUrl}/api/courses/${this.id}/modules`
    );
    const data = await response.json();
    console.log(data.data);
    this.modules = data.data;

    loading.dismiss();
  }

  deleteModule(id: number) {
    this.alertController
      .create({
        header: 'Delete',
        message: 'Are you sure want to delete this module?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            handler: async () => {
              const response = await fetch(
                `${environmentProd.apiUrl}/api/modules/${id}`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                }
              );
              const responseData = await response.json();
              if (responseData.status_code == 200) {
                this.alertController
                  .create({
                    header: 'Success',
                    message: 'Module berhasil dihapus',
                    buttons: ['OK'],
                  })
                  .then((alertEl) => {
                    alertEl.present();
                    alertEl.onDidDismiss().then(() => {
                      window.location.reload();
                    });
                  });
              } else {
                this.alertController
                  .create({
                    header: 'Error',
                    message: responseData.message,
                    buttons: ['OK'],
                  })
                  .then((alertEl) => {
                    alertEl.present();
                  });
              }
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
  tambahModule(id: number) {
    window.location.href = `/module-tambah/${id}`;
  }
  editModule(id: number) {
    window.location.href = `/module-update/${id}`;
  }
  back() {
    window.location.href = '/courses';
  }
}
