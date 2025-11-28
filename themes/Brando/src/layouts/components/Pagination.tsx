
const Pagination = ({
  section,
  currentPage,
  totalPages,
}: {
  section: string;
  currentPage: number;
  totalPages: number;
}) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <>
      {
        totalPages > 1 && (
          <nav
            className="mt-20 flex items-center justify-center space-x-3 text-lg"
            aria-label="Pagination">
            {/* previous */}
            {hasPrevPage ? (
              <a
                href={
                  indexPageLink
                    ? `${section ? "/" + section : "/"}`
                    : `${section ? "/" + section : ""}/page/${currentPage - 1}`
                }
                className="px-2 py-2 text-text-dark transition-colors duration-300 hover:bg-light rounded-md border">
                <span className="sr-only">Previous</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
              </a>
            ) : (
              <span className="px-2 py-2 text-text-light transition-colors duration-300 rounded-md border border-border/25">
                <span className="sr-only">Previous</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
              </span>
            )}

            {/* page index */}
            {pageList.map((pagination, i) =>
              pagination === currentPage ? (
                <span
                  key={i}
                  aria-current="page"
                  className="bg-primary px-4 h-9 flex items-center justify-center text-white rounded-md">
                  {pagination}
                </span>
              ) : (
                <a
                  key={i}
                  href={
                    i === 0
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${pagination}`
                  }
                  aria-current="page"
                  className="px-4 h-9 flex items-center justify-center text-text-dark transition-colors duration-300 hover:bg-primary hover:text-white rounded-md">
                  {pagination}
                </a>
              )
            )}

            {/* next page */}
            {hasNextPage ? (
              <a
                href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
                className="px-2 py-2 text-text-dark transition-colors duration-300 hover:bg-light rounded-md border">
                <span className="sr-only">Next</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </a>
            ) : (
              <span className="px-2 py-2 text-text-light rounded-md">
                <span className="sr-only">Next</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </span>
            )}
          </nav>
        )
      }
    </>
  );
};

export default Pagination;
