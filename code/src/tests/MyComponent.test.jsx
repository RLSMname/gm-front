import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';
import { it, describe, expect } from 'vitest';
it('My component renders properly', () => {
   const item={name:"item"};
   render(<MyComponent item={item}></MyComponent>);
   expect(screen.getByText('Name: item')).toBeInTheDocument();
});



