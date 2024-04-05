import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSamitiPage } from './add-samiti.page';

describe('AddSamitiPage', () => {
  let component: AddSamitiPage;
  let fixture: ComponentFixture<AddSamitiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddSamitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
