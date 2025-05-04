import * as React from 'react';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';

// Custom Hooks
import { useUpdateEffect } from 'core/hooks/utils';

// Core Components
import Drawer from 'core/components/base/Drawer';
import Button from 'core/components/base/Button';
import Input from 'core/components/base/Input';
import Checkbox from 'core/components/base/Checkbox';
import Typography from 'core/components/base/Typography';

// Common Components
import SpaceBetween from 'core/components/common/Box/SpaceBetween';
import ColumnBox from 'core/components/common/Box/ColumnBox';
import RowBox from 'core/components/common/Box/RowBox';

// Context
import { useNotificationContext } from 'core/store/contexts/Notification';

// Custom Utilities
import { sanitizeString } from 'core/utilities/helper/sanitize';
import { isValidUrl } from 'core/utilities/helper/validation';
import {
  useAddDomainMutation,
  useLazyGetDomainQuery,
  useUpdateDomainMutation,
} from 'core/store/services/domains';

// Custom Types
import type { DomainDataProps, DomainProps } from 'core/types/domain';

interface DomainDrawerProps {
  open: boolean;
  domainId: string;
  onClose: () => void;
}

const DomainDrawer: React.FC<DomainDrawerProps> = (props) => {
  // Props
  const { open = false, domainId = '', onClose } = props;
  const mode = domainId ? 'update' : 'add';

  // States
  const [getDomain, { currentData: domain }] = useLazyGetDomainQuery();
  const [addDomain, addResult] = useAddDomainMutation();
  const [updateDomain, updateResult] = useUpdateDomainMutation();
  const loading =
    (mode === 'update' && !domain) ||
    addResult.isLoading ||
    updateResult.isLoading;

  // Context
  const { control, reset, handleSubmit } = useFormContext<DomainDataProps>();
  const { onSetNotification } = useNotificationContext();

  // Hooks
  useUpdateEffect(() => {
    if (open && domainId) getDomain(domainId);
  }, [open, mode, domainId]);

  useUpdateEffect(() => {
    if (domain) reset({ ...domain });
  }, [domain]);

  // Utilities
  const onSubmit: SubmitHandler<DomainDataProps> = async (payload) => {
    if (mode === 'update' && !domain) return;

    const domainTitle = sanitizeString(payload.domain).trim();

    if (domainTitle.length === 0) {
      return onSetNotification('error', {
        message: 'Error',
        description: "Domain can't be empty.",
      });
    }

    if (!isValidUrl(domainTitle)) {
      return onSetNotification('error', {
        message: 'Error',
        description: 'Invalid Link',
      });
    }

    if (mode === 'add') {
      addDomain({
        domain: domainTitle,
        createdDate: Math.floor(new Date().getTime() / 1000),
        isActive: true,
        status: 'pending',
      })
        .unwrap()
        .then(() => {
          onSetNotification('success', {
            message: 'Success',
            description: 'Domain created successfully.',
          });
          onClose();
        })
        .catch((err) => err);
    } else {
      updateDomain({
        ...(payload as DomainProps),
        domain: domainTitle,
      })
        .unwrap()
        .then(() => {
          onSetNotification('success', {
            message: 'Success',
            description: 'Domain updated successfully.',
          });
          onClose();
        })
        .catch((err) => err);
    }
  };

  // Render
  return (
    <Drawer open={open} onClose={onClose} closeIcon={false}>
      <SpaceBetween vertical style={{ height: '100%' }}>
        <ColumnBox gap='1.5rem'>
          <Typography.Text style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            {mode === 'update' ? 'Update Domain' : 'Add domain'}
          </Typography.Text>
          <Controller
            control={control}
            name='domain'
            render={({ field }) => (
              <Input
                disabled={loading}
                size='large'
                placeholder='Ex: https://www.bridged.media'
                {...field}
              />
            )}
          />
          {mode === 'update' && (
            <Controller
              control={control}
              name='isActive'
              render={({ field }) => (
                <Checkbox disabled={loading} {...field}>
                  Active
                </Checkbox>
              )}
            />
          )}
        </ColumnBox>
        <RowBox gap='1rem' justify='end'>
          <Button
            disabled={loading}
            size='large'
            type='default'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            size='large'
            type='primary'
          >
            {mode === 'add' ? 'Add' : 'Update'}
          </Button>
        </RowBox>
      </SpaceBetween>
    </Drawer>
  );
};

export default DomainDrawer;
