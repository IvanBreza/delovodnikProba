import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FolderDetailComponent } from './folder-detail.component';

describe('Folder Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: FolderDetailComponent,
              resolve: { folder: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FolderDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load folder on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FolderDetailComponent);

      // THEN
      expect(instance.folder).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
