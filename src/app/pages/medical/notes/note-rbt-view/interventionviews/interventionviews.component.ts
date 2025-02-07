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
  // Map to store snake_case to Title Case mappings
  private interventionsMap: Map<string, string>;

  interventionsList: InterventionInList[] = [];

  private _interventionsBase: string[] = [];
  @Input()
  set interventionsBase(value: string[]) {
    this._interventionsBase = value || [];
    this.initializeInterventionsMap();
    this.generateInterventionsList();
  }
  get interventionsBase(): string[] {
    return this._interventionsBase;
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

  private initializeInterventionsMap() {
    // Initialize the map with both snake_case and normal case versions
    this.interventionsMap = new Map(
      this._interventionsBase.map(name => [
        this.toSnakeCase(name),
        name
      ])
    );
  }

  private getProperName(input: string): string {
    // If it's a snake_case key in our map, return the Title Case version
    if (this.interventionsMap?.has(input.toLowerCase())) {
      return this.interventionsMap.get(input.toLowerCase())!;
    }
    // If it's not in our map, convert snake_case to Title Case
    if (input.includes('_')) {
      return input
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    // Turn the first letter to uppercase
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  private generateInterventionsList() {
    if (!this._interventionsBase.length) return;

    // Create a set of all unique interventions (base + input), case insensitive
    const allInterventions = new Set([
      ...this._interventionsBase,
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
