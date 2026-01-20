import { render } from '@testing-library/react';

import CheckList from './checkList';

describe('CheckList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckList />);
    expect(baseElement).toBeTruthy();
  });
});
