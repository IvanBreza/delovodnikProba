import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFolder } from '../folder.model';
import { FolderService } from '../service/folder.service';
import { FolderFormService, FolderFormGroup } from './folder-form.service';

@Component({
  standalone: true,
  selector: 'jhi-folder-update',
  templateUrl: './folder-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FolderUpdateComponent implements OnInit {
  isSaving = false;
  folder: IFolder | null = null;

  foldersSharedCollection: IFolder[] = [];

  editForm: FolderFormGroup = this.folderFormService.createFolderFormGroup();

  constructor(
    protected folderService: FolderService,
    protected folderFormService: FolderFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareFolder = (o1: IFolder | null, o2: IFolder | null): boolean => this.folderService.compareFolder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ folder }) => {
      this.folder = folder;
      if (folder) {
        this.updateForm(folder);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const folder = this.folderFormService.getFolder(this.editForm);
    if (folder.id !== null) {
      this.subscribeToSaveResponse(this.folderService.update(folder));
    } else {
      this.subscribeToSaveResponse(this.folderService.create(folder));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFolder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(folder: IFolder): void {
    this.folder = folder;
    this.folderFormService.resetForm(this.editForm, folder);

    this.foldersSharedCollection = this.folderService.addFolderToCollectionIfMissing<IFolder>(
      this.foldersSharedCollection,
      folder.parentFolder,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.folderService
      .query()
      .pipe(map((res: HttpResponse<IFolder[]>) => res.body ?? []))
      .pipe(map((folders: IFolder[]) => this.folderService.addFolderToCollectionIfMissing<IFolder>(folders, this.folder?.parentFolder)))
      .subscribe((folders: IFolder[]) => (this.foldersSharedCollection = folders));
  }
}
