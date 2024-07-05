import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionTambahPage } from './question-tambah.page';

describe('QuestionTambahPage', () => {
  let component: QuestionTambahPage;
  let fixture: ComponentFixture<QuestionTambahPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTambahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
