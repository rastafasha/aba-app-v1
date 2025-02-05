import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map, of, switchMap, tap } from 'rxjs';
import { BipV2, PatientV2 } from 'src/app/core/models';
import { PatientsV2Service } from 'src/app/core/services';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { PageService } from 'src/app/shared/services/pages.service';
import Swal from 'sweetalert2';
import { BipUseCasesService } from '../services/bip-use-cases.service';

@Component({
  selector: 'app-bip-show',
  templateUrl: './bip-show.component.html',
  styleUrls: ['./bip-show.component.scss'],
})
export class BipShowComponent implements OnInit {
  routes = AppRoutes;
  patient: PatientV2;
  bip: BipV2 = null;
  old_bip: BipV2 = null;
  patient_identifier: string;

  constructor(
    private useCases: BipUseCasesService,
    private pageService: PageService,
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
    return this.useCases.getBipByClientId(this.patient.id).pipe(
      map((resp) => {
        this.bip = resp.data;
        this.old_bip = this.cloneBip(this.bip);
        return this.bip;
      })
    );
  }
  //////////
  onEditClient() {
    this.router.navigate([this.routes.patients.listEdit, this.patient.id]);
  }

  onSave() {
    this.useCases.save(this.bip, this.old_bip).subscribe({
      next: (resp) => {
        this.old_bip = this.cloneBip(resp.data);
        this.bip = this.cloneBip(resp.data);
        Swal.fire('Updated', `Bip Updated successfully!`, 'success');
      },
      error: () => Swal.fire('Error', `Error updating`, 'error'),
    });
  }
  onCancel() {
    this.bip = this.cloneBip(this.old_bip);
  }
  private cloneBip(bip: BipV2) {
    return new BipV2(JSON.parse(JSON.stringify(bip)));
  }
}
