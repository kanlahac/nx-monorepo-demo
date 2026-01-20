/* eslint-disable @typescript-eslint/no-explicit-any */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PopupsProvider } from './popups-provider';
import { usePopup } from './usePopup';

vi.mock('./usePopup', () => ({
    usePopup: vi.fn()
}));

class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}

(globalThis as any).ResizeObserver = ResizeObserverMock;

describe('PopupsProvider - Functional Tests', () => {
    const mockUpdateLayout = vi.fn();
    const mockClosePopup = vi.fn();
    const mockMaximizePopup = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all active popups from the store', () => {
        (usePopup as any).mockReturnValue({
            instances: [
                { id: '1', title: 'Window A', children: <div data-testid="content-a">Content A</div> },
                { id: '2', title: 'Window B', children: <div data-testid="content-b">Content B</div> }
            ],
            layout: [],
            updateLayout: mockUpdateLayout,
            closePopup: mockClosePopup,
            maximizePopup: mockMaximizePopup,
            minimizePopup: vi.fn(),
            splitPopup: vi.fn(),
        });

        render(<PopupsProvider />);

        expect(screen.getByText('Window A')).toBeDefined();
        expect(screen.getByText('Window B')).toBeDefined();
        expect(screen.getByTestId('content-a')).toBeDefined();
    });

    it('should call closePopup with the correct ID when clicking close', () => {
        (usePopup as any).mockReturnValue({
            instances: [{ id: '99', title: 'Window to Close', children: <div>Bye</div> }],
            layout: [],
            updateLayout: mockUpdateLayout,
            closePopup: mockClosePopup,
            maximizePopup: vi.fn(),
            minimizePopup: vi.fn(),
            splitPopup: vi.fn(),
        });

        render(<PopupsProvider />);

        const buttons = screen.getAllByRole('button');
        const closeBtn = buttons[buttons.length - 1]; 
        fireEvent.click(closeBtn);

        expect(mockClosePopup).toHaveBeenCalledWith('99');
    });

    it('should not render anything if there are no instances', () => {
        (usePopup as any).mockReturnValue({
            instances: [],
            layout: [],
            updateLayout: mockUpdateLayout,
        });

        const { container } = render(<PopupsProvider />);
        
        const cards = (container as unknown as HTMLElement).querySelectorAll('.card');
        expect(cards.length).toBe(0);
    });
});