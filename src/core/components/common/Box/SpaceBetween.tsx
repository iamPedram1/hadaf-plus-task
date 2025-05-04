import * as React from 'react';

// Core Components
import Flex from 'core/components/base/Flex';

// Custom Types
import type { FlexProps } from 'core/components/base/Flex';

interface SpaceBetweenProps extends FlexProps {}

const SpaceBetween: React.FC<SpaceBetweenProps> = (props) => {
  // Props
  const { children, ...otherProps } = props;

  // Render
  return (
    <Flex justify='space-between' {...otherProps}>
      {children}
    </Flex>
  );
};

export default SpaceBetween;
