import { render, fireEvent, screen,waitFor } from '@testing-library/react';

import { it, describe, expect } from 'vitest';
import Home from '../pages/Home'

it('clicking the "Add" button opens the popup', () => {
  render(<Home itemList={[]} />); // Render the Home component

  // Verify that the popup is not initially visible
  expect(screen.queryByText('Add an item!')).not.toBeInTheDocument();

  // Click the "Add" button
  fireEvent.click(screen.getByText('Add'));

  // Verify that the popup is now visible
  expect(screen.getByText('Add an item!')).toBeInTheDocument();
});




