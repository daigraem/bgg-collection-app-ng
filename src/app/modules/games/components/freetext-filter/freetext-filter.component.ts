import { Component, OnInit, OnDestroy } from '@angular/core';
import { FiltersService } from '@modules/games/services/filters/filters.service';
import { Subscription } from 'rxjs';
import { IFilters } from '@data/schema/filters.model';
import { LoggerService } from '@shared/services/logger.service';

@Component({
  selector: 'app-freetext-filter',
  templateUrl: './freetext-filter.component.html',
  styleUrls: ['./freetext-filter.component.scss']
})
export class FreetextFilterComponent implements OnInit, OnDestroy {

  currentText: string;
  private currentFilters: IFilters;
  private filtersSub: Subscription;
  expansions: boolean;

  constructor(private filterSrv: FiltersService, private logger: LoggerService) { }

  ngOnInit(): void {
    this.filtersSub = this.filterSrv.getFilters().subscribe(
      res => {
        this.currentFilters = res;
        this.currentText = res.freetext;
        this.expansions = res.expansions;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.filtersSub.unsubscribe();
  }

  toggleExpansions(): void {
    this.expansions = !this.expansions;
    this.filterSrv.setFilters(Object.assign(this.currentFilters, { expansions: this.expansions }));
  }

  changeSearch(value: string): void {
    this.filterSrv.setFilters(Object.assign(this.currentFilters, { freetext: value }));
  }
}
