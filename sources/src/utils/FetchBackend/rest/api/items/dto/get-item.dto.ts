interface ItemCharacteristicsDto {
  dp_id: number;
  dp_itemId: string;
  dp_characteristicId: number;
  dp_value: string;
}

interface ItemGaleryDto {
  dp_id: number;
  dp_itemId: string;
  dp_photoUrl: string;
}

export default interface GetItemDto {
  dp_name: string;
  dp_model: string;
  dp_cost: number;
  dp_photoUrl: string;
  dp_itemCategoryId: number;
  dp_seoKeywords: string;
  dp_seoDescription: string;
  dp_id: string;
  dp_itemCharacteristics: ItemCharacteristicsDto[];
  dp_itemGalery: ItemGaleryDto[];
}
