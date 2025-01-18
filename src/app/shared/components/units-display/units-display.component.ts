import { Component, Input } from '@angular/core';
import { PaServiceV2 } from 'src/app/core/models';
import { PaService } from 'src/app/shared/interfaces/pa-service.interface';

@Component({
    selector: 'app-units-display',
    templateUrl: './units-display.component.html',
    styleUrls: ['./units-display.component.scss']
})
export class UnitsDisplayComponent {
    @Input() service: PaServiceV2;
    @Input() newUnits?: number;

    get usedUnitsPercentage(): number {
        if (!this.service) return 0;
        return (this.service.spent_units / this.service.n_units) * 100;
    }

    get projectedUnitsPercentage(): number {
        if (!this.service || !this.newUnits) return 0;
        const totalProjected = this.service.spent_units + this.newUnits;
        const projectedPercentage = (totalProjected / this.service.n_units) * 100;
        return projectedPercentage - this.usedUnitsPercentage;
    }

    get isExceedingLimit(): boolean {
        if (!this.service || !this.newUnits) return false;
        return this.newUnits > this.service.available_units;
    }
}