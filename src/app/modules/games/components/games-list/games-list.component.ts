import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGame } from '@data/schema/game.model';
import { JsonApiService } from '@data/services/json-api/json-api.service';
import { FiltersService } from '@modules/games/services/filters/filters.service';
import { Subscription } from 'rxjs';
import { IFilters } from '@data/schema/filters.model';
import { ISorting , OrderBy, Order } from '@data/schema/sorting.model';
import { SortingService } from '@modules/games/services/sorting/sorting.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnDestroy {

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
  private _oldFilters: IFilters;
  private get currentFilters(): IFilters {
    return this._currentFilters;
  }
  private set currentFilters(newFilters: IFilters) {
    this._oldFilters = this._currentFilters;
    this._currentFilters = newFilters;
    this.performFilters(this.currentFilters);
  }

  private _currentSorting: ISorting ;
  private _oldSorting: ISorting ;
  private get currentSorting(): ISorting {
    return this._currentSorting;
  }
  private set currentSorting(newSorting: ISorting ) {
    this._oldSorting = this._currentSorting;
    this._currentSorting = newSorting;
    this.performSorting(this.currentSorting);
  }

  loading: boolean = true;

  constructor(
    private jsonApi: JsonApiService,
    private filterSrv: FiltersService,
    private sortingSrv: SortingService,
  ) { }

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
      error: err => console.log(err),
      complete: () => {
        this.loading = false;
      }
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

  onResetBtnClick(): void {
    this.filterSrv.resetFilters();
    this.sortingSrv.resetSorting();
  }

  performFilters(filters: IFilters): void {

    this.filteredGames = this.games
      // Freetext
      .filter((game: IGame) => {
        let filterBy = filters.freetext.toLocaleLowerCase()
        let matchName = game.getName().toLocaleLowerCase().indexOf(filterBy) !== -1;
        let matchOriginalName = game.originalname ? game.originalname.toLocaleLowerCase().indexOf(filterBy) !== -1 : false;

        return matchName || matchOriginalName;
      })
      // Expansions
      .filter((game: IGame) => {
        return !filters.expansions && game.isExpansion() ? false : true;
      })
      // Players
      .filter((game: IGame) => {
        if (
          (game.stats._minplayers < filters.players[0] && filters.players[0] > filters.playersLimit[0]) ||
          (game.stats._maxplayers > filters.players[1] && filters.players[1] < filters.playersLimit[1])
        ) {
          return false;
        }

        return true;
      })
      // Playtime
      .filter((game: IGame) => {
        if (
          (game.stats._minplaytime < filters.playtime[0] && filters.playtime[0] > filters.playtimeLimit[0]) ||
          (game.stats._maxplaytime > filters.playtime[1] && filters.playtime[1] < filters.playtimeLimit[1])
        ) {
          return false;
        }

        return true;
      })
      // Rating
      .filter((game: IGame) => {
        const rating = game.stats.getRating();
        if (
          (rating < filters.rating[0] && filters.rating[0] > filters.ratingLimit[0]) ||
          (rating > filters.rating[1] && filters.rating[1] < filters.ratingLimit[1])
        ) {
          return false;
        }

        return true;
      })
      ;
  }

  performSorting(filters: ISorting ): void {

    // Order by
    if (filters.orderBy == OrderBy.Playtime) {
      this.filteredGames.sort((a, b) => a.stats._playingtime - b.stats._playingtime);
    } else if (filters.orderBy === OrderBy.Rating) {
      this.filteredGames.sort((a, b) => a.stats.getRating() - b.stats.getRating());
    } else if (filters.orderBy === OrderBy.PlayerCount) {
      this.filteredGames.sort((a, b) => a.stats._minplayers - b.stats._minplayers);
    } else {
      this.filteredGames.sort();
    }

    // Order
    if (filters.order == Order.DESC) {
      this.filteredGames.reverse();
    }
  }
}
