import FetchBackend from './../../../';
import HttpException from './../../../HttpException';
import ManagerGetOrder from './dto/manager-get-order.dto';
import ManagerGetUserDto from './dto/manager-get-user.dto';
import GetOrderWithIdDto from '../orders/dto/get-order-with.id.dto';
import ManagerGetOrderQuery from './dto/manager-get-order-query.dto';
import objectToQueryString from '../../../../../package/objectToQuery';
import ManagerCreateOrderStatus from './dto/manager-create-order-status.dto';

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

  static async createOrderStatus(dto: ManagerCreateOrderStatus) {
    const result = await FetchBackend(
      'access',
      'POST',
      'manager/order-statuses',
      dto,
    );
    const response = result.response;

    if (response.status === 201) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async removeOrderStatus(id: number, orderId: string) {
    const result = await FetchBackend(
      'access',
      'DELETE',
      `manager/order-statuses/${id}/orders/${orderId}`,
    );
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async patchOrderIsCanceledByManager(id: string) {
    const result = await FetchBackend(
      'access',
      'PATCH',
      `manager/orders/${id}/is-canceled`,
    );
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async patchOrderIsSentedByManager(id: string) {
    const result = await FetchBackend(
      'access',
      'PATCH',
      `manager/orders/${id}/is-sented`,
    );
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }
}
