import FetchBackend from '../../..';
import HttpException from '../../../HttpException';

export default class FetchUsers {
  static async isManager() {
    const result = await FetchBackend('access', 'POST', 'users/is-manager');
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    if (response.status === 403) {
      throw new HttpException(result.method, response);
      // return false;
    }

    throw new HttpException(result.method, response);
  }
}
