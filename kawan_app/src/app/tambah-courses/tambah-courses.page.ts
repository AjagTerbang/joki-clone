import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tambah-courses',
  templateUrl: './tambah-courses.page.html',
  styleUrls: ['./tambah-courses.page.scss'],
})
export class TambahCoursesPage implements OnInit {
  img: any;
  isi: any = {
    name: '',
    description: '',
    imageUrl: '',
    // startDate now
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  };

  constructor(private alert: AlertController) {}

  ngOnInit() {}

  loadImage(image: any) {
    const file = image.target.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.img = file;
      this.isi.imageUrl = e.target.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  async tambahCourse() {
    // http://127.0.0.1:8000/api/courses
    const form = new FormData();
    form.append('name', this.isi.name);
    form.append('description', this.isi.description);
    form.append('imageUrl', this.img);
    form.append('startDate', this.isi.startDate);
    form.append('endDate', this.isi.endDate);
    const response = await fetch('http://127.0.0.1:8000/api/courses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: form,
    });

    const data = await response.json();
    console.log(data);

    if (data.status_code == 200) {
      this.alert
        .create({
          header: 'Success',
          message: 'Course added successfully',
          buttons: ['OK'],
        })
        .then((res) => {
          res.present();
          return res.onDidDismiss();
        })
        .then(() => {
          window.location.href = '/courses';
        });
    }
  }

  batal() {
    window.location.href = '/courses';
  }
}
