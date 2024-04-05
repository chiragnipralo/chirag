import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventPaymentPage } from './event-payment.page';

describe('EventPaymentPage', () => {
  let component: EventPaymentPage;
  let fixture: ComponentFixture<EventPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
