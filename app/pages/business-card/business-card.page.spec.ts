import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessCardPage } from './business-card.page';

describe('BusinessCardPage', () => {
  let component: BusinessCardPage;
  let fixture: ComponentFixture<BusinessCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusinessCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
