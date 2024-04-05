import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComingPage } from './coming.page';

describe('ComingPage', () => {
  let component: ComingPage;
  let fixture: ComponentFixture<ComingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
