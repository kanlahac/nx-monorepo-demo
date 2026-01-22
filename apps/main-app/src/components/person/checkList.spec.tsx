import { render, screen, fireEvent } from '@testing-library/react';
import CheckList from './checkList';
import { usePersonStore } from '../definitions/stores/person-store';

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
        (usePersonStore as unknown as jest.Mock).mockReturnValue({
            list: mockPeople,
            removePerson: mockRemovePerson,
            removeAll: mockRemoveAll
        });
    });

    it('should render the list of people with their details', () => {
        render(<CheckList />);

        expect(screen.getByText('John Doe')).toBeDefined();
        expect(screen.getByText('Jane Smith')).toBeDefined();
        expect(screen.getByText('Developer')).toBeDefined();
        expect(screen.getByText('Designer')).toBeDefined();
        expect(screen.getByText('Blue')).toBeDefined();
        expect(screen.getByText('Pink')).toBeDefined();
    });

    it('should format the index correctly (01, 02)', () => {
        render(<CheckList />);
        
        expect(screen.getByText('01')).toBeDefined();
        expect(screen.getByText('02')).toBeDefined();
    });

    it('should call removePerson with correct ID when a specific delete button is clicked', () => {
        render(<CheckList />);

        const deleteButtons = screen.getAllByRole('button');
        // El botón [0] es "Delete all", el [1] es el de John Doe
        fireEvent.click(deleteButtons[1]);

        expect(mockRemovePerson).toHaveBeenCalledWith('1');
    });

    it('should call removeAll when the "Delete all" button is clicked', () => {
        render(<CheckList />);

        const deleteAllBtn = screen.getByText(/Delete all/i);
        fireEvent.click(deleteAllBtn);

        expect(mockRemoveAll).toHaveBeenCalled();
    });

    it('should show empty state message when the list is empty', () => {
        (usePersonStore as unknown as jest.Mock).mockReturnValue({
            list: [],
            removePerson: mockRemovePerson,
            removeAll: mockRemoveAll
        });

        render(<CheckList />);
        
        expect(screen.getByText(/No persons/i)).toBeDefined();
        expect(screen.getByText(/Click in Add person on the dock/i)).toBeDefined();
    });
});