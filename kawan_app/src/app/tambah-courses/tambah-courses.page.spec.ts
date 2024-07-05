import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TambahCoursesPage } from './tambah-courses.page';

describe('TambahCoursesPage', () => {
  let component: TambahCoursesPage;
  let fixture: ComponentFixture<TambahCoursesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
