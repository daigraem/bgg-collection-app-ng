export enum Order {
  asc = 'asc',
  desc = 'desc'
}

export enum OrderBy {
  title = 'title',
  playerCount = 'playerCount',
  playtime = 'playtime',
  rating = 'rating'
}

export interface ISorting {
  orderBy: OrderBy;
  order: Order;
}
