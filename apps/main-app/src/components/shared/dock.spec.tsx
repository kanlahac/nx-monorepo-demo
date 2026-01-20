import { render } from '@testing-library/react';

import Dock from './dock';

describe('Dock', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dock />);
    expect(baseElement).toBeTruthy();
  });
});
