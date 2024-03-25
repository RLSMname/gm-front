import React from 'react';
import { render} from '@testing-library/react';
import { MemoryRouter, Route,Routes } from 'react-router-dom';
import Info from '../pages//Info';
import { describe,expect,it} from 'vitest';

describe('Info component', () => {
  it('renders information correctly with state', () => {
    const testState = {id:10,name:'Test String',developer:'d',price:10,description:'d'};
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/test', state: { item: testState } }]}>
        <Routes>
        <Route path="/test" element={<Info />} />
        
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Name:Test String')).toBeInTheDocument();
    expect(getByText('Developer:d')).toBeInTheDocument();
    expect(getByText('Description:d')).toBeInTheDocument();
    expect(getByText('Price:10')).toBeInTheDocument();
    
  });
});