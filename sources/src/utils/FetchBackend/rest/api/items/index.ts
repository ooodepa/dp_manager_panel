import FetchBackend from './../../../';
import GetItemDto from './dto/get-item.dto';
import HttpException from './../../../HttpException';
import ItemFilterIdsDto from './dto/item-filter-ids.dto';

export default class FetchItems {
  static async filterItemsByIds(dto: ItemFilterIdsDto) {
    const result = await FetchBackend(
      'access',
      'POST',
      'items/filter/ids',
      dto,
    );
    const response = result.response;

    if (response.status === 200) {
      const json: GetItemDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
