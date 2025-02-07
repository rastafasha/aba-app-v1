import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiV2Response } from 'src/app/core/models';
import { RepositoryV2Service } from 'src/app/core/services';

export interface IndexedEntity {
  id: number;
  index?: number;
}

@Injectable({ providedIn: 'root' })
export class RepositoryUtils {
  stripIndex<T extends IndexedEntity>(entity: T): T {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, ...entityWithoutIndex } = { ...entity };
    return entityWithoutIndex as T;
  }

  handleDeletes<T extends IndexedEntity>(
    oldItems: T[],
    newItems: T[],
    service: RepositoryV2Service<T>
  ): Observable<ApiV2Response<T>>[] {
    const operations: Observable<ApiV2Response<T>>[] = [];
    oldItems.forEach((oldItem) => {
      if (!newItems.find((item) => item.id === oldItem.id)) {
        operations.push(service.delete(oldItem.id));
      }
    });
    return operations;
  }

  handleUpdatesAndCreates<T extends IndexedEntity>(
    newItems: T[],
    oldItems: T[],
    service: RepositoryV2Service<T>,
    beforeSave?: (item: T) => void
  ): Observable<ApiV2Response<T>>[] {
    const operations: Observable<ApiV2Response<T>>[] = [];

    newItems.forEach((item) => {
      if (beforeSave) beforeSave(item);
      const oldItem = oldItems.find((o) => o.id === item.id);

      if (!oldItem || item.id === 0 || item.id === undefined) {
        console.log('creating', item);
        operations.push(service.create(this.stripIndex(item)));
      } else if (
        JSON.stringify(this.stripIndex(item)) !==
        JSON.stringify(this.stripIndex(oldItem))
      ) {
        console.log('updating', item);
        operations.push(service.update(this.stripIndex(item), item.id));
      }
    });

    return operations;
  }

  handleEntityChanges<T extends IndexedEntity>(
    newItems: T[],
    oldItems: T[],
    service: RepositoryV2Service<T>,
    beforeSave?: (item: T) => void
  ): Observable<unknown> {
    const operations = [
      ...this.handleUpdatesAndCreates(newItems, oldItems, service, beforeSave),
      ...this.handleDeletes(oldItems, newItems, service),
    ];

    return operations.length ? forkJoin(operations) : of(null);
  }
}
