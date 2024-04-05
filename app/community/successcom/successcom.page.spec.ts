import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccesscomPage } from './successcom.page';

describe('SuccesscomPage', () => {
  let component: SuccesscomPage;
  let fixture: ComponentFixture<SuccesscomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccesscomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
