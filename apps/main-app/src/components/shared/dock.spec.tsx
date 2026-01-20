// import { render } from '@testing-library/react';

// import Dock from './dock';

// describe('Dock', () => {
//   it('should render successfully', () => {
//     const { baseElement } = render(<Dock />);
//     expect(baseElement).toBeTruthy();
//   });
// });

import { render, screen, fireEvent } from '@testing-library/react';
import Dock from './dock';
import { usePopup } from '@libs/popups';

// 1. Mock the usePopup hook from your NX library
jest.mock('@libs/popups', () => ({
  usePopup: jest.fn()
}));

describe('Dock Component', () => {
  const mockAddPopup = jest.fn();
  const mockCloseAll = jest.fn();
  const mockMaximizeAll = jest.fn();
  const mockMinimizeAll = jest.fn();
  const mockSplitAll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // 2. Provide mock implementations for the hook
    (usePopup as jest.Mock).mockReturnValue({
      addPopup: mockAddPopup,
      closeAll: mockCloseAll,
      maximizeAll: mockMaximizeAll,
      minimizeAll: mockMinimizeAll,
      splitAll: mockSplitAll,
    });
  });

  it('should render all main dock buttons', () => {
    render(<Dock />);
    
    expect(screen.getByText(/Add person/i)).toBeDefined();
    expect(screen.getByText(/Check List/i)).toBeDefined();
    expect(screen.getByText(/Change theme/i)).toBeDefined();
    expect(screen.getByText(/Tools/i)).toBeDefined();
  });

  it('should call addPopup with "Add new person" configuration when clicked', () => {
    render(<Dock />);
    
    const addButton = screen.getByText(/Add person/i);
    fireEvent.click(addButton);

    expect(mockAddPopup).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Add new person',
      })
    );
  });

  it('should call addPopup with "Check person list" configuration when clicked', () => {
    render(<Dock />);
    
    const listButton = screen.getByText(/Check List/i);
    fireEvent.click(listButton);

    expect(mockAddPopup).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Check person list',
      })
    );
  });

  it('should call tools functions (Close all) when clicked in the dropdown', () => {
    render(<Dock />);
    
    const closeAllBtn = screen.getByText(/Close all/i);
    fireEvent.click(closeAllBtn);

    expect(mockCloseAll).toHaveBeenCalled();
  });

  it('should call maximizeAll when the maximize button is clicked', () => {
    render(<Dock />);
    
    const maximizeBtn = screen.getByText(/Maximize all/i);
    fireEvent.click(maximizeBtn);

    expect(mockMaximizeAll).toHaveBeenCalled();
  });
});