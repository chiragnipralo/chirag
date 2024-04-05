import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSamitiMemberPage } from './add-samiti-member.page';

describe('AddSamitiMemberPage', () => {
  let component: AddSamitiMemberPage;
  let fixture: ComponentFixture<AddSamitiMemberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddSamitiMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
