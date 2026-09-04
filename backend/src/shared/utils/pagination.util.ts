export const getPagination = (
  page: number = 1,
  limit: number = 10
) => {
  const currentPage = Math.max(1, page);
  const perPage = Math.min(Math.max(1, limit), 100);

  return {
    page: currentPage,
    limit: perPage,
    skip: (currentPage - 1) * perPage,
  };
};