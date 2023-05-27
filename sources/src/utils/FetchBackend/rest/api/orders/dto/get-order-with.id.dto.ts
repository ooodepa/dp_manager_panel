import GetOrderDto from './get-order.dto';

interface GetOrderItem {
  dp_id: number;
  dp_orderId: string;
  dp_itemId: string;
  dp_count: number;
  dp_cost: number;
}

export default interface GetOrderWithIdDto extends GetOrderDto {
  dp_orderItems: GetOrderItem[];
}
