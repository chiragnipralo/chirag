import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddObituryPage } from './add-obitury.page';

describe('AddObituryPage', () => {
  let component: AddObituryPage;
  let fixture: ComponentFixture<AddObituryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddObituryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
