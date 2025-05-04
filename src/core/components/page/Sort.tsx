import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

// Custom Hooks
import { useMount } from 'core/hooks/utils';

// Core Components
import Select from 'core/components/base/Select';

// Custom Utilities
import { sortOptions } from 'core/utilities/data';

// Custom Types
type SortOrder = 'asc' | 'desc';

interface SortProps {}

const Sort: React.FC<SortProps> = (props) => {
  // States
  const [sort, setSort] = React.useState<SortOrder>();

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  useMount(() => {
    const sort = searchParams.get('sort');
    if (sort && ['asc', 'desc'].includes(sort)) setSort(sort as SortOrder);
  });

  // Utilities
  const handleChange = (value: SortOrder) => {
    setSort(value);
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  // Render
  return (
    <Select
      value={sort || null}
      placeholder='Sort'
      size='large'
      onChange={handleChange}
      options={sortOptions}
      style={{ width: 400 }}
    />
  );
};

export default Sort;
