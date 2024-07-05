import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.page.html',
  styleUrls: ['./create-admin.page.scss'],
})
export class CreateAdminPage implements OnInit {
  form: any = {
    name: '',
    email: '',
    password: '',
  };
  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async register() {
    console.log(this.form);
    const response = await fetch('http://127.0.0.1:8000/api/register-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(this.form),
    });

    const data = await response.json();
    console.log(data);

    if (data.status_code == 200) {
      this.alertController
        .create({
          header: 'Success',
          message: 'Admin created successfully',
          buttons: ['OK'],
        })
        .then((alert) => {
          alert.present();
          alert.onDidDismiss().then(() => {
            window.location.href = '/courses';
          });
        });
    } else {
      this.alertController
        .create({
          header: 'Error',
          message: 'Failed to create admin',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
  }

  back() {
    window.location.href = '/courses';
  }
}
