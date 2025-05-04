import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { green, red } from '@ant-design/colors';
import { ColumnType } from 'antd/es/table';

// Core Components
import Table from 'core/components/base/Table';
import Button from 'core/components/base/Button';
import Typography from 'core/components/base/Typography';

// Common Components
import RowBox from 'core/components/common/Box/RowBox';

// Page Components
import DomainOption from 'core/components/page/DomainOption';

// Icon Components
import ExportOutlinedIcon from 'core/components/icon/ExportOutlined';
import CheckCircleFilledIcon from 'core/components/icon/CheckCircleFilled';
import ExclamationCircleOutlinedIcon from 'core/components/icon/ExclamationCircleOutlined';

// Custom Utilities
import { sanitizeString } from 'core/utilities/helper';
import { useGetDomainsQuery } from 'core/store/services/domains';

// Custom Types
import {
  DomainLabelType,
  DomainProps,
  DomainStatusType,
} from 'core/types/domain';

interface DomainTableColumnProps extends Omit<ColumnType, 'dataIndex'> {
  dataIndex: keyof DomainProps;
}

interface DomainsTableProps {
  onSelectDomain: (domainId: string) => void;
}

const DomainsTable: React.FC<DomainsTableProps> = (props) => {
  // Props
  const { onSelectDomain } = props;

  // Hooks
  const domains = useGetDomainsQuery('domains');
  const [searchParams] = useSearchParams();
  const sort = sanitizeString(searchParams.get('sort') || '');
  const search = sanitizeString(searchParams.get('title') || '');

  const columns: DomainTableColumnProps[] = React.useMemo(
    () => [
      {
        title: 'Domain URL',
        dataIndex: 'domain',
        key: 'domain-url',
        render: (title: string, domain) => (
          <RowBox align='center' gap='.5rem'>
            {(domain as DomainProps).status === 'verified' ? (
              <CheckCircleFilledIcon style={{ color: green[5] }} />
            ) : (
              <ExclamationCircleOutlinedIcon style={{ color: red[5] }} />
            )}
            <Typography.Text className='font-semibold'>{title}</Typography.Text>
            <Button
              type='text'
              icon={<ExportOutlinedIcon />}
              onClick={() => onSelectDomain((domain as DomainProps).id)}
            />
          </RowBox>
        ),
      },
      {
        title: 'Active Status',
        dataIndex: 'isActive',
        key: 'age',
        render: (isActive: boolean) => (
          <Typography.Text
            className='font-semibold'
            type={isActive ? 'success' : 'danger'}
          >
            {isActive ? 'Active' : 'Not Active'}
          </Typography.Text>
        ),
      },
      {
        title: 'Verification Status',
        dataIndex: 'status',
        key: 'verification',
        render: (value: DomainStatusType) => (
          <Typography.Text
            className='font-semibold'
            type={
              value === 'verified'
                ? 'success'
                : value === 'rejected'
                ? 'danger'
                : 'secondary'
            }
          >
            {DomainLabelType[value]}
          </Typography.Text>
        ),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'verification',
        render: (_, domain) => <DomainOption domain={domain as DomainProps} />,
      },
    ],
    [onSelectDomain]
  );
  const dataSource = React.useMemo(() => {
    const data = domains.currentData;
    if (!data) return [];

    let sortedData = sort
      ? [...data].sort((a, b) =>
          sort === 'asc'
            ? a.domain.localeCompare(b.domain)
            : b.domain.localeCompare(a.domain)
        )
      : data;

    if (search) {
      sortedData = sortedData.filter((item) => item.domain.includes(search));
    }

    return sortedData;
  }, [sort, search, domains.currentData]);

  // Render
  return (
    <Table
      loading={domains.isLoading}
      dataSource={dataSource || []}
      columns={columns}
      pagination={false}
    />
  );
};

export default DomainsTable;
