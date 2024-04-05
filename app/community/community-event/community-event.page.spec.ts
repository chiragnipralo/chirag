import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityEventPage } from './community-event.page';

describe('CommunityEventPage', () => {
  let component: CommunityEventPage;
  let fixture: ComponentFixture<CommunityEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommunityEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
