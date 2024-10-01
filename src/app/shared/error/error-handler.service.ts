import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error en el cliente:', error.error.message);
    } else {
      console.error(`Error en el servidor: ${error.status}, ${error.message}`);
    }
    return throwError(
      () => new Error('Algo salió mal, por favor intenta de nuevo más tarde.')
    );
  }
}
