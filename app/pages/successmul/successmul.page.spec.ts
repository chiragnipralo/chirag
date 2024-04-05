import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessmulPage } from './successmul.page';

describe('SuccessmulPage', () => {
  let component: SuccessmulPage;
  let fixture: ComponentFixture<SuccessmulPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessmulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
