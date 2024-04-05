import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPaidEventPage } from './edit-paid-event.page';

describe('EditPaidEventPage', () => {
  let component: EditPaidEventPage;
  let fixture: ComponentFixture<EditPaidEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPaidEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
