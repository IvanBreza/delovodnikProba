import { IFolder, NewFolder } from './folder.model';

export const sampleWithRequiredData: IFolder = {
  id: 20658,
  folderName: 'sheepishly steepen encode',
  folderPath: 'recoil whoever',
};

export const sampleWithPartialData: IFolder = {
  id: 21460,
  folderName: 'trophy yet',
  folderPath: 'faithfully',
};

export const sampleWithFullData: IFolder = {
  id: 6046,
  folderName: 'of',
  folderPath: 'pish although wing',
  description: 'pfft',
};

export const sampleWithNewData: NewFolder = {
  folderName: 'about around fiddle',
  folderPath: 'webpage obfuscate julienne',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
