import PropTypes from 'prop-types';
import {useState} from 'react';
/*
    FilterDropDown.js

    The layout for a Filter Dropdown.

    Props: 
        title - The title of the filter.
        options - An array of options to appear when the filter is clicked.
        onSelect - A callback function called when an option is selected.
*/


export default function FilterDropdown({ title, options, onSelect }){
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions); // Pass the updated array of selected options to the parent
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-title" onClick={toggleDropdown}>
        {title}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>&#9660;</span>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionSelect(option)}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                readOnly
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

FilterDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

