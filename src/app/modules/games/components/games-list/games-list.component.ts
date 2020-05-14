import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGame } from '@data/schema/game.model';
import { JsonApiService } from '@data/services/json-api/json-api.service';
import { FiltersService } from '@modules/games/services/filters/filters.service';
import { Subscription } from 'rxjs';
import { IFilters, OrderBy, Order } from '@data/schema/filters.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GameGamesComponent implements OnInit, OnDestroy {

  private filtersSub: Subscription;

  updated: string;
  total: number;
  filteredGames: IGame[] = [];
  games: IGame[] = [];

  orderBy = {
    Title: OrderBy.Title,
    PlayerCount: OrderBy.PlayerCount,
    Playtime: OrderBy.Playtime,
    Rating: OrderBy.Rating,
  };

  order = {
    ASC: Order.ASC,
    DESC: Order.DESC
  };

  private _currentFilters: IFilters;
  private get currentFilters(): IFilters {
    return this._currentFilters;
  }
  private set currentFilters(newFilters: IFilters) {
    this._currentFilters = newFilters;
    this.performFilters(this.currentFilters);
  }

  constructor(
    private jsonApi: JsonApiService,
    private filterSrv: FiltersService
  ) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  ngOnDestroy(): void {
    this.filtersSub.unsubscribe();
  }

  loadCollection(): void {
    this.jsonApi.getCollection().subscribe({
      next: collection => {
        this.games = collection.item;
        this.filteredGames = this.games;
        this.updated = collection._pubdate;
        this.total = collection._totalitems;

        this.initFilters();
      },
      error: err => console.log(err)
    });
  }

  initFilters(): void {
    this.filtersSub = this.filterSrv.getFilters().subscribe(
      res => {
        this.currentFilters = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  performFilters(filters: IFilters): void {
    const filterBy = filters.freetext.toLocaleLowerCase();
    const orderBy = filters.orderBy;
    const order = filters.order;
    const expansions = filters.expansions;

    // Filter
    this.filteredGames = this.games.filter((game: IGame) => {
      let matchName = game.getName().toLocaleLowerCase().indexOf(filterBy) !== -1;
      let matchOriginalName = game.originalname ? game.originalname.toLocaleLowerCase().indexOf(filterBy) !== -1 : false;

      return matchName || matchOriginalName;
    });

    this.filteredGames = this.filteredGames.filter((game: IGame) => {
      return !expansions && game.isExpansion() ? false : true;
    });

    // Order by
    if (orderBy == OrderBy.Playtime) {
      this.filteredGames.sort((a, b) => a.stats._playingtime - b.stats._playingtime);
    } else if (orderBy === OrderBy.Rating) {
      this.filteredGames.sort((a, b) => a.stats.getRating() - b.stats.getRating());
    } else if (orderBy === OrderBy.PlayerCount) {
      this.filteredGames.sort((a, b) => a.stats._minplayers - b.stats._minplayers);
    } else {
      this.filteredGames.sort();
    }

    // Order
    if (order == Order.DESC) {
      this.filteredGames.reverse();
    }
  }
}
