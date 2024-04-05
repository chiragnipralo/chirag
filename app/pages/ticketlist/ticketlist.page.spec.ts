import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketlistPage } from './ticketlist.page';

describe('TicketlistPage', () => {
  let component: TicketlistPage;
  let fixture: ComponentFixture<TicketlistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TicketlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
