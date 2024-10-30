import { renderHook, act } from '@testing-library/react';
import usePagination from '../pagination'; 

describe('usePagination', () => {
  const items = Array.from({ length: 20 }, (_, i) => i + 1); 

  test('should initialize with the correct initial values', () => {
    const { result } = renderHook(() => usePagination(items, 5));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(4);
    expect(result.current.currentItems).toEqual([1, 2, 3, 4, 5]);
  });

  test('should update current page and current items when goToPage is called', () => {
    const { result } = renderHook(() => usePagination(items, 5));

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual([6, 7, 8, 9, 10]);

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentItems).toEqual([11, 12, 13, 14, 15]);
  });

  test('should reset to page 1 when items change', () => {
    const { result, rerender } = renderHook(
      ({ items, itemsPerPage }) => usePagination(items, itemsPerPage),
      { initialProps: { items, itemsPerPage: 5 } }
    );

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual([6, 7, 8, 9, 10]);

    const newItems = Array.from({ length: 15 }, (_, i) => i + 1); 
    rerender({ items: newItems, itemsPerPage: 5 });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentItems).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle invalid page numbers correctly', () => {
    const { result } = renderHook(() => usePagination(items, 5));

    act(() => {
      result.current.goToPage(-1);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentItems).toEqual([1, 2, 3, 4, 5]);

    act(() => {
      result.current.goToPage(10);
    });

    expect(result.current.currentPage).toBe(4);
    expect(result.current.currentItems).toEqual([16, 17, 18, 19, 20]);
  });
});
