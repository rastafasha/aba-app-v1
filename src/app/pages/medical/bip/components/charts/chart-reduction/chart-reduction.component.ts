import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions, GoalV2, PatientV2 } from 'src/app/core/models';

import { GraphicReductionService } from '../../../service/graphic-reduction.service';
interface data {
  value: string;
}

@Component({
  selector: 'app-chart-reduction',
  templateUrl: './chart-reduction.component.html',
  styleUrls: ['./chart-reduction.component.scss'],
})
export class ChartReductionComponent {
  selectedValue = '03';
  @ViewChild('chart') chart!: ChartComponent;
  @Input() maladaptive: GoalV2;
  @Input() patient: PatientV2;
  existgrfic: any[];
  loading = false;
  chartOptionsOne: Partial<ChartOptions>;

  private maladaptives: any = null;

  private sessions_dates = [];
  private number_of_occurrence = [];
  private query_income_year = [];
  private graphData = [];
  private notesRbts = [];

  constructor(private graphicReductionService: GraphicReductionService) {}

  ngOnInit(): void {
    this.getProfileBip();
  }
  //traemos la info del paciente o cliente
  getProfileBip() {
    setTimeout(() => {
      this.getGraphicMaladaptive();
    }, 50);
  }

  // obtenemos todos las notas filtrandose con el nombre seleccionado traido como input.. this.maladaptive_behavior
  // junto con el patient_id por si existe otro paciente con el mismo maladaptive

