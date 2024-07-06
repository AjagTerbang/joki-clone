import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { environmentProd } from 'src/environments/environment.prod';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: any = {
    name: '',
    email: '',
    password: '',
  };
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async register() {
    const response = await fetch(`${environmentProd.apiUrl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.form),
    });
    const data = await response.json();
    console.log(data);
    if (data.status_code != 200) {
      this.alertController
        .create({
          header: 'Error',
          message: data.email[0],
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
    if (data.statusCode == 200) {
      let toast = await this.toastController.create({
        message: 'Hello World!',
        duration: 1500,
        position: 'bottom',
      });

      await toast.present();

      this.form = {
        name: '',
        email: '',
        password: '',
      };
    }
  }
}
