import { IPermission, NewPermission } from './permission.model';

export const sampleWithRequiredData: IPermission = {
  id: 12555,
};

export const sampleWithPartialData: IPermission = {
  id: 6816,
  readPermission: true,
  writePermission: false,
};

export const sampleWithFullData: IPermission = {
  id: 106,
  readPermission: true,
  writePermission: true,
  deletePermission: true,
};

export const sampleWithNewData: NewPermission = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
