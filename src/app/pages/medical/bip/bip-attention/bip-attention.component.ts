import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { BipV2, PatientV2 } from 'src/app/core/models';
import { BipV2Service } from 'src/app/core/services';
import { AppRoutes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { BIP_ATTENTION_OPTIONS } from './bip-attention.const';

@Component({
  selector: 'app-bip-attention',
  templateUrl: './bip-attention.component.html',
  styleUrls: ['./bip-attention.component.scss'],
})
export class BipAttentionComponent implements OnInit {
  routes = AppRoutes;
  bipAttentionOptions = BIP_ATTENTION_OPTIONS;
  optionSelected = 1;
  patient: PatientV2;
  bip: BipV2;
  constructor(
    private bipService: BipV2Service,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.patient = data['patient'];
      this.getBip();
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      this.optionSelected = Number(params.get('selected'));
    });
  }
  onSelectOption(value: number) {
    this.router.navigate([this.routes.bip.edit, this.patient.id, value]);
  }
  getBip() {
    this.bipService
      .list({ client_id: this.patient.id })
      .pipe(switchMap((resp) => this.bipService.get(resp.data[0].id)))
      .subscribe((resp) => {
        this.bip = resp.data;
      });
  }

  onSave() {
    this.bipService.update(this.bip, this.bip.id).subscribe({
      next: () => {
        Swal.fire('Updated', `Bip Updated successfully!`, 'success');
      },
      error: (error) => {
        Swal.fire('Error', `Error updating Bip`, 'error');
        console.log(error);
      },
    });
  }
}
