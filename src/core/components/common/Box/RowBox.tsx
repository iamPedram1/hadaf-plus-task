import * as React from 'react';

// Core Components
import Flex from 'core/components/base/Flex';

// Custom Types
import type { FlexProps } from 'core/components/base/Flex';

interface RowBoxProps extends FlexProps {}

const RowBox: React.FC<RowBoxProps> = (props) => {
  // Props
  const { children, ...otherProps } = props;

  // Render
  return <Flex {...otherProps}>{children}</Flex>;
};

export default RowBox;
