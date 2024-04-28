import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import FilterDropdown from '../components/FilterDropdown'; 

describe('FilterDropdown Correct text output', () => {
  test('renders with correct title', () => {
    const { getByText } = render(
      <FilterDropdown
        title="Test Dropdown"
        options={['Option 1', 'Option 2']}
        onSelect={() => {}}
      />
    );

    expect(getByText('Test Dropdown')).toBeInTheDocument();
  });

  test('Correct options are displayed', async () => {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    const { getByText } = render(
      <FilterDropdown
        title="Test Dropdown"
        options={options}
        onSelect={() => {}}
      />
    );
  
    // Find and click on the dropdown button to open the dropdown
    const dropdownButton = screen.getByText("Test Dropdown");
    fireEvent.click(dropdownButton);
  
    // Wait for the options to be rendered (assuming it's async)
    await screen.findByText(options[0]); // Wait for the first option to appear
    
    // Check if all options are present in the document
    options.forEach((optionValue)  => {
      expect(getByText(optionValue)).toBeInTheDocument();
    });
  });

  test('No options are displayed when closed', () => {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    const { queryByText } = render(
      <FilterDropdown
        title="Test Dropdown"
        options={options}
        onSelect={() => {}}
      />
    );
    options.forEach((optionValue)  => {
        expect(queryByText(optionValue)).not.toBeInTheDocument();
    })

  });


});
