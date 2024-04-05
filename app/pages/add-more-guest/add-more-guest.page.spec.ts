import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMoreGuestPage } from './add-more-guest.page';

describe('AddMoreGuestPage', () => {
  let component: AddMoreGuestPage;
  let fixture: ComponentFixture<AddMoreGuestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddMoreGuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
