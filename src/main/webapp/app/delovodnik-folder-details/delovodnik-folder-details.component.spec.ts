import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelovodnikFolderDetailsComponent } from './delovodnik-folder-details.component';

describe('DelovodnikFolderDetailsComponent', () => {
  let component: DelovodnikFolderDetailsComponent;
  let fixture: ComponentFixture<DelovodnikFolderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelovodnikFolderDetailsComponent],
    });
    fixture = TestBed.createComponent(DelovodnikFolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
