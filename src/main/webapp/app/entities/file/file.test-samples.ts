import dayjs from 'dayjs/esm';

import { IFile, NewFile } from './file.model';

export const sampleWithRequiredData: IFile = {
  id: 14045,
  fileName: 'gathering',
  filePath: 'yet for whoever',
  uploadDate: dayjs('2023-12-20T04:36'),
};

export const sampleWithPartialData: IFile = {
  id: 27651,
  fileName: 'uniform judgementally',
  filePath: 'that',
  uploadDate: dayjs('2023-12-20T06:20'),
  size: 6903,
};

export const sampleWithFullData: IFile = {
  id: 28558,
  fileName: 'excitement',
  filePath: 'um ick',
  uploadDate: dayjs('2023-12-20T00:55'),
  fileType: 'so pipe',
  size: 12815,
};

export const sampleWithNewData: NewFile = {
  fileName: 'unexpectedly',
  filePath: 'executor old',
  uploadDate: dayjs('2023-12-19T19:14'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
