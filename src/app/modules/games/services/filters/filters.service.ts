import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IFilters } from '@data/schema/filters.model';
import { LoggerService } from '@services/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private initialFilters: IFilters = {
    freetext: '',
    players: [1,12],
    playersLimit: [1,12],
    playtime: [15,180],
    playtimeLimit: [15,180],
    rating: [1,10],
    ratingLimit: [1,10],
    expansions: true
  };
  private tracker = new BehaviorSubject<IFilters>(Object.assign({}, this.initialFilters));
  private subscription = new Subscription();
  private currentFilters: IFilters;

  constructor(private logger: LoggerService) {
    this.subscription.add(this.getFilters().subscribe(
      res => {
        this.currentFilters = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    ));
  }

  getFilters(): Observable<IFilters> {
    return this.tracker.asObservable();
  }

  setFilters(newFilters: any): void {
    this.tracker.next(Object.assign(this.currentFilters, newFilters));

    this.logger.log(`Filters changed:`);
    this.logger.log(newFilters);
  }

  resetFilters(): void {
    this.tracker.next(Object.assign(this.currentFilters, this.initialFilters));

    this.logger.log(`Filters reset to:`);
    this.logger.log(this.initialFilters);
  }
}
