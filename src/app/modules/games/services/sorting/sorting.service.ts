import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ISorting , OrderBy, Order } from '@data/schema/sorting.model';
import { LoggerService } from '@services/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  private initialSorting: ISorting = {
    orderBy: OrderBy.Title,
    order: Order.ASC,
  };
  private tracker = new BehaviorSubject<ISorting >(Object.assign({}, this.initialSorting));
  private sortingSub: Subscription;
  private currentSorting: ISorting ;

  constructor(private logger: LoggerService) {
    this.sortingSub = this.getSorting().subscribe(
      res => {
        this.currentSorting = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  getSorting(): Observable<ISorting > {
    return this.tracker.asObservable();
  }

  setSorting(newSorting: object): void {
    this.tracker.next(Object.assign(this.currentSorting, newSorting));

    this.logger.log(`Sorting changed:`);
    this.logger.log(newSorting);
  }

  resetSorting(): void {
    this.tracker.next(Object.assign(this.currentSorting, this.initialSorting));

    this.logger.log(`Sorting reset to:`);
    this.logger.log(this.initialSorting);
  }
}
