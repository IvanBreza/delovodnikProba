import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { IFolder, NewFolder } from '../entities/folder/folder.model';
import { CommonModule } from '@angular/common';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { FolderService } from 'app/entities/folder/service/folder.service';

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, tap } from 'rxjs';

import { IFile } from 'app/entities/file/file.model';
import { HttpResponse } from '@angular/common/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  standalone: true,
  selector: 'jhi-delovodnik-folder-details',
  templateUrl: './delovodnik-folder-details.component.html',
  styleUrls: ['./delovodnik-folder-details.component.scss'],
  imports: [CommonModule, FormsModule, NgxExtendedPdfViewerModule],
})
export class DelovodnikFolderDetailsComponent {
  @Input() selectedFolder: IFolder | null = null;

  popupview!: ElementRef;

  selectedFile: IFile | null = null;

  newFolderName: string = '';
  parentFolder: string = '';
  modalRef: NgbModalRef | undefined;
  isModalOpen: boolean = false;
  isChecked: boolean = false;

  /* pdfContent: ArrayBuffer | null = null;
  pdfSrc: string | ArrayBuffer | Uint8Array = '';
 */

  pdfContentUrl$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  pdfContent$: Observable<HttpResponse<Blob>> | undefined;

  /* pdfContentUrl: string | undefined; */

  pdfContentUrlString: string | undefined;

  pdfContentUrl1$ = new BehaviorSubject<string | null>(null);

  private subscription: Subscription | undefined;

  constructor(
    private modalService: NgbModal,
    private folderService: FolderService,
    private cdr: ChangeDetectorRef,
  ) {}

