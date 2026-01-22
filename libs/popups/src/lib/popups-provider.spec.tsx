/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PopupsProvider } from './popups-provider';
import { usePopup } from './usePopup';

vi.mock('react-grid-layout/legacy', () => ({
    Responsive: ({ children }: any) => <div>{children}</div>,
    WidthProvider: (Component: any) => Component,
}));

vi.mock('./usePopup', () => ({
    usePopup: vi.fn()
}));

globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe('PopupsProvider - Functional Tests', () => {
    const mockUpdateLayout = vi.fn();
    const mockClosePopup = vi.fn();
    const mockSetGridMode = vi.fn();
    const mockSetInFront = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the "Select a popup" empty state when no instances exist', () => {
        (usePopup as any).mockReturnValue({
            instances: [],
            gridMode: false,
            layout: [],
        });

        render(<PopupsProvider />);
        
        expect(screen.getByText(/Select a popup/i)).toBeDefined();
        expect(screen.getByText(/From the dock/i)).toBeDefined();
    });

    it('should call closePopup with correct ID', () => {
        (usePopup as any).mockReturnValue({
            instances: [{ id: '99', title: 'Window to Close', children: <div>Bye</div> }],
            layout: [],
            gridMode: false,
            closePopup: mockClosePopup,
            setInFront: mockSetInFront,
            updateLayout: mockUpdateLayout,
            maximizePopup: vi.fn(),
            minimizePopup: vi.fn(),
            splitPopup: vi.fn(),
        });

        render(<PopupsProvider />);

        const closeBtns = screen.getAllByRole('button');
        fireEvent.click(closeBtns[3]); // El índice 3 es el botón de Close

        expect(mockClosePopup).toHaveBeenCalledWith('99');
    });

    it('should toggle grid mode when checkbox is clicked', () => {
        (usePopup as any).mockReturnValue({
            instances: [],
            gridMode: false,
            setGridMode: mockSetGridMode,
        });

        render(<PopupsProvider />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockSetGridMode).toHaveBeenCalled();
    });

    it('should call setInFront when clicking on a popup window', () => {
        (usePopup as any).mockReturnValue({
            instances: [{ id: '1', title: 'Window A', isInFront: false }],
            layout: [],
            setInFront: mockSetInFront,
        });

        render(<PopupsProvider />);
        
        const windowTitle = screen.getByText('Window A');
        fireEvent.click(windowTitle);

        expect(mockSetInFront).toHaveBeenCalledWith('1');
    });
});