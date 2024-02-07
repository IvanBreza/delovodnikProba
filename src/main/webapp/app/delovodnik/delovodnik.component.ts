import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FolderComponent } from '../entities/folder/list/folder.component';
import { SidebarComponent } from 'app/sidebar/sidebar.component';
import { IFolder } from 'app/entities/folder/list/folder.component';
import { FolderTreeComponent } from 'app/folder-tree/folder-tree.component';
import { DelovodnikFolderDetailsComponent } from 'app/delovodnik-folder-details/delovodnik-folder-details.component';
import { CommonModule } from '@angular/common';

import { FolderService } from 'app/entities/folder/service/folder.service';
import { NewFolder } from 'app/entities/folder/folder.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs';

import { ChangeDetectorRef } from '@angular/core';
import { IFile } from 'app/entities/file/file.model';

import { StyledJhiFolderTreeComponent } from 'app/styled-jhi-folder-tree/styled-jhi-folder-tree.component';

@Component({
  standalone: true,
  selector: 'jhi-delovodnik',
  templateUrl: './delovodnik.component.html',
  styleUrls: ['./delovodnik.component.scss'],
  imports: [FolderComponent, SidebarComponent, DelovodnikFolderDetailsComponent, CommonModule, FormsModule, StyledJhiFolderTreeComponent],
})
export class DelovodnikComponent {
  folders: IFolder[] | null | undefined = null;
  selectedFolder: IFolder | null = null;
  selectedFile: File | null = null;

  @Output() folderSelected = new EventEmitter<NewFolder>();
  @Output() folderCreated: EventEmitter<IFolder> = new EventEmitter<IFolder>();

  newFolderName: string = '';
  parentFolder: string = '';
  modalRef: NgbModalRef | undefined;
  isModalOpen: boolean = false;

  selectedNavItemIndex: number | null = null;

  constructor(
    private folderService: FolderService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
  ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.folderService.query().subscribe(data => {
      this.folders = data.body;
    });
  }

  onFolderSelected(folder: IFolder): void {
    console.log('DelovodnikComponent --------- onFolderSelected:', folder);
    this.selectedFolder = folder;
  }

  toggleFolder(folder: IFolder): void {
    folder.isExpanded = !folder.isExpanded;
    if (folder.isExpanded) {
      this.selectedFolder = { ...folder, subfolders: folder.subfolders };
    } else {
      // Collapse the folder
      this.selectedFolder = folder;
    }
  }

  selectNavItem(index: number): void {
    this.selectedNavItemIndex = index;
  }

  openCreateFolderModal(template: any): void {
    this.modalRef = this.modalService.open(template, { centered: true });
    if (this.selectedFolder) {
      console.log('createFolder ----BEGINING--- SELECTED_FOLDER_PATH ', this.selectedFolder.folderPath);
    }
  }

  openFileUploadModal(template: any): void {
    this.modalRef = this.modalService.open(template, { centered: true });
    if (this.selectedFolder) {
      console.log('openFileUploadModal ---- ', this.selectedFolder.folderPath);
    }
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  createFolder(): void {
    console.log('FOLDER NAME IS _________________:', this.newFolderName);
    if (this.selectedFolder) {
      const newFolder: NewFolder = {
        id: null,
        folderName: this.newFolderName,
        folderPath: this.selectedFolder.folderPath,
      };

      this.folderService
        .create(newFolder)
        .pipe(
          tap(response => {
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            const createdFolder: any = response.body || {};
            // Handle success, e.g., navigate to the list view or update component state
            console.log('Folder created successfully:', createdFolder);

            // Updates folders array
            if (this.selectedFolder != null) {
              this.selectedFolder.subfolders?.push(createdFolder);
            } else {
              this.folders?.push(createdFolder);
            }

            // Emit an event to notify other components if needed
            this.folderSelected.emit(createdFolder);
            this.cdr.detectChanges();
          }),
          catchError((error: any) => {
            // Handle error, provide user feedback
            console.error('Error creating folder:', error);
            throw error; // Rethrow the error to propagate it further if needed
          }),
        )
        .subscribe();
    }

    this.closeModal();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('DelovodnikComponent ---------********* onFileSelected:', this.selectedFile);
  }

  uploadFile(): void {
    console.log('DelovodnikComponent ---------********* uploadFile ---- selectedFile:', this.selectedFile);
    console.log('DelovodnikComponent ---------********* uploadFile ---- folderPath:', this.selectedFolder?.folderPath);
    if (this.selectedFile && this.selectedFolder) {
      const folderPath = this.selectedFolder.folderPath; // Assuming selectedFolder has a 'folderPath' property

      this.folderService.uploadFile(this.selectedFile, folderPath).subscribe(
        response => {
          console.log('File uploaded successfully:', response);

          /* if (typeof response === 'string') {
            console.log('File uploaded successfully:', response);
          } else {
            console.error('Unexpected response format:', response);
          } */
        },
        error => {
          console.error('Error uploading file:', error);
        },
      );
    }

    this.closeModal();
  }
}
