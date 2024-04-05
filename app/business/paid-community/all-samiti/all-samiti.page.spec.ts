import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllSamitiPage } from './all-samiti.page';

describe('AllSamitiPage', () => {
  let component: AllSamitiPage;
  let fixture: ComponentFixture<AllSamitiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllSamitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
