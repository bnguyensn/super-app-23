exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  getCursor = () => null,
}) => {
  // Invalid page size -> return empty array
  if (pageSize < 1) return [];

  // No cursor provided -> return the first 'pageSize' (default to 20) results
  if (!cursor) return results.slice(0, pageSize);

  // ----- Let the fun begins! ----- //

  const cursorIndex = results.findIndex((item) => {
    // If an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // If there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // end of list -> don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};
