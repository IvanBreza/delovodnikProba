import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IPermission } from '../permission.model';
import { PermissionService } from '../service/permission.service';

@Component({
  standalone: true,
  templateUrl: './permission-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class PermissionDeleteDialogComponent {
  permission?: IPermission;

  constructor(
    protected permissionService: PermissionService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.permissionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
