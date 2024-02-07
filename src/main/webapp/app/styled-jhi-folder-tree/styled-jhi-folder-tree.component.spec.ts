import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledJhiFolderTreeComponent } from './styled-jhi-folder-tree.component';

describe('StyledJhiFolderTreeComponent', () => {
  let component: StyledJhiFolderTreeComponent;
  let fixture: ComponentFixture<StyledJhiFolderTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyledJhiFolderTreeComponent],
    });
    fixture = TestBed.createComponent(StyledJhiFolderTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
