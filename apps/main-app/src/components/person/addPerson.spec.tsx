import { render } from '@testing-library/react';

import AddPerson from './addPerson';

describe('AddPerson', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddPerson />);
    expect(baseElement).toBeTruthy();
  });
});
