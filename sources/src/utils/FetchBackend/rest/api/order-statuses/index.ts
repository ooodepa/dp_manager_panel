import FetchBackend from './../../../';
import HttpException from './../../../HttpException';
import GetOrderStatusDto from './dto/get-order-status.dto';

export default class FetchOrderStatuses {
  static async get(id: string) {
    const result = await FetchBackend(
      'none',
      'GET',
      `order-statuses/${id}`,
      {},
    );
    const response = result.response;

    if (response.status === 200) {
      const json: GetOrderStatusDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
