import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-tambah',
  templateUrl: './module-tambah.page.html',
  styleUrls: ['./module-tambah.page.scss'],
})
export class ModuleTambahPage implements OnInit {
  id: any;
  isi: any = {
    name: '',
    content: '',
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        window.location.href = '/courses';
      }
      const id = paramMap.get('id');
      this.id = id;
    });
  }

  tambahModule() {}
  batal(id: number) {
    window.location.href = `/module/${id}`;
  }
}
