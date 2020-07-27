import { Component, OnInit, Input } from '@angular/core';
import { ISorting , Order, OrderBy } from '@data/schema/sorting.model';
import { Subscription } from 'rxjs';
import { SortingService } from '@modules/games/services/sorting/sorting.service';

@Component({
  selector: 'app-orderby-filter',
  templateUrl: './orderby-filter.component.html',
  styleUrls: ['./orderby-filter.component.scss']
})
export class OrderbyFilterComponent implements OnInit {

  @Input() label: string;
  @Input() orderBy: OrderBy;
  activeClassname: string = '';

  private currentFilters: ISorting ;
  private filtersSub: Subscription;
  private order: Order = Order.ASC;

  constructor(private sortingService: SortingService) { }

  ngOnInit(): void {
    this.filtersSub = this.sortingService.getSorting().subscribe(
      res => {
        this.currentFilters = res;
        this.setActiveClassname();
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.filtersSub.unsubscribe();
  }

  private setActiveClassname(): void {
    if (this.orderBy == this.currentFilters.orderBy) {
      this.activeClassname = 'is-active-' + this.order;
    } else {
      this.order = Order.ASC;
      this.activeClassname = '';
    }
  }

  changeOrder(): void {
    this.order = this.order == Order.ASC ? Order.DESC : Order.ASC;

    const newFilters = {
      orderBy: this.orderBy,
      order: this.order
    };

    this.sortingService.setSorting(newFilters);
  }

}
