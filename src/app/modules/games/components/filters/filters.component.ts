import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FiltersService } from '@modules/games/services/filters/filters.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { IFilters } from '@data/schema/filters.model';
import { SortingService } from '@modules/games/services/sorting/sorting.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Input() delay = 300;
  currentFilters: IFilters;
  private subscritpion = new Subscription();
  private filtersChanged: Subject<any> = new Subject<any>();

  constructor(
    private filterSrv: FiltersService,
    private sortingSrv: SortingService
  ) { }

  ngOnInit(): void {
    this.subscritpion.add(this.filterSrv.getFilters().subscribe(
      res => {
        this.currentFilters = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    ));

    this.filtersChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => this.filterSrv.setFilters(value));
  }

  ngOnDestroy(): void {
    this.subscritpion.unsubscribe();
  }

  toggleExpansions(): void {
    this.filterSrv.setFilters({ expansions: !this.currentFilters.expansions });
  }

  onPlayersSliderChange(value: number[]) {
    this.filtersChanged.next({ players: value });
  }

  onPlaytimeSliderChange(value: number[]) {
    this.filtersChanged.next({ playtime: value });
  }

  onRatingSliderChange(value: number[]) {
    this.filtersChanged.next({ rating: value });
  }

  changeSearch(value: string): void {
    this.filterSrv.setFilters({ freetext: value });
  }

  onResetBtnClick(): void {
    this.filterSrv.resetFilters();
    this.sortingSrv.resetSorting();
  }
}
