export type DomainStatusType = 'pending' | 'verified' | 'rejected';

export enum DomainLabelType {
  pending = 'Pending',
  verified = 'Verified',
  rejected = 'Not verified',
}

export interface DomainDataProps {
  domain: string;
  isActive: boolean;
  status: DomainStatusType;
  createdDate: number;
}

export interface DomainProps extends DomainDataProps {
  id: string;
}
