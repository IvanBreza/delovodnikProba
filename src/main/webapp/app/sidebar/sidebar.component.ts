import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FolderComponent } from 'app/entities/folder/list/folder.component';
import { IFolder } from 'app/entities/folder/list/folder.component';

@Component({
  standalone: true,
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule],
})
export class SidebarComponent {
  @Input() folders: IFolder[] = [];

  toggleFolder(folder: IFolder): void {
    console.log();
    folder.isExpanded = !folder.isExpanded;
  }

  selectFile(folder: IFolder, fileName: string): void {
    // Handle file selection logic
    console.log(`---------------------------------Selected file: ${fileName} in folder: ${folder.folderName}`);
  }
}
