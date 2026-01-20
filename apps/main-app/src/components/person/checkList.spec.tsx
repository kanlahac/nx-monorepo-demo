import { render, screen, fireEvent } from '@testing-library/react';
import CheckList from './checkList';
import { usePersonStore } from '../definitions/stores/person-store';

// Mock the Zustand store
jest.mock('../definitions/stores/person-store', () => ({
    usePersonStore: jest.fn()
}));

describe('CheckList Component', () => {
    const mockRemovePerson = jest.fn();
    const mockRemoveAll = jest.fn();
    
    const mockPeople = [
        { id: '1', name: 'John Doe', job: 'Developer', color: 'Blue' },
        { id: '2', name: 'Jane Smith', job: 'Designer', color: 'Pink' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        // Setup the store state for these tests
        (usePersonStore as unknown as jest.Mock).mockReturnValue({
            list: mockPeople,
            removePerson: mockRemovePerson,
            removeAll: mockRemoveAll
        });
    });

    it('should render the table headers correctly', () => {
        render(<CheckList />);
        
        expect(screen.getByText('Name')).toBeDefined();
        expect(screen.getByText('Job')).toBeDefined();
        expect(screen.getByText('Favorite Color')).toBeDefined();
    });

    it('should render the list of people from the store', () => {
        render(<CheckList />);

        expect(screen.getByText('John Doe')).toBeDefined();
        expect(screen.getByText('Jane Smith')).toBeDefined();
        expect(screen.getByText('Developer')).toBeDefined();
        expect(screen.getByText('Designer')).toBeDefined();
    });

    it('should call removePerson with correct ID when delete button is clicked', () => {
        render(<CheckList />);

        // Get all individual delete buttons (the ones inside the table rows)
        // The first button in the component is "Delete all", so we skip that one or find by row
        const rows = screen.getAllByRole('row');
        // row[0] is header, row[1] is John Doe
        const firstRowDeleteBtn = rows[1].querySelector('button');

        if (firstRowDeleteBtn) {
            fireEvent.click(firstRowDeleteBtn);
        }

        expect(mockRemovePerson).toHaveBeenCalledWith('1');
    });

    it('should call removeAll when the "Delete all" button is clicked', () => {
        render(<CheckList />);

        const deleteAllBtn = screen.getByRole('button', { name: /delete all/i });
        fireEvent.click(deleteAllBtn);

        expect(mockRemoveAll).toHaveBeenCalled();
    });

    it('should show an empty table body when the list is empty', () => {
        (usePersonStore as unknown as jest.Mock).mockReturnValue({
            list: [],
            removePerson: mockRemovePerson,
            removeAll: mockRemoveAll
        });

        const { container } = render(<CheckList />);
        const tableBodyRows = container.querySelectorAll('tbody tr');
        
        expect(tableBodyRows.length).toBe(0);
    });
});
