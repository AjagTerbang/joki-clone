import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuleUpdatePage } from './module-update.page';

describe('ModuleUpdatePage', () => {
  let component: ModuleUpdatePage;
  let fixture: ComponentFixture<ModuleUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
