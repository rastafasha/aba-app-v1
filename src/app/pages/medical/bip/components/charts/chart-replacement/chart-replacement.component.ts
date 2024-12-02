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
import { PatientDashboard } from 'src/app/core/models';

import { ActivatedRoute } from '@angular/router';
import { BipService } from '../../../service/bip.service';
import { GraphicReductionService } from '../../../service/graphic-reduction.service';
import { AppUser } from 'src/app/core/models/users.model';
interface data {
  value: string;
}

export type ChartOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markers: ApexMarkers | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yaxis: ApexYAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: ApexTitleSubtitle | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip: ApexTooltip | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
@Component({
  selector: 'app-chart-replacement',
  templateUrl: './chart-replacement.component.html',
  styleUrls: ['./chart-replacement.component.scss'],
})
export class ChartReplacementComponent {
  selectedValue = '03';
  @ViewChild('chart') chart!: ChartComponent;

  @Input() goal: any;
  @Input() baseline_d: string;
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
  existgrfic: any =[];
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
      this.created_at = resp.bip.created_at;
    });
  }

  getProfileBip() {
    this.bipService.showBipProfile(this.patient_identifier).subscribe((resp) => {
      console.log(resp);
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
        console.log(resp);
        this.existgrfic = resp.replacementsCol;

        //funcion de pablo alcorta
        //se limpia y se extrae los datos de la coleccion json
        const data = resp;
        const replacementsParsed = [];
        data?.replacementsCol.forEach((goal) => {
          const replacementParsed = parsearGoalsCol(
            goal, 
            this.goal
          );
          replacementsParsed.push(replacementParsed);
        });

        console.log(replacementsParsed);
        data.replacementsCol = replacementsParsed;
        // console.log(data)

        //lo convierto a variable
        this.graphData = replacementsParsed;
        // console.log(this.graphData);

        function parsearGoalsCol(goal, goalSelected) {
          const replacementWithoutSlash = goal.replace(/\\"/g, '"');
          const replacementParsed = JSON.parse(
            replacementWithoutSlash.slice(1, -1)
          );
          // return JSON.parse(goalParsed);
          const index = replacementParsed.find(
            (item) => item.goal === goalSelected
          );
          return replacementParsed[index];
        }

        
        // fin funcion de pablo alcorta
        // recorremos el resultado del array goalsParsed para extraer los solicitados por el request
        const number_of_correct_response = [];
        const goal: string[] = [];
        const array = this.graphData;
        for (this.goals of array) {
          number_of_correct_response.push(
            Number(this.goals.number_of_correct_response)
          );
          goal.push(String(this.goals.goal));
        }
        const number_of_trials: number[] = [];
        array.forEach((element) => {
          number_of_trials.push(element.total_trials);
        });

        // this.stoName = resp.nameSto;
        // this.stoName = resp.sustitutionStatusStoValues[0];
        this.stoStatus = resp.datosFiltrados[0];
        this.stoName = resp.nameSto;

        // if(resp.filtered_goals !== null){
        //   console.log(this.stoStatus);

        // }else{
        //   this.stoStatus = resp.sustitutionStatusStoValues[0];
        //   console.log(this.stoStatus);

        // }

        console.log(this.stoName);

        this.replacementsExtractedGoal = this.replacements;

        // traemos todas las fechas
        this.sessions_dates = resp.sessions_dates.session_date;
        this.number_of_correct_response = number_of_correct_response;
        this.notesRbts = resp.noteRbt;

        //fecha inicial cuando se hizo el bip
        this.sessions_dates = resp.sessions_dates.map(
          (item) => item.session_date
        );
        this.sessions_dates.unshift(this.created_at); // con unshift lo unimos y colocamos de primero

        this.number_of_correct_response.unshift(0);
        number_of_trials.unshift(0);
        //end

        if (
          this.sessions_dates?.length > 1 &&
          this.sessions_dates?.length ===
            this.number_of_correct_response?.length
        ) {
          let acumulador = 0;
          let sumadorDeTrials = 0;
          const acumuladorDeSemanas = [];
          const acumuladorDeTrials = [];
          let cantidadDeDias = 0;
          let labelSemanal = '';
          const arrayLabelSemanal = [];
          this.sessions_dates.forEach((date, index) => {
            if (index > 0) {
              if (cantidadDeDias === 0) {
                labelSemanal = date.substr(0, 10);
              }
              acumulador = acumulador + +this.number_of_correct_response[index];
              cantidadDeDias += 1;
              sumadorDeTrials += +number_of_trials[index];
              // console.log(sumadorDeTrials, index)

              if (
                cantidadDeDias === 7 ||
                index + 1 === this.sessions_dates.length
              ) {
                labelSemanal += ' - ' + date.substr(0, 10);
                acumuladorDeSemanas.push(acumulador);
                arrayLabelSemanal.push(labelSemanal);
                cantidadDeDias = 0;
                acumulador = 0;
                labelSemanal = '';
                acumuladorDeTrials.push(sumadorDeTrials);
                sumadorDeTrials = 0;
              }
            }
          });
          const porcentajes: number[] = [];
          if (acumuladorDeSemanas.length === acumuladorDeTrials.length) {
            acumuladorDeSemanas.forEach((ac, index) => {
              porcentajes.push(
                +(ac / acumuladorDeTrials[index]).toFixed(2) * 100
              );
            });
          }

          this.sessions_dates = [this.sessions_dates[0].substr(0, 10)].concat(
            arrayLabelSemanal
          );
          this.number_of_correct_response = [
            this.number_of_correct_response[0],
          ].concat(porcentajes);
        }

        //Chart
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
              name: '% Week',
              color: '#00D3C7',
              data: this.number_of_correct_response,
            },
          ],
          xaxis: {
            //
            categories: this.sessions_dates,
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          },
        };
      });
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