  getGraphicMaladaptive() {
    this.graphicReductionService
      .listMaladaptivesGraphics(
        this.maladaptive.name,
        this.patient.patient_identifier
      )
      .subscribe((resp) => {
        this.existgrfic = resp.maladaptivesCol;

        //funcion de pablo alcorta
        //se limpia y se extrae los datos de la coleccion json
        const data = resp;
        const maladaptivesParsed = [];
        data?.maladaptivesCol.forEach((maladaptive) => {
          const maladaptiveParsed = parsearMaladaptivesCol(
            maladaptive,
            this.maladaptive.name
          );
          maladaptivesParsed.push(maladaptiveParsed);
        });

        // console.log(maladaptivesParsed);
        data.maladaptivesCol = maladaptivesParsed;
        // console.log(data)

        //lo convierto a variable
        this.graphData = maladaptivesParsed;
        // console.log(this.graphData);

        function parsearMaladaptivesCol(maladaptive, maladaptiveSelected) {
          const maladaptiveWithoutSlash = maladaptive.replace(/\\"/g, '"');
          const maladaptiveParsed = JSON.parse(
            maladaptiveWithoutSlash.slice(1, -1)
          );

          return maladaptiveParsed.find(
            (item) => item?.maladaptive_behavior === maladaptiveSelected
          );
        }

        // fin funcion de pablo alcorta
        // recorremos el resultado del array maladaptivesParsed para extraer los solicitados por el request
        const number_of_occurrences: number[] = [];
        const maladaptive_behavior: string[] = [];
        const array = this.graphData;
        for (this.maladaptives of array) {
          number_of_occurrences.push(
            Number(this.maladaptives.number_of_occurrences)
          );
          maladaptive_behavior.push(
            String(this.maladaptives.maladaptive_behavior)
          );
        }
        // console.log(number_of_occurrences);
        // console.log(maladaptive_behavior);

        // traemos todas las fechas
        this.sessions_dates = resp.sessions_dates.session_date;
        this.number_of_occurrence = number_of_occurrences;
        this.notesRbts = resp.noteRbt;

        //fechas junto con la baseline del maladaptive
        this.sessions_dates = [];
        // recorremos la respuesta para traer todos
        resp.sessions_dates.forEach((element) => {
          this.sessions_dates.push(element.session_date);
        });
        this.sessions_dates.unshift(this.maladaptive.baseline_date); // con unshift lo unimos y colocamos de primero
        this.number_of_occurrence.unshift(this.maladaptive.baseline_level); // con unshift lo unimos y colocamos de primero
        // console.log(this.sessions_dates);
        // console.log(this.number_of_occurrence);
        // console.log(resp)

        if (
          this.sessions_dates?.length > 1 &&
          this.sessions_dates?.length === this.number_of_occurrence?.length
        ) {
          let acumulador = 0;
          const acumuladorDeSemanas = [];
          let cantidadDeDias = 0;
          let labelSemanal = '';
          const arrayLabelSemanal = [];
          resp.sessions_dates.forEach((sessions_date, index) => {
            if (index > 0) {
              if (cantidadDeDias === 0) {
                // labelSemanal = sessions_date.substr(0,10);
                labelSemanal = sessions_date.session_date
                  .toString()
                  .substr(0, 10);
              }
              acumulador = acumulador + this.number_of_occurrence[index];
              cantidadDeDias += 1;

              if (
                cantidadDeDias === 7 ||
                index + 1 === resp.sessions_dates.length
              ) {
                // labelSemanal += ' - '+sessions_date.substr(0,10);
                labelSemanal +=
                  ' - ' + sessions_date.session_date.toString().substr(0, 10);
                acumuladorDeSemanas.push(acumulador);
                arrayLabelSemanal.push(labelSemanal);
                cantidadDeDias = 0;
                acumulador = 0;
                labelSemanal = '';
              }
            }
          });
          this.sessions_dates = [
            this.maladaptive.baseline_date.toString().substr(0, 10),
          ].concat(arrayLabelSemanal);
          this.number_of_occurrence = [this.number_of_occurrence[0]].concat(
            acumuladorDeSemanas
          );
        }

        // data filtrada para el grafico
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
              name: 'Number of Occurrences',
              color: '#00D3C7',
              //  data: [32, 30, 56, 56, 56, 42, 30, 42, 30],
              data: this.number_of_occurrence,
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

  // // Sum the 'number_of_occurrences' values in the array
  // const sumOfOccurrences = arrayOfObjects.reduce((accumulator, currentValue) => {
  //   return isNumeric(currentValue.number_of_occurrences)? accumulator + currentValue.number_of_occurrences : accumulator;
  // }, 0);

  extractData() {
    // recorrer el array de billing_general para extraer la data
    const hours_group: string[] = [];
    const units_group: string[] = [];
    const extractedData = this.maladaptives;

    const array = this.maladaptives;
    for (this.maladaptives of array) {
      hours_group.push(this.maladaptives.total_hours);
      units_group.push(this.maladaptives.total_units);
      //   if (this.replacement && this.replacement.goal) { // da error
      // }
    }
    // console.log(hours_group);
    // console.log(units_group);
    // // obtenemos el total de las horas en un rango de 7 dias  atras
    // var suma=0;
    // for (var i = hours_group.length - 1; i >= Math.max(0, hours_group.length - 7) ; i--) {
    //     suma += parseInt(hours_group[i], 10) || 0;
    // }
    // // this.week_total_hours = suma / Math.min(7, hours_group.length);// saca el promedio
    // this.week_total_hours = suma ; // saca la suma
    // console.log("promedio semanal "+ this.week_total_hours );

    // // obtenemos el total de las unidades en un rango de 7 dias  atras
    // var sumaunit=0;
    // for (var i = units_group.length - 1; i >= Math.max(0, units_group.length - 7) ; i--) {
    //     sumaunit += parseInt(units_group[i], 10) || 0;
    // }
    // // this.week_total_units = sumaunit / Math.min(7, units_group.length);// saca el promedio
    // this.week_total_units = sumaunit ; // saca la suma
    // console.log("promedio semanal "+ this.week_total_units );
  }

  getGraphicPatientMonth() {
    const data = {
      month: this.selectedValue,
    };
    this.graphicReductionService.graphicPatientMonth(data).subscribe((resp) => {
      console.log(resp);

      //start
      this.query_income_year = resp.query_income_year;
      const data_income = [];
      this.query_income_year.forEach((element: any) => {
        data_income.push(element.income);
      });

      this.chartOptionsOne = {
        chart: {
          height: 200,
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        series: [
          {
            name: 'Income',
            color: '#2E37A4',
            data: data_income,
          },
        ],
        xaxis: {
          categories: resp.months_name,
        },
      };

      //end
    });
  }
  // selectedMonth(){
  //   // console.log(this.selectedValue);
  //   this.getGraphicPatientMonth();
  // }
}
