import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionUpdatePage } from './question-update.page';

describe('QuestionUpdatePage', () => {
  let component: QuestionUpdatePage;
  let fixture: ComponentFixture<QuestionUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
