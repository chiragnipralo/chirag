import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SamitiDetailsPage } from './samiti-details.page';

describe('SamitiDetailsPage', () => {
  let component: SamitiDetailsPage;
  let fixture: ComponentFixture<SamitiDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SamitiDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
