/** External Dependencies */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { usePhoneScreen } from 'hooks';
import {
  StyledToolsBarItemButton,
  StyledToolsBarItemButtonLabel,
} from './ToolsBar.styled';

const ToolsBarItemButton = ({
  id,
  label,
  onClick,
  Icon,
  isSelected,
  children,
  className,
}) => {
  const isPhoneScreen = usePhoneScreen(320);

  const handleClick = (e) => {
    onClick(id, e);
  };

  return (
    <StyledToolsBarItemButton
      className={className}
      onClick={handleClick}
      aria-selected={isSelected}
      isPhoneScreen={isPhoneScreen}
    >
      {Icon &&
        (typeof Icon === 'string' ? (
          <span dangerouslySetInnerHTML={{ __html: Icon }} />
        ) : (
          <Icon size={isPhoneScreen ? 20 : 16} />
        ))}
      {label && (
        <StyledToolsBarItemButtonLabel isPhoneScreen={isPhoneScreen}>
          {label}
        </StyledToolsBarItemButtonLabel>
      )}
      {children}
    </StyledToolsBarItemButton>
  );
};

ToolsBarItemButton.defaultProps = {
  isSelected: false,
  id: undefined,
  children: null,
  label: '',
  Icon: undefined,
};

ToolsBarItemButton.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  Icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement),
  ]),
};

export default memo(ToolsBarItemButton);
