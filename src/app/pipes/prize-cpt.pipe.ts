import { Pipe, PipeTransform } from '@angular/core';
import { ReportByClientComponent } from '../medical/client-report/report-by-client/report-by-client.component';

@Pipe({
  name: 'getPrizeCptNote'
})
export class GetPrizeCptNotePipe implements PipeTransform {

    constructor(private reportByClientComponent: ReportByClientComponent) {}

  /**
   * Transforma el código CPT en un precio.
   * @param cptCode El código CPT a transformar.
   * @returns El precio correspondiente al código CPT.
   */
  transform(cptCode: string): any {
    // Lógica para obtener el precio del CPT
    // Puedes llamar a métodos específicos para RBT o BCBA si es necesario
    // Asegúrate de retornar el valor transformado
    // return this.getPrizeCptNoteGeneral(cptCode);
    return this.getPrizeCptNoteRbt(cptCode);
  }

  /**
   * Lógica general para obtener el precio del CPT.
   * Puedes adaptar esta lógica según sea necesario.
   * @param cptCode El código CPT.
   * @returns El precio del CPT.
   */
  private getPrizeCptNoteGeneral(cptCode: string): any {
    // Implementación general para obtener el precio
    // Puedes necesitar hacer llamadas a servicios, consultas a bases de datos, etc.
    // Este es solo un ejemplo
    return `Precio para el código ${cptCode}`;
  }

  // Si necesitas métodos específicos para RBT o BCBA, puedes mantenerlos
  // Pero asegúrate de que su propósito sea claro y no dupliques lógica
  private getPrizeCptNoteRbt(cptCode: string): any {
    // Lógica específica para RBT
    return this.reportByClientComponent.getPrizeCptNote(this.reportByClientComponent.insurer_name, cptCode, this.reportByClientComponent.noteRbt.cpt_code, this.reportByClientComponent.provider);
  }

  private getPrizeCptNoteBcba(cptCode: string): any {
    // Lógica específica para BCBA
    return this.reportByClientComponent.getPrizeCptNote(this.reportByClientComponent.insurer_name, cptCode, this.reportByClientComponent.noteBcba.cpt_code, this.reportByClientComponent.provider);
    
  }
}