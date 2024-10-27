import { render, waitFor } from '@testing-library/react';
import PopUp from '../PopUp';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
}));

describe('PopUp Component', () => {
  test('should show popup when "show" is true', async () => {
    render(
      <PopUp 
        title="Success"
        html="Test HTML"
        icon="success"
        confirmButtonText="Close"
        show={true}
      />
    );

    await waitFor(() => expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Success',
      html: 'Test HTML',
      icon: 'success',
      confirmButtonText: 'Close',
    }));
  });

  test('should call onClose when popup is closed', async () => {
    const mockOnClose = jest.fn();
    render(
      <PopUp 
        title="Success"
        html="Test HTML"
        icon="success"
        confirmButtonText="Close"
        show={true}
        onClose={mockOnClose}
      />
    );

    await waitFor(() => {
      const mockResult = { isConfirmed: true };
      (Swal.fire as jest.Mock).mockResolvedValueOnce(mockResult);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
