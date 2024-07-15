import React, { useState, useEffect } from 'react';
import './MultiSelectDropdown.css'; // Ensure to create and import the CSS file
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TextField } from '@mui/material'; 
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const MultiSelectDropdown = ({ label, selectedItems, onChange, options, disabled }) => {
  const [items, setItems] = useState(selectedItems || []);
  const [dropdownOptions, setDropdownOptions] = useState(options || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setItems(selectedItems || []);
    setDropdownOptions(options || []);
  }, [selectedItems, options]);

  const handleAddClick = () => {
    if (disabled) return;
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    if (items.includes(option)) return;

    const updatedItems = [...items, option];
    setItems(updatedItems);
    onChange(updatedItems);
    setIsDropdownOpen(false);
  };

  const handleRemoveClick = (option) => {
    const updatedItems = items.filter(item => item !== option);
    setItems(updatedItems);
    onChange(updatedItems);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = dropdownOptions.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className = 'multiSelectDropdown'>
    <div className={`ui-dropdownlist ${disabled ? 'ui-disabled' : ''}`}>
      <label>{label}</label>
      <div className="ui-dropdownlist-values">
        <div
          className={`ui-dropdownlist-add ${isDropdownOpen ? 'open' : ''}`}
          onClick={handleAddClick}
        >
          {isDropdownOpen ? (
            <TextField
               variant="filled"
              id="filled-basic"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              sx = {{height: '100%', width: '100%', fontSize: '1', backgroundColor: 'white'}}
            />
          ) : (
            <div className = "addItem">
              <p>Add an item</p>
              <span className="ui-dropdownlist-control"><ArrowDropDownIcon /></span>
            </div>
          )}
        </div>
         {isDropdownOpen && (
          <div className="ui-dropdownlist-dropdown">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option}
                  className="ui-dropdownlist-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="ui-dropdownlist-option">No options found</div>
            )}
          </div>
        )}
        <div className="ui-dropdownlist-items">
          {items.map(item => (
            <div key={item} className="ui-dropdownlist-item" data-id={item}>
              {item}
              <span className="ui-dropdownlist-control ui-dropdownlist-remove" onClick={() => handleRemoveClick(item)}>
                <CloseRoundedIcon sx = {{fontSize: '15px'}} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MultiSelectDropdown;
