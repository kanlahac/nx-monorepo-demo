// import { render } from '@testing-library/react';

// import Themes from './themes';

// describe('Themes', () => {
//   it('should render successfully', () => {
//     const { baseElement } = render(<Themes />);
//     expect(baseElement).toBeTruthy();
//   });
// });

import { render, screen, fireEvent } from '@testing-library/react';
import Themes from './themes';
import { useThemeStore } from '../definitions/stores/themes-store';

// 1. Mock the Theme Store
jest.mock('../definitions/stores/themes-store', () => ({
    useThemeStore: jest.fn()
}));

describe('Themes Component', () => {
    const mockSetTheme = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        
        // 2. Default store state
        (useThemeStore as unknown as jest.Mock).mockReturnValue({
            setTheme: mockSetTheme,
            current: 'light'
        });
    });

    it('should render all theme options', () => {
        render(<Themes />);
        
        // We check for a few key themes from your list
        expect(screen.getByLabelText('light')).toBeDefined();
        expect(screen.getByLabelText('dark')).toBeDefined();
        expect(screen.getByLabelText('cyberpunk')).toBeDefined();
        expect(screen.getByLabelText('sunset')).toBeDefined();
    });

    it('should mark the current theme as checked', () => {
        (useThemeStore as unknown as jest.Mock).mockReturnValue({
            setTheme: mockSetTheme,
            current: 'dracula'
        });

        render(<Themes />);

        const draculaOption = screen.getByLabelText('dracula') as HTMLInputElement;
        expect(draculaOption.checked).toBe(true);

        const lightOption = screen.getByLabelText('light') as HTMLInputElement;
        expect(lightOption.checked).toBe(false);
    });

    it('should call setTheme with the correct value when a new theme is selected', () => {
        render(<Themes />);

        const synthwaveOption = screen.getByLabelText('synthwave');
        
        // Use fireEvent.click or fireEvent.change for radio buttons
        fireEvent.click(synthwaveOption);

        expect(mockSetTheme).toHaveBeenCalledWith('synthwave');
    });

    it('should have the correct number of theme options', () => {
        render(<Themes />);
        
        const radioButtons = screen.getAllByRole('radio');
        expect(radioButtons).toHaveLength(32); // Matches the count in your Themes array
    });
});