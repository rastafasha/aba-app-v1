import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CountUpModule } from 'ngx-countup';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { ActionModalComponent } from './components/action-modal/action-modal.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { TableModule } from './components/table/table.module';
import { DataService } from './data/data.service';
import { MaterialModule } from './material.module';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { NoInfoComponent } from './no-info/no-info.component';
import { PipesModule } from './pipes/pipes.module';
import { PageService } from './services/pages.service';
import { UnitsDisplayComponent } from './components/units-display/units-display.component';
import { PdfButtonComponent } from './components/pdf-button/pdf-button.component';
import { PaServiceCalculatorComponent } from './components/pa-service-calculator/pa-service-calculator.component';
import { AlertComponent } from './components/alert/alert.component';

const components = [
  NoInfoComponent,
  SkeletonLoaderComponent,
  ActionButtonComponent,
  ActionModalComponent,
  UnitsDisplayComponent,
  PdfButtonComponent,
  PaServiceCalculatorComponent,
  AlertComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      radius: 40,
      space: -10,
      outerStrokeWidth: 10,
      innerStrokeWidth: 10,
      animationDuration: 1000,
      clockwise: false,
      startFromZero: false,
      lazy: false,
      outerStrokeLinecap: 'square',
      showSubtitle: false,
      showTitle: false,
      showUnits: false,
      showBackground: false,
    }),
    SlickCarouselModule,
    MaterialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    RouterModule,
  ],
  exports: [
    ...components,
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule,
    SlickCarouselModule,
    MaterialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    MaterialModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    RouterModule,
    SkeletonLoaderComponent,
    ActionButtonComponent,
    ActionModalComponent,
    PipesModule,
    TableModule,
    PdfButtonComponent,
    PaServiceCalculatorComponent,
    AlertComponent
  ],
  providers: [DataService, PageService],
})
export class SharedModule {}
