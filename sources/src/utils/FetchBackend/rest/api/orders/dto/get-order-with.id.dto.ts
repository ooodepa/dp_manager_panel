import GetOrderDto from './get-order.dto';
import GetOrderItemDto from './get-order-item.dto';
import GetOrderStatusDto from '../../order-statuses/dto/get-order-status.dto';

export default interface GetOrderWithIdDto extends GetOrderDto {
  dp_orderItems: GetOrderItemDto[];
  dp_orderStatuses: GetOrderStatusDto[];
}
