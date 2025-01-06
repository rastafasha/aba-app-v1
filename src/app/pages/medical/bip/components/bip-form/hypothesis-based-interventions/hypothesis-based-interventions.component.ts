import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attention, Escape, Sensory, Tangible } from 'src/app/core/models';
import { ListFormStrategy } from '../list-form.strategy';

@Component({
  selector: 'app-hypothesis-based-interventions',
  templateUrl: './hypothesis-based-interventions.component.html',
  styleUrls: ['./hypothesis-based-interventions.component.scss'],
})
export class HypothesisBasedInterventionsComponent {
  @Output() save = new EventEmitter<void>();
  //
  @Input() hypothesisBasedIntervention: string;
  @Output() hypothesisBasedInterventionChange = new EventEmitter<string>();
  //
  @Input() tangibles: Tangible[] = [];
  @Output() tangiblesChange = new EventEmitter<Tangible[]>();
  newTangible: Tangible = {
    index: 0,
    preventive_strategies: '',
    replacement_skills: '',
    manager_strategies: '',
  };
  tangiblesStrategy = new ListFormStrategy<Tangible>(
    this.tangiblesChange,
    this.newTangible
  );
  //
  @Input() sensories: Sensory[] = [];
  @Output() sensoriesChange = new EventEmitter<Sensory[]>();
  newSensory: Sensory = {
    index: 0,
    preventive_strategies_s: '',
    replacement_skills_s: '',
    manager_strategies_s: '',
  };
  sensoriesStrategy = new ListFormStrategy<Sensory>(
    this.sensoriesChange,
    this.newSensory
  );
  //
  @Input() escapes: Escape[] = [];
  @Output() escapesChange = new EventEmitter<Escape[]>();
  newEscape: Escape = {
    index: 0,
    preventive_strategies_e: '',
    replacement_skills_e: '',
    manager_strategies_e: '',
  };
  escapesStrategy = new ListFormStrategy<Escape>(
    this.escapesChange,
    this.newEscape
  );
  //
  @Input() attentions: Attention[] = [];
  @Output() attentionsChange = new EventEmitter<Attention[]>();
  newAttention: Attention = {
    index: 0,
    preventive_strategies_a: '',
    replacement_skills_a: '',
    manager_strategies_a: '',
  };
  attentionsStrategy = new ListFormStrategy<Attention>(
    this.attentionsChange,
    this.newAttention
  );
  //
  text_validation = '';

  onSave() {
    this.save.emit();
  }

  addTangible() {
    const result = this.tangiblesStrategy.add(
      this.validateTangible,
      this.tangibles,
      this.newTangible
    );
    this.text_validation = result.text;
    this.tangibles = result.items;
    this.newTangible = result.item;
  }

  deleteTangible(i: number) {
    this.tangibles = this.tangiblesStrategy.delete(i, this.tangibles);
  }

  seleccionarTangible(tang: Tangible) {
    this.newTangible = this.tangiblesStrategy.select(this.tangibles, tang);
  }

  updateItemListTangibles(tang: Tangible) {
    this.newTangible = this.tangiblesStrategy.updateList(this.tangibles, tang);
  }

  private validateTangible = () => {
    return !!(
      this.newTangible.manager_strategies &&
      this.newTangible.preventive_strategies &&
      this.newTangible.replacement_skills
    );
  };
  ////////////////////////////////

  addSensory() {
    const result = this.sensoriesStrategy.add(
      this.validateSensory,
      this.sensories,
      this.newSensory
    );
    this.sensories = result.items;
    this.newSensory = result.item;
    this.text_validation = result.text;
  }

  deleteSensory(i: number) {
    this.sensories = this.sensoriesStrategy.delete(i, this.sensories);
  }

  updateItemListSensory(sensory: Sensory) {
    this.newSensory = this.sensoriesStrategy.updateList(
      this.sensories,
      sensory
    );
  }

  seleccionarSensory(sensory: Sensory) {
    this.newSensory = this.sensoriesStrategy.select(this.sensories, sensory);
  }

  private validateSensory = () => {
    return !!(
      this.newSensory.manager_strategies_s &&
      this.newSensory.preventive_strategies_s &&
      this.newSensory.replacement_skills_s
    );
  };

  //////////////////
  addEscape() {
    const result = this.escapesStrategy.add(
      this.escapeValidation,
      this.escapes,
      this.newEscape
    );
    this.escapes = result.items;
    this.newEscape = result.item;
    this.text_validation = result.text;
  }

  deleteEscape(i: number) {
    this.escapes = this.escapesStrategy.delete(i, this.escapes);
  }

  seleccionarEscape(escape: Escape) {
    this.newEscape = this.escapesStrategy.select(this.escapes, escape);
  }

  updateItemListEscape(escape: Escape) {
    this.newEscape = this.escapesStrategy.updateList(this.escapes, escape);
  }

  private escapeValidation = () => {
    return !!(
      this.newEscape.preventive_strategies_e &&
      this.newEscape.replacement_skills_e &&
      this.newEscape.manager_strategies_e
    );
  };

  ////////////////
  addAttention() {
    const result = this.attentionsStrategy.add(
      this.validateAttention,
      this.attentions,
      this.newAttention
    );
    this.attentions = result.items;
    this.newAttention = result.item;
    this.text_validation = result.text;
  }

  deleteAttention(i: number) {
    this.attentions = this.attentionsStrategy.delete(i, this.attentions);
  }

  seleccionarAttenti(attent: Attention) {
    this.newAttention = this.attentionsStrategy.select(this.attentions, attent);
  }

  updateItemListAttention(attent: Attention) {
    this.newAttention = this.attentionsStrategy.updateList(
      this.attentions,
      attent
    );
  }

  private validateAttention = () => {
    return !!(
      this.newAttention.manager_strategies_a &&
      this.newAttention.preventive_strategies_a &&
      this.newAttention.replacement_skills_a
    );
  };
}
