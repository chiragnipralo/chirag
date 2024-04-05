import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReinvitePage } from './reinvite.page';

describe('ReinvitePage', () => {
  let component: ReinvitePage;
  let fixture: ComponentFixture<ReinvitePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReinvitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
