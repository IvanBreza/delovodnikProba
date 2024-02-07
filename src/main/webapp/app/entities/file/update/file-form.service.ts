import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFile, NewFile } from '../file.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFile for edit and NewFileFormGroupInput for create.
 */
type FileFormGroupInput = IFile | PartialWithRequiredKeyOf<NewFile>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFile | NewFile> = Omit<T, 'uploadDate'> & {
  uploadDate?: string | null;
};

type FileFormRawValue = FormValueOf<IFile>;

type NewFileFormRawValue = FormValueOf<NewFile>;

type FileFormDefaults = Pick<NewFile, 'id' | 'uploadDate'>;

type FileFormGroupContent = {
  id: FormControl<FileFormRawValue['id'] | NewFile['id']>;
  fileName: FormControl<FileFormRawValue['fileName']>;
  filePath: FormControl<FileFormRawValue['filePath']>;
  uploadDate: FormControl<FileFormRawValue['uploadDate']>;
  fileType: FormControl<FileFormRawValue['fileType']>;
  size: FormControl<FileFormRawValue['size']>;
  folder: FormControl<FileFormRawValue['folder']>;
};

export type FileFormGroup = FormGroup<FileFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FileFormService {
  createFileFormGroup(file: FileFormGroupInput = { id: null }): FileFormGroup {
    const fileRawValue = this.convertFileToFileRawValue({
      ...this.getFormDefaults(),
      ...file,
    });
    return new FormGroup<FileFormGroupContent>({
      id: new FormControl(
        { value: fileRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fileName: new FormControl(fileRawValue.fileName, {
        validators: [Validators.required],
      }),
      filePath: new FormControl(fileRawValue.filePath, {
        validators: [Validators.required],
      }),
      uploadDate: new FormControl(fileRawValue.uploadDate, {
        validators: [Validators.required],
      }),
      fileType: new FormControl(fileRawValue.fileType),
      size: new FormControl(fileRawValue.size),
      folder: new FormControl(fileRawValue.folder),
    });
  }

  getFile(form: FileFormGroup): IFile | NewFile {
    return this.convertFileRawValueToFile(form.getRawValue() as FileFormRawValue | NewFileFormRawValue);
  }

  resetForm(form: FileFormGroup, file: FileFormGroupInput): void {
    const fileRawValue = this.convertFileToFileRawValue({ ...this.getFormDefaults(), ...file });
    form.reset(
      {
        ...fileRawValue,
        id: { value: fileRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FileFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      uploadDate: currentTime,
    };
  }

  private convertFileRawValueToFile(rawFile: FileFormRawValue | NewFileFormRawValue): IFile | NewFile {
    return {
      ...rawFile,
      uploadDate: dayjs(rawFile.uploadDate, DATE_TIME_FORMAT),
    };
  }

  private convertFileToFileRawValue(
    file: IFile | (Partial<NewFile> & FileFormDefaults),
  ): FileFormRawValue | PartialWithRequiredKeyOf<NewFileFormRawValue> {
    return {
      ...file,
      uploadDate: file.uploadDate ? file.uploadDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
