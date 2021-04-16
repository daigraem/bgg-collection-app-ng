import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGame } from '@data/schema/game.model';
import { JsonApiService } from '@data/services/json-api/json-api.service';
import { FiltersService } from '@modules/games/services/filters/filters.service';
import { Subscription } from 'rxjs';
import { IFilters } from '@data/schema/filters.model';
import { ISorting, OrderBy, Order } from '@data/schema/sorting.model';
import { SortingService } from '@modules/games/services/sorting/sorting.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit, OnDestroy {
  updated: string;
  total: number;
  filteredGames: IGame[] = [];
  games: IGame[] = [];
  loading = true;

  orderByOptions = {
    title: OrderBy.title,
    playerCount: OrderBy.playerCount,
    playtime: OrderBy.playtime,
    rating: OrderBy.rating,
  };

  private subscription = new Subscription();

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

  private _currentSorting: ISorting;
  private _oldSorting: ISorting;
  private get currentSorting(): ISorting {
    return this._currentSorting;
  }
  private set currentSorting(newSorting: ISorting) {
    this._oldSorting = this._currentSorting;
    this._currentSorting = newSorting;
    this.performSorting(this.currentSorting);
  }

  constructor(
    private jsonApi: JsonApiService,
    private filterSrv: FiltersService,
    private sortingSrv: SortingService
  ) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCollection(): void {
    this.subscription.add(
      this.jsonApi.getCollection().subscribe({
        next: (collection) => {
          this.games = collection.item;
          this.filteredGames = this.games;
          this.updated = collection._pubdate;
          this.total = collection._totalitems;

          this.initFilters();
          this.initSorting();
        },
        error: (err) => console.error(err),
        complete: () => {
          this.loading = false;
        },
      })
    );
  }

  initFilters(): void {
    this.subscription.add(
      this.filterSrv.getFilters().subscribe(
        (res) => {
          this.currentFilters = res;
        },
        (err) => {
          console.error(`An error occurred: ${err.message}`);
        }
      )
    );
  }

  initSorting(): void {
    this.subscription.add(
      this.sortingSrv.getSorting().subscribe(
        (res) => {
          this.currentSorting = res;
        },
        (err) => {
          console.error(`An error occurred: ${err.message}`);
        }
      )
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
        const filterBy = filters.freetext.toLocaleLowerCase();
        const matchName =
          game.getName().toLocaleLowerCase().indexOf(filterBy) !== -1;
        const matchOriginalName = game.originalname
          ? game.originalname.toLocaleLowerCase().indexOf(filterBy) !== -1
          : false;

        return matchName || matchOriginalName;
      })
      // Expansions
      .filter((game: IGame) =>
        !filters.expansions && game.isExpansion() ? false : true
      )
      // Players
      .filter((game: IGame) => {
        if (
          (game.stats._minplayers < filters.players[0] &&
            filters.players[0] > filters.playersLimit[0]) ||
          (game.stats._maxplayers > filters.players[1] &&
            filters.players[1] < filters.playersLimit[1])
        ) {
          return false;
        }

        return true;
      })
      // Playtime
      .filter((game: IGame) => {
        if (
          (game.stats._minplaytime < filters.playtime[0] &&
            filters.playtime[0] > filters.playtimeLimit[0]) ||
          (game.stats._maxplaytime > filters.playtime[1] &&
            filters.playtime[1] < filters.playtimeLimit[1])
        ) {
          return false;
        }

        return true;
      })
      // Rating
      .filter((game: IGame) => {
        const rating = game.stats.getRating();
        if (
          (rating < filters.rating[0] &&
            filters.rating[0] > filters.ratingLimit[0]) ||
          (rating > filters.rating[1] &&
            filters.rating[1] < filters.ratingLimit[1])
        ) {
          return false;
        }

        return true;
      });
  }

  performSorting(filters: ISorting): void {
    // Order by
    if (filters.orderBy === OrderBy.playtime) {
      this.filteredGames.sort(
        (a, b) => a.stats._playingtime - b.stats._playingtime
      );
    } else if (filters.orderBy === OrderBy.rating) {
      this.filteredGames.sort(
        (a, b) => a.stats.getRating() - b.stats.getRating()
      );
    } else if (filters.orderBy === OrderBy.playerCount) {
      this.filteredGames.sort(
        (a, b) => a.stats._minplayers - b.stats._minplayers
      );
    } else {
      this.filteredGames.sort();
    }

    // Order
    if (filters.order === Order.desc) {
      this.filteredGames.reverse();
    }

    // force change detection
    this.filteredGames = [].concat(this.filteredGames);
  }
}
