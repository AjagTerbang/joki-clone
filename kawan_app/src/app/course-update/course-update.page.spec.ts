import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseUpdatePage } from './course-update.page';

describe('CourseUpdatePage', () => {
  let component: CourseUpdatePage;
  let fixture: ComponentFixture<CourseUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
