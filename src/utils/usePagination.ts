import { useState, useEffect } from 'react';

const usePagination = <T>(items: T[], itemsPerPage: number = 8) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
    console.log("Nueva página actualizada: ", newPage);
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
  };
};

export default usePagination;
