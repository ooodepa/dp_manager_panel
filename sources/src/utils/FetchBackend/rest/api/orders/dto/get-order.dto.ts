export default interface GetOrderDto {
  dp_id: string;
  dp_date: string;
  dp_userId: number;
  dp_canceledByClientOn: string | null;
  dp_canceledByManagerOn: string | null;
  dp_sentedByManagerOn: string | null;
  dp_receivedByClientOn: string | null;
}
