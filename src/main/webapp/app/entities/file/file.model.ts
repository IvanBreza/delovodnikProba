import dayjs from 'dayjs/esm';
import { IFolder } from 'app/entities/folder/folder.model';

export interface IFile {
  id: number;
  fileName?: string | null;
  filePath?: string | null;
  uploadDate?: dayjs.Dayjs | null;
  fileType?: string | null;
  size?: number | null;
  folder?: Pick<IFolder, 'id'> | null;
}

export type NewFile = Omit<IFile, 'id'> & { id: null };
