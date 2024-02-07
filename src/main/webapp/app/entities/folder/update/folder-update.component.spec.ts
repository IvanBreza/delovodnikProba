import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FolderService } from '../service/folder.service';
import { IFolder } from '../folder.model';
import { FolderFormService } from './folder-form.service';

import { FolderUpdateComponent } from './folder-update.component';

describe('Folder Management Update Component', () => {
  let comp: FolderUpdateComponent;
  let fixture: ComponentFixture<FolderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let folderFormService: FolderFormService;
  let folderService: FolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), FolderUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FolderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FolderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    folderFormService = TestBed.inject(FolderFormService);
    folderService = TestBed.inject(FolderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Folder query and add missing value', () => {
      const folder: IFolder = { id: 456 };
      const parentFolder: IFolder = { id: 13872 };
      folder.parentFolder = parentFolder;

      const folderCollection: IFolder[] = [{ id: 7208 }];
      jest.spyOn(folderService, 'query').mockReturnValue(of(new HttpResponse({ body: folderCollection })));
      const additionalFolders = [parentFolder];
      const expectedCollection: IFolder[] = [...additionalFolders, ...folderCollection];
      jest.spyOn(folderService, 'addFolderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      expect(folderService.query).toHaveBeenCalled();
      expect(folderService.addFolderToCollectionIfMissing).toHaveBeenCalledWith(
        folderCollection,
        ...additionalFolders.map(expect.objectContaining),
      );
      expect(comp.foldersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const folder: IFolder = { id: 456 };
      const parentFolder: IFolder = { id: 8704 };
      folder.parentFolder = parentFolder;

      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      expect(comp.foldersSharedCollection).toContain(parentFolder);
      expect(comp.folder).toEqual(folder);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolder>>();
      const folder = { id: 123 };
      jest.spyOn(folderFormService, 'getFolder').mockReturnValue(folder);
      jest.spyOn(folderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: folder }));
      saveSubject.complete();

      // THEN
      expect(folderFormService.getFolder).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(folderService.update).toHaveBeenCalledWith(expect.objectContaining(folder));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolder>>();
      const folder = { id: 123 };
      jest.spyOn(folderFormService, 'getFolder').mockReturnValue({ id: null });
      jest.spyOn(folderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folder: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: folder }));
      saveSubject.complete();

      // THEN
      expect(folderFormService.getFolder).toHaveBeenCalled();
      expect(folderService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolder>>();
      const folder = { id: 123 };
      jest.spyOn(folderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(folderService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFolder', () => {
      it('Should forward to folderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(folderService, 'compareFolder');
        comp.compareFolder(entity, entity2);
        expect(folderService.compareFolder).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
