import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { DataService } from 'src/app/shared/data/data.service';
import { ChartOptions, GoalV2, PatientDashboard } from 'src/app/core/models';

import { ActivatedRoute } from '@angular/router';
import { BipService } from '../../../service/bip.service';
import { GraphicReductionService } from '../../../service/graphic-reduction.service';
import { AppUser } from 'src/app/core/models/users.model';
interface data {
  value: string;
}

@Component({
  selector: 'app-chart-replacement',
  templateUrl: './chart-replacement.component.html',
  styleUrls: ['./chart-replacement.component.scss'],
})
export class ChartReplacementComponent {
  selectedValue = '03';
  @ViewChild('chart') chart!: ChartComponent;

  @Input() goal: string;
  @Input() baseline_d: string | Date;
  // @Output() cursoD: EventEmitter<any>  = new EventEmitter();// envia la data

  chartOptionsOne: Partial<ChartOptions>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carousel1 = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carousel2 = [];
  dataSource!: MatTableDataSource<PatientDashboard>;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '30px',
  };

  //datos reales
  bips = [];
  user: AppUser;
  maladaptiveSelected: any;
  maladaptive: any;
  patient_identifier: string;
  patient_ident: number;
  client_id: any;
  created_at?: Date;
  session_date = [];
  replacements = [];
  session_dates = [];
  number_of_occurrences: number;
  patient_selected = [];
  client_selected: any = null;
  sessionDates = [];
  replacement = [];

  maladaptiveBehaviors = [];
  replacementsExtractedGoal: any = [];
  number_of_correct_response: any;

  query_patient_by_genders = [];
  query_patients_specialities = [];
  query_patients_speciality_porcentaje = [];
  query_income_year = [];
  notesRbts = [];
  replacementeFiltrado = [];
  graphData = [];
  goals: any = null;
  sessions_dates: any[];
  number_of_occurrence: any[];
  // este es la porcentage_diario  de <h4> {{(replacemen.number_of_correct_response * 100 / replacemen.total_trials)}}%</h4>
  // debo guardarlo desde la nota rbt como sumatoria_porcentage_diario: este se suma la semana y se divide entre 7 o dias de la semana
  porcentage_diario = null;
  sumatoria_porcentage_diario: any[];
  promedio_porcentual_semanal: any[];
  stoName: any[];
  stoStatus: any;
  existgrfic: any = [];
  loading: boolean;

  //datos reales

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private graphicReductionService: GraphicReductionService,
    private bipService: BipService
  ) {
    this.carousel1 = this.data.carousel1;
    this.carousel2 = this.data.carousel2;
  }

  ngOnInit(): void {
    this.goal;
    this.baseline_d;

    this.activatedRoute.params.subscribe((resp) => {
      this.patient_identifier = resp['patient_id']; // la respuesta se comienza a relacionar  en este momento con un cliente especifico

      this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado
      this.getBip(); // se pide el perfil del paciente por el bip relacionado
      // setTimeout(() => {
      // }, 3000);
    });
  }

  getBip() {
    this.bipService.getBipByUser(this.patient_identifier).subscribe((resp) => {
      this.created_at = new Date(resp.bip.created_at);
    });
  }

  getProfileBip() {
    this.bipService
      .showBipProfile(this.patient_identifier)
      .subscribe((resp) => {
        this.client_selected = resp; // asignamos el objeto a nuestra variable
        this.patient_identifier = resp.patient.patient_identifier;
        this.patient_ident = resp.patient.id;
        //traemos la info del usuario
        if (this.client_selected.type !== null) {
          // si hay o no informacion del paciente
          if (this.client_selected.eligibility === 'yes') {
            // si el status es positivo para proceder
            this.patient_identifier = this.client_selected.patient_identifier;
          }
        }
        setTimeout(() => {
          this.getGoalsReductions();
        }, 50);
      });
  }

  // obtenemos todos las notas filtrandose con el nombre seleccionado traido como input.. this.goal
  // junto con el patient_id por si existe otro paciente con el mismo maladaptive

  getGoalsReductions() {
    this.graphicReductionService
      .listReductionGraphics(this.goal, this.patient_identifier)
      .subscribe((resp) => {
        this.existgrfic = resp.replacementsCol; //Corroborar si existe grafico

        const data = resp;
        const replacementsParsed = [];
        data?.replacementsCol.forEach((goal) => {
          replacementsParsed.push(JSON.parse(JSON.parse(goal))[0]);
        });

        data.replacementsCol = replacementsParsed;
        this.graphData = replacementsParsed;
        const number_of_correct_response = [];
        const array = this.graphData;
        replacementsParsed.forEach((item) => {
          number_of_correct_response.push(item.number_of_correct_response);
        });

        const number_of_trials: number[] = [];
        array.forEach((element) => {
          number_of_trials.push(element.total_trials);
        });

        this.stoStatus = resp.datosFiltrados[0];
        this.stoName = resp.nameSto;

        this.replacementsExtractedGoal = this.replacements;

        // traemos todas las fechas
        this.sessions_dates = resp.sessions_dates.session_date;
        this.number_of_correct_response = number_of_correct_response;

        //fecha inicial cuando se hizo el bip
        this.sessions_dates = resp.sessions_dates.map(
          (item) => item.session_date
        );
        this.sessions_dates.unshift(this.created_at);
        this.sessions_dates = this.sessions_dates.map((date) => {
          const dateAux = new Date(date);
          const mes = String(dateAux.getUTCMonth() + 1).padStart(2, '0');
          const dia = String(dateAux.getUTCDate()).padStart(2, '0');
          const anio = dateAux.getUTCFullYear();
          return `${mes}-${dia}-${anio}`;
        });
        this.setChart();
      });
  }

  public setChart(): void {
    this.chartOptionsOne = {
      chart: {
        height: 370,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        // curve: 'smooth',
      },
      series: [
        {
          type: 'scatter',
          data: [0],
        },
        {
          name: '% Week',
          color: '#00D3C7',
          data: [null, ...this.number_of_correct_response],
        },
      ],
      xaxis: {
        categories: this.sessions_dates,
      },
    };
  }
  selecedList: data[] = [
    { value: '01' },
    { value: '02' },
    { value: '03' },
    { value: '04' },
    { value: '05' },
    { value: '06' },
    { value: '07' },
    { value: '08' },
    { value: '09' },
    { value: '10' },
    { value: '11' },
    { value: '12' },
  ];
}
