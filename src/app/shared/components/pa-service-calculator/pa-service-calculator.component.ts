import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaService } from '../../interfaces/pa-service.interface';
import { PaServiceCalculatorResponse } from '../../interfaces/pa-service-calculator.interface';
import { PaServiceCalculatorService } from 'src/app/core/services/pa-service-calculator.service';

@Component({
  selector: 'app-pa-service-calculator',
  templateUrl: './pa-service-calculator.component.html',
  styleUrls: ['./pa-service-calculator.component.scss']
})
export class PaServiceCalculatorComponent implements OnChanges {
  @Input() selectedPaService: PaService | null = null;
  @Input() projectedUnits = 0;

  calculatorResponse: PaServiceCalculatorResponse | null = null;

  constructor(private paServiceCalculatorService: PaServiceCalculatorService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['selectedPaService'] && !changes['selectedPaService'].firstChange) ||
        (changes['projectedUnits'] && !changes['projectedUnits'].firstChange)) {
      this.loadCalculation();
    }
  }

  loadCalculation() {
    if (!this.selectedPaService?.id) return;

    this.paServiceCalculatorService.calculateUnits(this.selectedPaService.id).subscribe(
      (response) => {
        this.calculatorResponse = response;
      },
      (error) => {
        console.error('Error loading PA service calculation:', error);
        this.calculatorResponse = null;
      }
    );
  }

  isExceedingAvailableUnits(): boolean {
    if (!this.calculatorResponse) return false;
    return (this.calculatorResponse.used_units_this_week + this.projectedUnits) > this.calculatorResponse.average_units_per_week;
  }
}
