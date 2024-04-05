import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremiumCommunityDetailsPage } from './premium-community-details.page';

describe('PremiumCommunityDetailsPage', () => {
  let component: PremiumCommunityDetailsPage;
  let fixture: ComponentFixture<PremiumCommunityDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PremiumCommunityDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
