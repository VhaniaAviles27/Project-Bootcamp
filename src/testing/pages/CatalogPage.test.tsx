import { render, screen, fireEvent } from '@testing-library/react';
import CatalogPage from '../../pages/CatalogPage';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { useFetchCategories } from '../../hooks/useFetchCategories';
import { useCartContext } from '../../hooks/cartContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useFetchProducts');
jest.mock('../../hooks/useFetchCategories');
jest.mock('../../hooks/cartContext');

describe('CatalogPage Component', () => {
  beforeEach(() => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      products: [
        { id: 1, title: 'Product 1', thumbnail: 'img1.jpg', stock: 10, price: 100 },
        { id: 2, title: 'Product 2', thumbnail: 'img2.jpg', stock: 20, price: 200 },
      ],
      loading: false,
      error: null,
      filterBySearch: jest.fn(),
      filterByCategory: jest.fn(),
    });

    (useFetchCategories as jest.Mock).mockReturnValue({
      categories: [
        { slug: 'category1', name: 'Category 1' },
        { slug: 'category2', name: 'Category 2' },
      ],
      error: null,
    });

    (useCartContext as jest.Mock).mockReturnValue({
      state: { cart: [{ id: 1, quantity: 1, price: 100 }] },
      dispatch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render CatalogPage with products and categories', () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.getByText('PRODUCTOS')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });
  
  test('should call filterByCategory when a category is selected', () => {
    const { filterByCategory } = useFetchProducts() as any;

    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'category1' } });

    expect(filterByCategory).toHaveBeenCalledWith('category1');
  });

  test('should add product to cart when "Add to cart" button is clicked', () => {
    const { dispatch } = useCartContext() as any;

    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    const addButton = screen.getAllByText('Add to cart')[0];
    fireEvent.click(addButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_PRODUCT',
      product: { id: 1, title: 'Product 1', thumbnail: 'img1.jpg', stock: 10, price: 100 },
    });
  });
});
