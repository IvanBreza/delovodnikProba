import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'file',
        data: { pageTitle: 'tenthApp.file.home.title' },
        loadChildren: () => import('./file/file.routes'),
      },
      {
        path: 'folder',
        data: { pageTitle: 'tenthApp.folder.home.title' },
        loadChildren: () => import('./folder/folder.routes'),
      },
      {
        path: 'permission',
        data: { pageTitle: 'tenthApp.permission.home.title' },
        loadChildren: () => import('./permission/permission.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
