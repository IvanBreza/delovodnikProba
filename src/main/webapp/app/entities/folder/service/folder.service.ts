import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom, from, map } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFolder, NewFolder } from '../folder.model';
import { IFile } from 'app/entities/file/file.model';

export type PartialUpdateFolder = Partial<IFolder> & Pick<IFolder, 'id'>;

export type EntityResponseType = HttpResponse<IFolder>;
export type EntityArrayResponseType = HttpResponse<IFolder[]>;

@Injectable({ providedIn: 'root' })
export class FolderService {
  folderCreated: EventEmitter<IFolder> = new EventEmitter<IFolder>();

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/folders');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(folder: NewFolder): Observable<EntityResponseType> {
    return this.http.post<IFolder>(this.resourceUrl, folder, { observe: 'response' });
  }

  downloadFile(filePath: string): Observable<HttpResponse<Blob>> {
    const options = {
      observe: 'response' as const,
      responseType: 'blob' as const,
      params: { filePath },
    };
    return this.http.get(`${this.resourceUrl}/download`, options);
  }

  downloadFiles(filePaths: string[]): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers, responseType: 'blob' as 'json' };
    console.log('this is filenames array--------------', filePaths);

    return this.http.post<Blob>(`${this.resourceUrl}/download`, filePaths, options);
  }

  /* getPdfContent(pdfPath: string): Observable<ArrayBuffer> {

   // const pdfUrl = `${this.resourceUrl}/getPdf/${encodeURIComponent(pdfPath)}`;
    const pdfUrl = `${this.resourceUrl}/getPdf/123`;
    console.log("SERVICE-------------------getPdfContent-----pdfPath", pdfUrl)
    return this.http.get(pdfUrl, { responseType: 'blob' });

  } */

  getPdfContent(filePath: string): Observable<HttpResponse<Blob>> {
    console.log('SERVICE+++++getPdfContent------------------this is filePath ++++ filePath-------------- ', filePath);
    const options = {
      observe: 'response' as const,
      responseType: 'blob' as const,
      /*  params: { filePath }, */
    };
    return this.http.post(`${this.resourceUrl}/pdf`, filePath, options);
  }
  /*  async getPdfContent(pdfUrl: string): Promise<ArrayBuffer> {
    const blob: Blob = await firstValueFrom(this.http.get(pdfUrl, { responseType: 'blob' }));

    return new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = new Uint8Array((event.target as any).result);
        resolve(arrayBuffer);
      };
      reader.readAsArrayBuffer(blob);
    });
  }
 */

  uploadFile(file: File, folderPath: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const params = new HttpParams().set('folderPath', folderPath);

    const headers = new HttpHeaders(); // Add any headers if needed

    return this.http.post(`${this.resourceUrl}/upload`, formData, {
      params,
      headers,
    });
  }

  /* create(folder: NewFolder): Observable<EntityResponseType> {
    return this.http.post<IFolder>(this.resourceUrl, folder, { observe: 'response' });
  } */

  update(folder: IFolder): Observable<EntityResponseType> {
    return this.http.put<IFolder>(`${this.resourceUrl}/${this.getFolderIdentifier(folder)}`, folder, { observe: 'response' });
  }

  partialUpdate(folder: PartialUpdateFolder): Observable<EntityResponseType> {
    return this.http.patch<IFolder>(`${this.resourceUrl}/${this.getFolderIdentifier(folder)}`, folder, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFolder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFolder[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFolderIdentifier(folder: Pick<IFolder, 'id'>): number {
    return folder.id;
  }

  compareFolder(o1: Pick<IFolder, 'id'> | null, o2: Pick<IFolder, 'id'> | null): boolean {
    return o1 && o2 ? this.getFolderIdentifier(o1) === this.getFolderIdentifier(o2) : o1 === o2;
  }

  addFolderToCollectionIfMissing<Type extends Pick<IFolder, 'id'>>(
    folderCollection: Type[],
    ...foldersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const folders: Type[] = foldersToCheck.filter(isPresent);
    if (folders.length > 0) {
      const folderCollectionIdentifiers = folderCollection.map(folderItem => this.getFolderIdentifier(folderItem)!);
      const foldersToAdd = folders.filter(folderItem => {
        const folderIdentifier = this.getFolderIdentifier(folderItem);
        if (folderCollectionIdentifiers.includes(folderIdentifier)) {
          return false;
        }
        folderCollectionIdentifiers.push(folderIdentifier);
        return true;
      });
      return [...foldersToAdd, ...folderCollection];
    }
    return folderCollection;
  }
}
