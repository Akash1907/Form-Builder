import React, { useState, useEffect } from "react";
import "./SwitchBtn.css";

const SwitchBtn = ({ label, description, align, border, disabled, required, onChange }) => {
  const [checked, setChecked] = useState(false);
  const [focused, setFocused] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (required) {
      setInvalid(!checked);
    }
  }, [checked, required]);

  const handleClick = () => {
    if (!disabled) {
      setChecked(!checked);
      if (onChange) onChange(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (!disabled && e.key === ' ') {
      e.preventDefault();
      setChecked(!checked);
      if (onChange) onChange(!checked);
    }
  };

  const handleFocus = (isFocused) => {
    if (!disabled) {
      setFocused(isFocused);
    }
  };

  const switchButtonClass = `switch-button ${checked ? 'switch-button-checked' : ''} ${focused ? 'switch-button-focused' : ''} ${invalid ? 'switch-button-invalid' : ''} ${disabled ? 'ui-disabled' : ''} ${align ? `switch-button-align-${align}` : ''} ${border ? 'switch-button-border' : ''}`;

  return (
    <div className={switchButtonClass}>
      <div className="switch-button-label" onClick={handleClick}>
        <span>{label}</span>
        {description && <span>{description}</span>}
      </div>
      <label
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
      >
        <div className="switch-button-slider"></div>
      </label>
    </div>
  );
};

export default SwitchBtn;