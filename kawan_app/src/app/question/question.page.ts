import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environmentProd } from 'src/environments/environment.prod';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  idModule: any;
  id: any;
  role: string = '';
  questions: any = [];
  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.idModule = this.route.snapshot.paramMap.get('idModule');
    this.id = this.route.snapshot.paramMap.get('id');
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
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const { role } = JSON.parse(decodedPayload);
    this.role = role;

    this.getQuestion();
  }

  tambahQuestion(id: any) {
    window.location.href = `/question-tambah/${id}`;
  }

  async getQuestion() {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${environmentProd.apiUrl}/api/modules/${this.id}/questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        mode: 'cors',
      }
    );

    const data = await response.json();
    console.log(data);

    this.questions = data.data;
  }

  editQuestion() {}

  deleteQuestion(id: any) {
    const token = localStorage.getItem('token');
    fetch(`${environmentProd.apiUrl}/api/questions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.getQuestion();
      });
  }

  cardClick() {}

  back() {
    window.location.href = `/module/${this.idModule}`;
  }
}
