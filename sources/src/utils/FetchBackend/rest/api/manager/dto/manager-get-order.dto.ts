import GetOrderWithIdDto from '../../orders/dto/get-order-with.id.dto';

export default interface ManagerGetOrder {
  take: number;
  page: number;
  totalPages: number;
  skip: number;
  data: [GetOrderWithIdDto];
}
