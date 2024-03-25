import React, { useState } from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import FormElement from '../forms/FormElement';
import { describe,expect,it} from 'vitest';




describe('FormElement component', () => {
  it('renders form fields properly', () => {

    render(<FormElement itemList={[]} setList={() => {}} />);
    
    const nameInput = screen.getByPlaceholderText('Name');
    expect(nameInput).toBeInTheDocument();

    const producerInput = screen.getByPlaceholderText('Developer');
    expect(producerInput).toBeInTheDocument();

    const priceInput = screen.getByPlaceholderText('Price');
    expect(priceInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });
});


describe('FormElement', () => {
    it('adds an item when form is submitted', () => {
      // Mock function for setList
      const mockSetList = () => {}; // Mock function

      // Render the FormElement component
      render(<FormElement itemList={[]} setList={mockSetList} />);
      
      // Fill out form fields
      const nameInput = screen.getByPlaceholderText('Name');
      fireEvent.change(nameInput, { target: { value: 'Test Name' } });
  
      const producerInput = screen.getByPlaceholderText('Developer');
      fireEvent.change(producerInput, { target: { value: 'Test Developer' } });
  
      const priceInput = screen.getByPlaceholderText('Price');
      fireEvent.change(priceInput, { target: { value: '10' } });
  
      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
  
      // Check if the form submitted correctly (add functionality)
      // Your assertion logic here...
    });
  });