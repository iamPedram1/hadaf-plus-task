import * as React from 'react';

// Core Components
import Button from 'core/components/base/Button';

// Icon Components
import PlusOutlinedIcon from 'core/components/icon/PlusOutlined';

// Custom Types
import type { ButtonProps } from 'core/components/base/Button';

interface AddButtonProps extends ButtonProps {}

const AddButton: React.FC<AddButtonProps> = (props) => {
  // Props
  const {
    children,
    iconPosition = 'start',
    icon = <PlusOutlinedIcon />,
    ...otherProps
  } = props;

  // Render
  return (
    <Button iconPosition={iconPosition} icon={icon} {...otherProps}>
      {children}
    </Button>
  );
};

export default AddButton;
