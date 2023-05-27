import FetchBackend from './../../../';
import HttpException from './../../../HttpException';
import ManagerGetOrder from './dto/manager-get-order.dto';
import GetOrderWithIdDto from '../orders/dto/get-order-with.id.dto';
import ManagerGetOrderQuery from './dto/manager-get-order-query.dto';
import objectToQueryString from '../../../../../package/objectToQuery';
import ManagerGetUserDto from './dto/manager-get-user.dto';

export default class FetchManager {
  static async getOrders(query: ManagerGetOrderQuery = {}) {
    const result = await FetchBackend(
      'access',
      'GET',
      `manager/orders${objectToQueryString(query)}`,
    );
    const response = result.response;

    if (response.status === 200) {
      const json: ManagerGetOrder = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getOrderById(id: string) {
    const result = await FetchBackend('access', 'GET', `manager/orders/${id}`);
    const response = result.response;

    if (response.status === 200) {
      const json: GetOrderWithIdDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getUserById(id: number) {
    const result = await FetchBackend('access', 'GET', `manager/users/${id}`);
    const response = result.response;

    if (response.status === 200) {
      const json: ManagerGetUserDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
