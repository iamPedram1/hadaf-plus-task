import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

// Core Components
import Input from 'core/components/base/Input';

// Icon Components
import SearchOutlinedIcon from 'core/components/icon/SearchOutlined';

// Custom Utilities
import { debounce, sanitizeString } from 'core/utilities/helper';

// Custom Types
interface SearchbarProps {}

interface SearchBarFormProps {
  title: string;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
  // States
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, setValue } = useForm<SearchBarFormProps>({
    defaultValues: { title: searchParams.get('title') || '' },
  });

  // Utilities
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = sanitizeString(event.target.value.trim());
    setValue('title', title);
    if (title.length === 0) searchParams.delete('title');
    else searchParams.set('title', title);
    setSearchParams(searchParams);
  };

  const debounceUpdate = debounce(handleChange, 1000);

  // Render
  return (
    <Controller
      control={control}
      name='title'
      rules={{ onChange: debounceUpdate }}
      render={({ field }) => (
        <Input
          prefix={<SearchOutlinedIcon />}
          size='large'
          placeholder='Search'
          {...field}
        />
      )}
    />
  );
};

export default Searchbar;
