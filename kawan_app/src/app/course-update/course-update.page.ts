import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.page.html',
  styleUrls: ['./course-update.page.scss'],
})
export class CourseUpdatePage implements OnInit {
  id: any;
  isi: any;
  img: any;
  form = {
    name: '',
    description: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.ngOnInit();
    });
  }

  async getData(id: any) {
    const response = await fetch(`http://127.0.0.1:8000/api/findcourse/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();
    console.log(data);
    this.isi = data.data;
    console.log(this.isi);
  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData(this.id);
  }

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

  batal() {
    // redirect ke halaman course
    window.location.href = '/courses';
  }

  async editCourse() {
    const formData = new FormData();
    formData.append('name', this.isi.name);
    formData.append('description', this.isi.description);
    formData.append('imageUrl', this.img);
    formData.append('startDate', this.isi.startDate);
    formData.append('endDate', this.isi.endDate);
    console.log(formData.get('name'));
    //fetch into
    //127.0.0.1:8000/api/updatecourse/:id
    const response = await fetch(
      `http://127.0.0.1:8000/api/updatecourse/${this.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status_code == 200) {
      this.alertController
        .create({
          header: 'Success',
          message: 'Data berhasil diupdate',
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
}
