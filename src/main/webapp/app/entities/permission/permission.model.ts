export interface IPermission {
  id: number;
  readPermission?: boolean | null;
  writePermission?: boolean | null;
  deletePermission?: boolean | null;
}

export type NewPermission = Omit<IPermission, 'id'> & { id: null };
