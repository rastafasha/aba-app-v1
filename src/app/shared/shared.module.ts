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
import { AlertComponent } from './components/alert/alert.component';
import { ListAndFormComponent } from './components/list-and-form/list-and-form.component';
import { ListComponent } from './components/list/list.component';
import { PaServiceCalculatorComponent } from './components/pa-service-calculator/pa-service-calculator.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { TableModule } from './components/table/table.module';
import { UnitsDisplayComponent } from './components/units-display/units-display.component';
import { DataService } from './data/data.service';
import { MaterialModule } from './extras/material.module';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { NoInfoComponent } from './no-info/no-info.component';
import { PipesModule } from './pipes/pipes.module';
import { PageService } from './services/pages.service';
import { ListColumnsPipe } from './components/pipes/list-columns.pipe';
import { PdfButtonComponent } from './components/pdf-button/pdf-button.component';
import { InputDirective } from './directives/input.directive';

const components = [
  NoInfoComponent,
  SkeletonLoaderComponent,
  ActionButtonComponent,
  ActionModalComponent,
  UnitsDisplayComponent,
  PaServiceCalculatorComponent,
  AlertComponent,
  ListComponent,
  ListAndFormComponent,
  ListColumnsPipe,
  PdfButtonComponent,
  InputDirective,
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
    PipesModule,
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
    PipesModule,
    TableModule,
  ],
  providers: [DataService, PageService],
})
export class SharedModule {}
