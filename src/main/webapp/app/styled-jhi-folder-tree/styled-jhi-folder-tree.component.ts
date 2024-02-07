import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFolder } from 'app/entities/folder/folder.model';

import { FolderTreeComponent } from 'app/folder-tree/folder-tree.component';

@Component({
  standalone: true,
  selector: 'jhi-styled-jhi-folder-tree',
  templateUrl: './styled-jhi-folder-tree.component.html',
  styleUrls: ['./styled-jhi-folder-tree.component.scss'],
  imports: [FolderTreeComponent],
})
export class StyledJhiFolderTreeComponent {
  @Output() folderSelected = new EventEmitter<any>();
  @Input() folders: IFolder[] | null | undefined = null;

  onFolderSelected(data: any): void {
    this.folderSelected.emit(data);
  }
}