  openCreateFolderModalDetails(template: any): void {
    this.modalRef = this.modalService.open(template, { centered: true });
    if (this.selectedFolder) {
      console.log('createFolder ----BEGINING--- SELECTED_FOLDER_PATH ', this.selectedFolder.folderPath);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  toggleSubFolder(folder: IFolder) {
    console.log('DelovodnikFolderDetailsComponent++++++++++++++++toggleSubFolder+++++++++++++++', folder);
    folder.isExpanded = !folder.isExpanded;

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (folder.isExpanded && (folder.subfolders?.length || folder.files?.length)) {
      // If expanded and has content, emit the folder to display
      this.selectedFolder = { ...folder, subfolders: folder.subfolders, files: folder.files };
    } else {
      // If collapsed or has no content, set selectedFolder to null
      this.selectedFolder = folder;
    }
  }

  onSubfolderClick(subfolder: IFolder): void {
    console.log('DelovodnikFolderDetailsComponent++++++++++++++++onSubfolderClick+++++++++++++++', subfolder.folderPath);
    subfolder.isExpanded = !subfolder.isExpanded;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (subfolder.subfolders != null) {
      this.selectedFolder = { ...subfolder, subfolders: subfolder.subfolders };
    } else {
      console.error('subfolder is null ', subfolder.subfolders);
    }
  }

  onFolderSelected(folder: IFolder | null): void {
    console.log('DelovodnikFolderDetailsComponent++++++++++++++++onFolderSelected', folder);
    this.selectedFolder = folder;
  }

  onFileSelected(file: IFile): void {
    console.log('FILE--------------DelovodnikFolderDetailsComponent++++++++++++++++onFileSelected', file);
    this.selectedFile = file;
  }

  /* ****************************************************DOWNLOAD ONE FILE******************************************************* */

  downloadFile(filePath: string): void {
    console.log('++++++++++++++++downloadFile+++++++++++++++ ', filePath);
    this.folderService.downloadFile(filePath).subscribe(response => {
      this.saveFile(response);
    });
  }
  /* **************************************************** /DOWNLOAD ONE FILE******************************************************* */

  /* ****************************************************DOWNLOAD ZIPPED FILES******************************************************* */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  downloadFiles() {
    let filePaths: any;
    if (this.selectedFolder?.files) {
      // Extract relative paths from files
      filePaths = this.selectedFolder.files.map((file: IFile) => file.filePath ?? '');
    }
    console.log('SELECTED FOLDER IN downloadFiles file paths============== ', filePaths);
    this.folderService
      .downloadFiles(filePaths)
      .pipe(
        tap((data: Blob) => {
          const blob = new Blob([data], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);

          // Create a link element and click it to trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'downloadedFiles.zip';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }),
        catchError((error: any) => {
          console.error('Error downloading files:', error);
          throw error; // Rethrow the error to propagate it further
        }),
      )
      .subscribe();
  }
  /* **************************************************** /DOWNLOAD ZIPPED FILES******************************************************* */

  private saveFile(response: any): void {
    const contentDisposition = response.headers.get('content-disposition');
    const fileName = contentDisposition.split(';')[1].trim().split('=')[1];

    const blob = new Blob([response.body], { type: response.body.type });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  /* loadPdfContent1(filePath: string): void {
  console.log("BEFORE========================++++++++++++++++++++============================================",  this.pdfContentUrlString)
  this.folderService.getPdfContent(filePath).subscribe(
    (response) => {
      const blob = new Blob([response.body!], { type: 'application/pdf' });

      this.pdfContentUrlString = window.URL.createObjectURL(blob);
      window.open(this.pdfContentUrlString);


      console.log("AFTER========================++++++++++++++++++++============================================",  this.pdfContentUrlString)
    },
    (error) => {
      console.error('Error loading PDF content:', error);
    }
  );
} */

  // eslint-disable-next-line @typescript-eslint/member-ordering
  loadPdfContent(filePath: string): void {
    this.folderService.getPdfContent(filePath).subscribe(
      response => {
        const blob = new Blob([response.body!], { type: 'application/pdf' });
        this.pdfContentUrlString = URL.createObjectURL(blob);
        console.log('THIS IS URL STRING.............................', this.pdfContentUrlString);
        this.pdfContentUrl1$.next(this.pdfContentUrlString);
        // this.openCreateFolderModalDetails(this.#previewModal);
        /*  window.open(this.pdfContentUrlString) */
      },
      error => {
        console.error('Error loading PDF content:', error);
      },
    );
  }
  /* loadPdfContent(filePath: string): void {
  this.folderService.getPdfContent(filePath).subscribe(
    (response) => {
      const blob = new Blob([response.body!], { type: 'application/pdf' });
      // Create the PDF content URL
      this.pdfContentUrl$.next(URL.createObjectURL(blob));
    },
    (error) => {
      console.error('Error loading PDF content:', error);
    }
  );
} */
  // eslint-disable-next-line @typescript-eslint/member-ordering

  // eslint-disable-next-line @typescript-eslint/member-ordering
  /* loadPdfContent(filePath: string): void {
    // this.invoiceno = invoiceno;
    this.folderService.getPdfContent(filePath).subscribe(res => {
      const blob: Blob = res.body as Blob;
      const url = window.URL.createObjectURL(blob);
      this.pdfurl = url;
      this.modalservice.open(this.popupview, { size: 'lg' });
      //window.open(url);
    });
  } */

  // eslint-disable-next-line @typescript-eslint/member-ordering
  /* getPdfContentUrl(response: HttpResponse<Blob>): string {
  console.log('++++++++++++++++++++++++++++++++++++getPdfContentUrl=========== response:', response);
  console.log('++++++++++++++++++++++++++++++++++++getPdfContentUrl=========== this.pdfContent$:', this.pdfContent$);
  const blob = new Blob([response.body!], { type: 'application/pdf' });
  console.log('++++++++++++++++++++++++++++++++++++getPdfContentUrl=========== blob:', blob);

  console.log('++++++++++++++++++++++++++++++++++++getPdfContentUrl===========  this.pdfContentUrlString:',  this.pdfContentUrlString);
  this.pdfContentUrlString = window.URL.createObjectURL(blob);
  return this.pdfContentUrlString;
} */

  // eslint-disable-next-line @typescript-eslint/member-ordering, @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
