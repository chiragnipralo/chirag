import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaydemoPage } from './paydemo.page';

describe('PaydemoPage', () => {
  let component: PaydemoPage;
  let fixture: ComponentFixture<PaydemoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaydemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
