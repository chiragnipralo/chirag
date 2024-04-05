import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExeplorecomPage } from './exeplorecom.page';

describe('ExeplorecomPage', () => {
  let component: ExeplorecomPage;
  let fixture: ComponentFixture<ExeplorecomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExeplorecomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
