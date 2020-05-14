import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFilters, OrderBy, Order } from '@data/schema/filters.model';
import { LoggerService } from '@shared/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private initialFilters: IFilters = {
    freetext: '',
    orderBy: OrderBy.Title,
    order: Order.ASC,
    expansions: true
  };
  private tracker = new BehaviorSubject<IFilters>(this.initialFilters);

  constructor(private logger: LoggerService) { }

  getFilters(): Observable<IFilters> {
    return this.tracker.asObservable();
  }

  setFilters(newFilters: IFilters): void {
    this.logger.log(`Filters changed to:`);
    this.logger.log(newFilters);

    this.tracker.next(newFilters);
  }

  resetFilters(): void {
    this.logger.log(`Filters reset to:`);
    this.logger.log(this.initialFilters);

    this.tracker.next(this.initialFilters);
  }
}
