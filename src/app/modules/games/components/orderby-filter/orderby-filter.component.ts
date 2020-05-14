import { Component, OnInit, Input } from '@angular/core';
import { IFilters, Order, OrderBy } from '@data/schema/filters.model';
import { Subscription } from 'rxjs';
import { FiltersService } from '@modules/games/services/filters/filters.service';

@Component({
  selector: 'app-orderby-filter',
  templateUrl: './orderby-filter.component.html',
  styleUrls: ['./orderby-filter.component.scss']
})
export class OrderbyFilterComponent implements OnInit {

  @Input() label: string;
  @Input() orderBy: OrderBy;
  activeClassname: string = '';

  private currentFilters: IFilters;
  private filtersSub: Subscription;
  private order: Order = Order.ASC;

  constructor(private filterSrv: FiltersService) { }

  ngOnInit(): void {
    this.filtersSub = this.filterSrv.getFilters().subscribe(
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

  changeOrder() {
    this.order = this.order == Order.ASC ? Order.DESC : Order.ASC;

    const newFilters = {
      orderBy: this.orderBy,
      order: this.order
    };

    this.filterSrv.setFilters(Object.assign(this.currentFilters, newFilters));
  }

}
