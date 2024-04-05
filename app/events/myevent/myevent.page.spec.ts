import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyeventPage } from './myevent.page';

describe('MyeventPage', () => {
  let component: MyeventPage;
  let fixture: ComponentFixture<MyeventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
