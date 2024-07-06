import { HttpClient } from '@angular/common/http';
import { Course } from '../courses/course.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  apiUrl = `${environmentProd.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }
}
