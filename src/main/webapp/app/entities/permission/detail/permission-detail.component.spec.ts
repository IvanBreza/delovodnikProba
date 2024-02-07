import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PermissionDetailComponent } from './permission-detail.component';

describe('Permission Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: PermissionDetailComponent,
              resolve: { permission: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(PermissionDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load permission on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', PermissionDetailComponent);

      // THEN
      expect(instance.permission).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
