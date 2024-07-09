import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitedMemberPage } from './invited-member.page';

describe('InvitedMemberPage', () => {
  let component: InvitedMemberPage;
  let fixture: ComponentFixture<InvitedMemberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvitedMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
