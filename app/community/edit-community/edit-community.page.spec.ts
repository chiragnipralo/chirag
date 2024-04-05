import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCommunityPage } from './edit-community.page';

describe('EditCommunityPage', () => {
  let component: EditCommunityPage;
  let fixture: ComponentFixture<EditCommunityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
