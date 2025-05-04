import * as React from 'react';

// Core Components
import Flex from 'core/components/base/Flex';

// Custom Types
import type { FlexProps } from 'core/components/base/Flex';

interface ColumnBoxProps extends FlexProps {}

const ColumnBox: React.FC<ColumnBoxProps> = (props) => {
  // Props
  const { children, ...otherProps } = props;

  // Render
  return (
    <Flex vertical {...otherProps}>
      {children}
    </Flex>
  );
};

export default ColumnBox;
