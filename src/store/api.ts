import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Tincture } from '../types';

const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(baseUrl);

export const tinctureApi = createApi({
  reducerPath: 'tinctureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['tinctures'],
  endpoints: (build) => ({
    getTinctureLists: build.query<Tincture[], void>({
      query: () => 'items',
      providesTags: ['tinctures'],
    }),

    addTincture: build.mutation<null, Omit<Tincture, 'id'>>({
      query: (body) => ({
        url: 'items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['tinctures'],
    }),

    deleteTincture: build.mutation<Tincture[], Pick<Tincture, 'id'>>({
      query: (body) => ({
        url: 'items',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['tinctures'],
    }),

    editTincture: build.mutation<Tincture[], Tincture>({
      query: (body) => ({
        url: 'items',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['tinctures'],
    }),
  }),
});

export const {
  useGetTinctureListsQuery,
  useAddTinctureMutation,
  useDeleteTinctureMutation,
  useEditTinctureMutation,
} = tinctureApi;
