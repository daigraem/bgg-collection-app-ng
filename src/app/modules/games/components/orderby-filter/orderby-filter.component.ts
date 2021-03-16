import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ISorting , Order, OrderBy } from '@data/schema/sorting.model';
import { Subscription } from 'rxjs';
import { SortingService } from '@modules/games/services/sorting/sorting.service';

@Component({
  selector: 'app-orderby-filter',
  templateUrl: './orderby-filter.component.html',
  styleUrls: ['./orderby-filter.component.scss']
})
export class OrderbyFilterComponent implements OnInit, OnDestroy {

  @Input() label: string;
  @Input() orderBy: OrderBy;
  activeClassname = '';

  private currentFilters: ISorting;
  private subscription = new Subscription();
  private order: Order = Order.asc;

  constructor(private sortingService: SortingService) { }

  ngOnInit(): void {
    this.subscription.add(this.sortingService.getSorting().subscribe(
      res => {
        this.currentFilters = res;
        this.setActiveClassname();
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeOrder(): void {
    this.order = this.order === Order.asc ? Order.desc : Order.asc;

    const newFilters = {
      orderBy: this.orderBy,
      order: this.order
    };

    this.sortingService.setSorting(newFilters);
  }

  private setActiveClassname(): void {
    if (this.orderBy === this.currentFilters.orderBy) {
      this.activeClassname = 'is-active-' + this.order;
    } else {
      this.order = Order.asc;
      this.activeClassname = '';
    }
  }
}
