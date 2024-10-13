import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ReportByClientComponent } from 'src/app/pages/medical/client-report/report-by-client/report-by-client.component';

@Pipe({
  name: 'getPrizeCptNote',
  pure: false,
})
export class GetPrizeCptNotePipe implements PipeTransform {
  constructor(private reportByClientComponent: ReportByClientComponent) {}

  /**
   * Transforma el código CPT en un precio.
   * @param cptCode El código CPT a transformar.
   * @returns El precio correspondiente al código CPT.
   */
  transform(cptCode: string, type?: 'RBT' | 'BCBA'): Observable<string> | null {
    // Lógica para obtener el precio del CPT
    // Puedes llamar a métodos específicos para RBT o BCBA si es necesario
    // Asegúrate de retornar el valor transformado
    if (!cptCode) return null;

    if (type === 'RBT' || type === 'BCBA')
      return this.getPrizeCptNote(cptCode, type);
    return this.getPrizeCptNoteGeneral(cptCode);
  }

  /**
   * Lógica general para obtener el precio del CPT.
   * Puedes adaptar esta lógica según sea necesario.
   * @param cptCode El código CPT.
   * @returns El precio del CPT.
   */
  private getPrizeCptNoteGeneral(cptCode: string): Observable<string> {
    // Implementación general para obtener el precio
    // Puedes necesitar hacer llamadas a servicios, consultas a bases de datos, etc.
    // Este es solo un ejemplo
    return of(`Precio para el código ${cptCode}`);
  }

  private getPrizeCptNote(cptCode: string, type: 'RBT' | 'BCBA') {
    return this.reportByClientComponent
      .getPrizeCptNote(
        this.reportByClientComponent.insurer_name,
        cptCode,
        this.reportByClientComponent.noteRbt.cpt_code,
        this.reportByClientComponent.provider
      )
      .pipe(
        map((result) => {
          const price =
            type === 'RBT' ? result[1].unit_prize : result[0].unit_prize;
          return `${price}`;
        })
      );
  }
}
