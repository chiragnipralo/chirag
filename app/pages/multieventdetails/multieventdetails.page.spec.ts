import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultieventdetailsPage } from './multieventdetails.page';

describe('MultieventdetailsPage', () => {
  let component: MultieventdetailsPage;
  let fixture: ComponentFixture<MultieventdetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MultieventdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
