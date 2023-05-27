export default interface GetOrderDto {
  dp_id: string;
  dp_date: string;
  dp_userId: number;
  dp_isCancelled: boolean;
  dp_isCompleted: boolean;
}
