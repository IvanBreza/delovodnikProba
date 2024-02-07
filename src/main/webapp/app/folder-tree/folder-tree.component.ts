import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFolder } from 'app/entities/folder/folder.model';

import { NgModule } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  standalone: true,
  selector: 'jhi-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss'],
  imports: [CommonModule, TreeModule, TreeTableModule, DialogModule, FormsModule],
})
export class FolderTreeComponent {
  @Input() folders: IFolder[] | null = null;
  @Output() folderSelected = new EventEmitter<IFolder>();

  newFolderName: string = '';
  bsModalRef: BsModalRef | undefined;
  modalService: BsModalService | undefined;

  lastClickedFolder: IFolder | null = null;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  toggleFolderTree(folder: IFolder) {
    folder.isExpanded = !folder.isExpanded;
    console.log('FolderTreeComponent ****** folder.isExpanded ', folder);
  }

  onFolderClick(folder: IFolder): void {
    // Reset the isClicked property for all folders
    console.log('FolderTreeComponent  EMITING ---------------- onFolderClick ---------- folder', folder);
    /* this.folders?.forEach(f => f.isClicked = false);

     // Set the isClicked property only for the clicked folder
     folder.isClicked = true; */
    this.lastClickedFolder = folder;
    if (folder.subfolders != null) {
      this.folderSelected.emit(folder);
    }
  }

  onSubfolderClick(subfolder: IFolder): void {
    console.log('FolderTreeComponent  EMITING ---------------- onSubfolderClickThree ---------- subfolder', subfolder);
    this.lastClickedFolder = subfolder;
    this.folderSelected.emit(subfolder);
  }

  getFolderIcon(folder: IFolder): string {
    // Use a different icon when the folder is expanded or collapsed
    return folder.isExpanded ? '../../content/images/icons8-folder-open-16.png' : '../../content/images/icons8-folder-16.png';
  }

  /* openCreateFolderModal(template: any): void {
    console.log('Creating folder:');
    this.bsModalRef = this.modalService?.show(template);
  } */
}
