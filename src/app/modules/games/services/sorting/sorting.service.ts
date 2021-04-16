import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ISorting, OrderBy, Order } from '@data/schema/sorting.model';
import { LoggerService } from '@services/logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private initialSorting: ISorting = {
    orderBy: OrderBy.title,
    order: Order.asc,
  };
  private tracker = new BehaviorSubject<ISorting>(
    Object.assign({}, this.initialSorting)
  );
  private subscription = new Subscription();
  private currentSorting: ISorting;

  constructor(private logger: LoggerService) {
    this.subscription.add(
      this.getSorting().subscribe(
        (res) => {
          this.currentSorting = res;
        },
        (err) => {
          console.error(`An error occurred: ${err.message}`);
        }
      )
    );
  }

  getSorting(): Observable<ISorting> {
    return this.tracker.asObservable();
  }

  setSorting(newSorting: any): void {
    this.tracker.next(Object.assign(this.currentSorting, newSorting));

    this.logger.log(`Sorting changed:`, newSorting);
  }

  resetSorting(): void {
    this.tracker.next(Object.assign(this.currentSorting, this.initialSorting));

    this.logger.log(`Sorting reset to:`, this.initialSorting);
  }
}
