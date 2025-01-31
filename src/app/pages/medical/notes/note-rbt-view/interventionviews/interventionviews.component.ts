import { Component, Input } from '@angular/core';

interface InterventionInList {
  name: string;
  checked: boolean;
}

@Component({
    selector: 'app-interventionviews',
    templateUrl: './interventionviews.component.html',
    styleUrls: ['./interventionviews.component.scss']
})
export class InterventionviewsComponent {
  private interventionsBase = [
    'Token Economy',
    'Generalization',
    'NCR',
    'Behavioral Momentum',
    'DRA',
    'DRI',
    'DRO',
    'DRL',
    'Response Block',
    'Errorless Teaching',
    'Extinction',
    'Chaining',
    'Natural Teaching',
    'Redirection',
    'Shaping',
    'Pairing',
  ];

  // Map to store snake_case to Title Case mappings
  private interventionsMap: Map<string, string>;

  interventionsList: InterventionInList[] = [];

  constructor() {
    // Initialize the map with both snake_case and normal case versions
    this.interventionsMap = new Map(
      this.interventionsBase.map(name => [
        this.toSnakeCase(name),
        name
      ])
    );
  }

  private _interventions: string[] = [];
  @Input()
  set interventions(value: string[]) {
    this._interventions = value || [];
    this.generateInterventionsList();
  }
  get interventions(): string[] {
    return this._interventions;
  }

  private toSnakeCase(str: string): string {
    return str.toLowerCase().replace(/\s+/g, '_');
  }

  private getProperName(input: string): string {
    // If it's a snake_case key in our map, return the Title Case version
    if (this.interventionsMap.has(input.toLowerCase())) {
      return this.interventionsMap.get(input.toLowerCase())!;
    }
    // If it's not in our map, convert snake_case to Title Case
    if (input.includes('_')) {
      return input
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    // Return as is if it's not snake_case
    return input;
  }

  private generateInterventionsList() {
    // Create a set of all unique interventions (base + input), case insensitive
    const allInterventions = new Set([
      ...this.interventionsBase,
      ...this._interventions.map(i => {
        // Convert input to proper name format
        return this.getProperName(i);
      })
    ]);

    // Map to InterventionInList objects
    this.interventionsList = Array.from(allInterventions).map(name => ({
      name,
      checked: this._interventions.some(
        i => this.toSnakeCase(name) === this.toSnakeCase(i)
      )
    }));
  }
}
