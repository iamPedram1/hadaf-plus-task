import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Custom Hooks
import { useBoolean } from 'core/hooks/state';

// Common Components
import RowBox from 'core/components/common/Box/RowBox';
import AddButton from 'core/components/common/Button/Add';
import ColumnBox from 'core/components/common/Box/ColumnBox';
import SpaceBetween from 'core/components/common/Box/SpaceBetween';

// Page Components
import Sort from 'core/components/page/Sort';
import DomainsTable from 'core/components/page/Table';
import Searchbar from 'core/components/page/Searchbar';
import DomainDrawer from 'core/components/page/DomainDrawer';

// Custom Types
import type { DomainDataProps } from 'core/types/domain';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  // States
  const openDomainDrawer = useBoolean();
  const [selectedDomainId, setSelectedDomainId] = React.useState('');

  // Hooks
  const formMethods = useForm<DomainDataProps>();

  // Utilities
  const handleClose = () => {
    formMethods.reset({ domain: '' });
    setSelectedDomainId('');
    openDomainDrawer.setFalse();
  };

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomainId(domainId);
    openDomainDrawer.setTrue();
  };

  // Render
  return (
    <>
      <ColumnBox gap='1rem'>
        <SpaceBetween>
          <AddButton
            onClick={openDomainDrawer.setTrue}
            variant='filled'
            type='primary'
          >
            Add Domain
          </AddButton>
          <RowBox gap='1rem'>
            <Sort />
            <Searchbar />
          </RowBox>
        </SpaceBetween>
        <DomainsTable onSelectDomain={handleSelectDomain} />
      </ColumnBox>
      <FormProvider {...formMethods}>
        <DomainDrawer
          open={openDomainDrawer.state}
          onClose={handleClose}
          domainId={selectedDomainId}
        />
      </FormProvider>
    </>
  );
};

export default HomePage;
