import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaidGuestListPage } from './paid-guest-list.page';

describe('PaidGuestListPage', () => {
  let component: PaidGuestListPage;
  let fixture: ComponentFixture<PaidGuestListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaidGuestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
