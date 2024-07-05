import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuleTambahPage } from './module-tambah.page';

describe('ModuleTambahPage', () => {
  let component: ModuleTambahPage;
  let fixture: ComponentFixture<ModuleTambahPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTambahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
