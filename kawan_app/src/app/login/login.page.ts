import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: any = {
    email: '',
    password: '',
  };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async login() {
    if (!this.form.email || !this.form.password) {
      return this.alertController
        .create({
          header: 'Error',
          message: 'Email and password are required',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.form),
    });
    // parse the response
    const data = await response.json();
    console.log(data);

    if (!data.status_code) {
      return this.alertController
        .create({
          header: 'Error',
          message: data.email,
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }

    if (data.status_code != 200) {
      return this.alertController
        .create({
          header: 'Error',
          message: data.message,
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
    return this.alertController
      .create({
        header: 'Success',
        message: 'Login successful',
        buttons: ['OK'],
      })
      .then((alert) => {
        // after click OK, redirect to home page
        alert.present();
        alert.onDidDismiss().then(() => {
          // get the token from the response
          localStorage.setItem('token', data.token);
          window.location.href = '/courses';
        });
      });
  }
}
