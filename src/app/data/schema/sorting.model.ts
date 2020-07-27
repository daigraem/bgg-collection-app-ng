export enum Order {
  ASC = "ASC",
  DESC = "DESC"
}

export enum OrderBy {
  Title = "Title",
  PlayerCount = "PlayerCount",
  Playtime = "Playtime",
  Rating = "Rating"
}

export interface ISorting {
  orderBy: OrderBy;
  order: Order;
}
