import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageCommunityPage } from './manage-community.page';

describe('ManageCommunityPage', () => {
  let component: ManageCommunityPage;
  let fixture: ComponentFixture<ManageCommunityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
