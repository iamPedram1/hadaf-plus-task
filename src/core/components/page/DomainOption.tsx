import * as React from 'react';

// Custom Hooks
import { useBoolean } from 'core/hooks/state';

// Core Components
import Button from 'core/components/base/Button';
import Typography from 'core/components/base/Typography';
import Dropdown from 'core/components/base/Dropdown';

// Context
import { useNotificationContext } from 'core/store/contexts/Notification';

// Icon Components
import MoreOutlinedIcon from 'core/components/icon/MoreOutlined';
import {
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from 'core/store/services/domains';

// Custom Types
import type { DomainProps, DomainStatusType } from 'core/types/domain';
import type { MenuProps } from 'core/components/base/Menu';

interface DomainOptionProps {
  domain: DomainProps;
}

type MenuItem = Required<MenuProps>['items'][number];

const DomainOption = (props: DomainOptionProps) => {
  // Props
  const { domain } = props;

  // States
  const openPopover = useBoolean();

  // Hooks
  const [deleteDomain, deleteResult] = useDeleteDomainMutation();
  const [updateDomain, updateResult] = useUpdateDomainMutation();
  const loading = deleteResult.isLoading || updateResult.isLoading;

  // Context
  const { setNotification } = useNotificationContext();

  // Utilities
  const handleDeleteDomain = React.useCallback(() => {
    deleteDomain(domain.id)
      .unwrap()
      .then(() => {
        setNotification({
          type: 'success',
          message: 'Success',
          description: 'Domain deleted succesfuly.',
        });
      })
      .catch((err) => {
        setNotification({
          type: 'error',
          message: err.status === 404 ? '404 Not Found' : 'Failed',
          description: err?.data || `An error occured in deleting domain`,
        });
      });
  }, [domain]);

  const handleVerifyDomain = React.useCallback(
    (status: DomainStatusType) => {
      updateDomain({ ...domain, status })
        .unwrap()
        .catch((err) => {
          setNotification({
            type: 'error',
            message: 'Failed',
            description: err?.data || `An error occured in updating`,
          });
        });
    },
    [domain]
  );

  const items: MenuItem[] = React.useMemo(
    () => [
      {
        key: `${domain.id}-menu-1`,
        label: 'View pages',
        disabled: true,
        style: { fontWeight: 500 },
      },
      {
        key: `${domain.id}-menu-2`,
        label: (
          <Typography.Link
            onClick={() =>
              handleVerifyDomain(
                domain.status === 'verified' ? 'rejected' : 'verified'
              )
            }
          >
            {domain.status === 'verified' ? 'Reject' : 'Verify'}
          </Typography.Link>
        ),
        style: { fontWeight: 500 },
        disabled: loading,
      },
      {
        key: `${domain.id}-menu-3`,
        label: 'Install script',
        disabled: true,
        style: { fontWeight: 500 },
      },
      {
        key: `${domain.id}-menu-4`,
        label: (
          <Typography.Link onClick={handleDeleteDomain}>Delete</Typography.Link>
        ),
        disabled: loading,
        style: { color: 'red', fontWeight: 500 },
      },
    ],
    [domain, handleVerifyDomain, handleDeleteDomain]
  );

  // Render
  return (
    <Dropdown
      open={openPopover.state}
      arrow={false}
      menu={{ items }}
      trigger={['click']}
      placement='bottomLeft'
      onOpenChange={openPopover.set}
    >
      <Button icon={<MoreOutlinedIcon />} />
    </Dropdown>
  );
};

export default DomainOption;
