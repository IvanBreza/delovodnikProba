import { IFile } from '../file/file.model';

export interface IFolder {
  id: number;
  relativePathId?: string | null;
  folderName?: string | null;
  folderPath?: string | null;
  description?: string | null;
  parentFolder?: Pick<IFolder, 'id'> | null;
  isExpanded?: boolean | null;
  subfolders?: IFolder[] | null;
  files?: IFile[] | null;
  isClicked?: boolean;
  isChecked?: boolean;
}

export type NewFolder = Omit<IFolder, 'id'> & { id: null };
