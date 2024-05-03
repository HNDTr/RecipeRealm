import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar component', () => {
    before
  test('renders properly', () => {
    const handleSearch = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onSearch={handleSearch}/>);
    const inputElement = getByPlaceholderText('Search for Recipe');
    expect(inputElement).toBeInTheDocument();
  });

  test('handles search input correctly', () => {
    const handleSearch = jest.fn();
    const { getByPlaceholderText, getByRole } = render(<SearchBar onSearch={handleSearch} />);
    const inputElement = getByPlaceholderText('Search for Recipe');
    fireEvent.change(inputElement, { target: { value: 'Test Search' } });
    fireEvent.click(getByRole('button')); // Click the search button
    expect(handleSearch).toHaveBeenCalledWith('Test Search');
  });


});
