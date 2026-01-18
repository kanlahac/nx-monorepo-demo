import { render } from '@testing-library/react';

import OrgPopups from './popups';

describe('OrgPopups', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrgPopups />);
    expect(baseElement).toBeTruthy();
  });
});
