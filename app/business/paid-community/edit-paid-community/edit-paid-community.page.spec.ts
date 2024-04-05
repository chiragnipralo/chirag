import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPaidCommunityPage } from './edit-paid-community.page';

describe('EditPaidCommunityPage', () => {
  let component: EditPaidCommunityPage;
  let fixture: ComponentFixture<EditPaidCommunityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPaidCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
