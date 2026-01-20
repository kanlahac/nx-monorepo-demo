import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddPerson from './addPerson';
import { usePersonStore } from '../definitions/stores/person-store';

// 1. Mock the Zustand store
jest.mock('../definitions/stores/person-store', () => ({
  usePersonStore: jest.fn()
}));

describe('AddPerson Component', () => {
  const mockAddPerson = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the return value of the store hook
    (usePersonStore as unknown as jest.Mock).mockReturnValue({
      addPerson: mockAddPerson,
    });
  });

  it('should render all input fields', () => {
    render(<AddPerson />);
    
    expect(screen.getByPlaceholderText(/Name/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Job/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Favorite color/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /add/i })).toBeDefined();
  });

  it('should show validation errors when submitting empty fields', async () => {
    render(<AddPerson />);
    
    const submitBtn = screen.getByRole('button', { name: /add/i });
    fireEvent.click(submitBtn);

    // We use findByText because React Hook Form validation is asynchronous
    expect(await screen.findAllByText(/It's required/i)).toHaveLength(3);
    expect(mockAddPerson).not.toHaveBeenCalled();
  });

  it('should call addPerson and reset form on valid submission', async () => {
    render(<AddPerson />);

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Job/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByPlaceholderText(/Favorite color/i), { target: { value: 'Blue' } });

    const submitBtn = screen.getByRole('button', { name: /add/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockAddPerson).toHaveBeenCalledWith(expect.objectContaining({
        name: 'John Doe',
        job: 'Developer',
        color: 'Blue'
      }));
    });

    // Check if form reset (inputs should be empty)
    expect((screen.getByPlaceholderText(/Name/i) as HTMLInputElement).value).toBe('');
  });
});
