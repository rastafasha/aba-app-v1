import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BipV2, PatientV2 } from 'src/app/core/models';
import { AppRoutes } from 'src/app/shared/routes/routes';
import { BipService } from '../service/bip.service';
import { BIP_ATTENTION_OPTIONS } from './bip-attention.const';
import { Maladaptive } from 'src/app/pages/dashboard/models/dashboard.models';

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
  typeOfAssessment = 0;
  documentsReviewed: { index: number; title: string }[] = [];
  maladaptives: Maladaptive[] = [];
  constructor(
    private bipService: BipService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.patient = data['patient'];
      this.getBip();
    });
  }

  getBip() {
    this.bipService
      .getBipByUser(this.patient.patient_identifier)
      .subscribe((resp) => {
        this.bip = resp.bip;
        this.typeOfAssessment = resp.type_of_assessment;
        this.documentsReviewed = resp.documents_reviewed;
        this.maladaptives = resp.maladaptives;
      });
  }

  onSelectOption(value: number) {
    this.optionSelected = value;
  }
}
