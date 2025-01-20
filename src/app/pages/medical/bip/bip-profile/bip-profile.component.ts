import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, of, switchMap, tap } from 'rxjs';
import { BipV2, PatientV2 } from 'src/app/core/models';
import { BipsV2Service, PatientsV2Service } from 'src/app/core/services';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-bip-profile',
  templateUrl: './bip-profile.component.html',
  styleUrls: ['./bip-profile.component.scss'],
})
export class BipProfileComponent implements OnInit {
  routes = AppRoutes;
  patient: PatientV2;
  bip: BipV2 = null;
  patient_identifier: string;

  constructor(
    private bipService: BipsV2Service,
    private patientService: PatientsV2Service,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService
  ) {}
  ngOnInit(): void {
    this.pageService.onInitPage();
    // this.doctorService.getUserRoles();
    this.activatedRoute.data
      .pipe(
        tap((data) => (this.patient = data['patient'])),
        switchMap(() => this.getPatient()),
        switchMap(() => this.getBip())
      )
      .subscribe();
    this.activatedRoute.params
      .pipe(
        tap((data) => (this.patient_identifier = data['patient_id'])),
        switchMap(() => this.getPatient()),
        switchMap(() => this.getBip())
      )
      .subscribe();
  }

  getPatient() {
    if (this.patient) return of(this.patient);
    if (!this.patient_identifier) throw new Error('No patient identifier');
    return this.patientService
      .list({ patient_identifier: this.patient_identifier })
      .pipe(
        switchMap((resp) => this.patientService.get(resp.data[0].id)),
        map((resp) => {
          this.patient = resp.data;
          return this.patient;
        })
      );
  }

  getBip() {
    if (!this.patient) return of(null);
    return this.bipService.list({ patient_id: this.patient.id }).pipe(
      switchMap((resp) => this.bipService.get(resp.data[0].id)),
      map((resp) => {
        this.bip = resp.data;
        return this.bip;
      })
    );
  }
}

//convertToPdf(): void {
//   const data = this.contentToConvert.nativeElement;
//   html2canvas(data).then(canvas => {
//     // Few necessary setting options
//     const imgWidth = 208;
//     const pageHeight = 295;
//     const imgHeight = canvas.height * imgWidth / canvas.width;
//     const heightLeft = imgHeight;

//     const margins = {
//       top: 40,
//       bottom: 60,
//       left: 40,
//       width: 522
//     };

//     // Create a new PDF document
//     const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
//     // const pdf = new jspdf.jsPDF('p', 'pt', 'letter');

//     // Add an image of the canvas to the PDF
//     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

//     // Save the PDF
//     pdf.save('bip_'+this.patient_selected.patient_id+".pdf");
//   });
// }
