import { render, screen, fireEvent } from '@testing-library/react';
import Dock from './dock';
import { usePopup } from '@libs/popups';


jest.mock('@libs/popups', () => ({
  usePopup: jest.fn()
}));

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => <div data-testid="dynamic-mock" />;
  return DynamicComponent;
});

describe('Dock Component', () => {
  const mockAddPopup = jest.fn();
  const mockCloseAll = jest.fn();
  const mockMaximizeAll = jest.fn();
  const mockMinimizeAll = jest.fn();
  const mockSplitAll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    (usePopup as jest.Mock).mockReturnValue({
      addPopup: mockAddPopup,
      closeAll: mockCloseAll,
      maximizeAll: mockMaximizeAll,
      minimizeAll: mockMinimizeAll,
      splitAll: mockSplitAll,
    });
  });

  it('should call addPopup when clicking "Add person"', () => {
    render(<Dock />);
    
    const addButton = screen.getByText(/Add person/i).closest('button');
    if (addButton) fireEvent.click(addButton);

    expect(mockAddPopup).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Add person',
      })
    );
  });

  it('should call addPopup with "Check person list" when clicked', () => {
    render(<Dock />);
    
    const listButton = screen.getByText(/Check List/i).closest('button');
    if (listButton) fireEvent.click(listButton);

    expect(mockAddPopup).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Check person list',
      })
    );
  });

  it('should call closeAll when "Close all" button is clicked', () => {
    render(<Dock />);
    
    const closeAllBtn = screen.getByText(/Close all/i);
    fireEvent.click(closeAllBtn);

    expect(mockCloseAll).toHaveBeenCalled();
  });

  it('should call splitAll when "Split all" button is clicked', () => {
    render(<Dock />);
    
    const splitBtn = screen.getByText(/Split all/i);
    fireEvent.click(splitBtn);

    expect(mockSplitAll).toHaveBeenCalled();
  });
});