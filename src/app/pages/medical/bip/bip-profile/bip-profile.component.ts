import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private pageService: PageService,
    private bipService: BipsV2Service,
    private patientService: PatientsV2Service,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
  //////////
  onEditClient() {
    this.router.navigate([this.routes.patients.listEdit, this.patient.id]);
  }
}
