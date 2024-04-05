import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiEventPage } from './multi-event.page';

describe('MultiEventPage', () => {
  let component: MultiEventPage;
  let fixture: ComponentFixture<MultiEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MultiEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
