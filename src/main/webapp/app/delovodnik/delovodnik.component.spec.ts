import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelovodnikComponent } from './delovodnik.component';

describe('DelovodnikComponent', () => {
  let component: DelovodnikComponent;
  let fixture: ComponentFixture<DelovodnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelovodnikComponent],
    });
    fixture = TestBed.createComponent(DelovodnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
