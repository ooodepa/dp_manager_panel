export default function getNumberSequence(
  page: number,
  totalPage: number,
): number[] {
  const sequence: number[] = [];

  if (page <= 0) {
    page = 1;
  }

  if (page > totalPage && totalPage > 0) {
    sequence.push(totalPage - 2 <= 0 ? 0 : totalPage - 2);
    sequence.push(totalPage - 1 <= 0 ? 0 : totalPage - 1);
    sequence.push(totalPage);
    return sequence.filter(e => e !== 0);
  }

  if (page > totalPage && totalPage < 0) {
    return [];
  }

  sequence.push(page - 3 < 1 ? 0 : 1);

  sequence.push(page - 2 <= 0 ? 0 : page - 2);
  sequence.push(page - 1 <= 0 ? 0 : page - 1);
  sequence.push(page);
  sequence.push(page + 1 < totalPage ? page + 1 : 0);
  sequence.push(page + 2 < totalPage ? page + 2 : 0);

  sequence.push(page + 1 !== totalPage && totalPage !== page ? totalPage : 0);

  if (page + 1 === totalPage) {
    sequence.push(totalPage);
  }

  return sequence.filter(e => e !== 0);
}
