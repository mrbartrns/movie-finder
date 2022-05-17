function validate({ postPerPage, totalItems, offset, currentIndex }) {
  if (isNaN(postPerPage)) throw Error(`postPerPage must be a number.`);
  if (isNaN(totalItems)) throw Error('totalItems must be a number.');
  if (isNaN(offset)) throw Error('offset must be a number');
  if (isNaN(currentIndex)) throw Error('currentIndex must be a number.');
  if (totalItems < 0)
    throw Error('totalItems must be greater than or equal to 0.');
  if (postPerPage < 1) throw Error('postPerPage must be greater than 0.');
  if (currentIndex < 1) throw Error('currentIndex must be greater than 0.');
}

/**
 * endIndex가 startIndex에 종속적이기 때문에, startIndex와 endIndex를 묶어서 반환한다.
 */
function getRange(currentIndex, offset) {
  const startIndex = Math.floor((currentIndex - 1) / offset) * offset;
  const endIndex = startIndex + offset;
  return { startIndex, endIndex };
}

function getLastPage(totalItems, postPerPage) {
  if (totalItems <= 0) return 1;
  return Math.floor((totalItems - 1) / postPerPage) + 1;
}

function paginate(arr, startIndex, endIndex, lastIndex) {
  const end = endIndex < lastIndex ? endIndex : lastIndex;
  for (let i = startIndex; i < end; i += 1) {
    arr.push(i + 1);
  }
}

function getPaginator({ postPerPage, totalItems, offset, currentIndex }) {
  validate({ postPerPage, totalItems, offset, currentIndex });
  const paginator = [];
  const lastPage = getLastPage(totalItems, postPerPage);
  const { startIndex, endIndex } = getRange(currentIndex, offset);
  paginate(paginator, startIndex, endIndex, lastPage);
  return paginator;
}

export { getPaginator, getLastPage };
