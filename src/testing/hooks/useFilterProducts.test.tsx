import { renderHook, act } from '@testing-library/react';
import { useFilterProducts } from '../../hooks/useFilterProducts'; // Ajusta la ruta si es necesario
import { Product } from '../../models/Product';

const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', description: 'Description 1', category: 'Category 1', price: 10, stock: 10, thumbnail: '', quantity: 1 },
  { id: 2, title: 'Product 2', description: 'Description 2', category: 'Category 2', price: 20, stock: 20, thumbnail: '', quantity: 2 },
];

describe('useFilterProducts', () => {
  it('should initialize with the provided products', () => {
    const { result } = renderHook(() => useFilterProducts(mockProducts));
    expect(result.current.filteredProducts).toEqual(mockProducts);
  });

  it('should filter products by search term', () => {
    const { result } = renderHook(() => useFilterProducts(mockProducts));
    act(() => {
      result.current.filterBySearch('Product 1');
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[0]]);
    act(() => {
      result.current.filterBySearch('Description 2');
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[1]]);
  });

  it('should filter products by category', () => {
    const { result } = renderHook(() => useFilterProducts(mockProducts));
    act(() => {
      result.current.filterByCategory('Category 1');
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[0]]);
    act(() => {
      result.current.filterByCategory('Category 2');
    });

    expect(result.current.filteredProducts).toEqual([mockProducts[1]]);
  });

  it('should reset filters when search term or category is empty', () => {
    const { result } = renderHook(() => useFilterProducts(mockProducts));

    act(() => {
      result.current.filterBySearch('Product 1');
    });

    expect(result.current.filteredProducts).toEqual([mockProducts[0]]);

    act(() => {
      result.current.filterBySearch('');
    });

    expect(result.current.filteredProducts).toEqual(mockProducts);

    act(() => {
      result.current.filterByCategory('Category 1');
    });

    expect(result.current.filteredProducts).toEqual([mockProducts[0]]);

    act(() => {
      result.current.filterByCategory('');
    });

    expect(result.current.filteredProducts).toEqual(mockProducts);
  });
});
