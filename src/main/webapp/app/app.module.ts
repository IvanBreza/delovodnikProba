import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { BrowserModule, Title } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import dayjs from 'dayjs/esm';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { TranslationModule } from 'app/shared/language/translation.module';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { AppRoutingModule } from './app-routing.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import MainComponent from './layouts/main/main.component';
import MainModule from './layouts/main/main.module';
import { AppPageTitleStrategy } from './app-page-title-strategy';
import { DelovodnikComponent } from './delovodnik/delovodnik.component';
import { FolderComponent } from './entities/folder/list/folder.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FolderTreeComponent } from './folder-tree/folder-tree.component';
import { DelovodnikFolderDetailsComponent } from './delovodnik-folder-details/delovodnik-folder-details.component';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [
    BrowserModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    MainModule,
    TranslationModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    ModalModule.forRoot(),
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
    { provide: TitleStrategy, useClass: AppPageTitleStrategy },
    BsModalRef,
    BsModalService,
  ],
  bootstrap: [MainComponent],
  declarations: [],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
