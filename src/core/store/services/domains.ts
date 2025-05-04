import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DomainDataProps, DomainProps } from 'core/types/domain';
import { apiBaseUrl } from 'core/utilities/env';
import { sanitize } from 'core/utilities/helper/sanitize';

const tagType = 'Domain';

export const domainsApi = createApi({
  reducerPath: 'domainsApi',
  tagTypes: [tagType],
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getDomains: builder.query<DomainProps[], string>({
      query: () => '/domain',
      providesTags: [tagType],
    }),
    getDomain: builder.query<DomainProps, string>({
      providesTags: (response) => [{ type: tagType, id: response?.id }],
      query: (id: string) => `/domain/${id}`,
    }),
    updateDomain: builder.mutation<void, DomainProps>({
      invalidatesTags: [tagType],
      query: ({ id: _id, createdDate, ...payload }) => ({
        url: `/domain/${_id}`,
        method: 'PUT',
        body: sanitize(payload),
      }),
    }),
    addDomain: builder.mutation<void, DomainDataProps>({
      invalidatesTags: [tagType],
      query: (payload) => ({
        url: '/domain',
        method: 'POST',
        body: sanitize(payload),
      }),
    }),
    deleteDomain: builder.mutation<void, string>({
      invalidatesTags: [tagType],
      query: (id) => ({
        url: `/domain/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetDomainQuery,
  useGetDomainQuery,
  useGetDomainsQuery,
  useAddDomainMutation,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} = domainsApi;
