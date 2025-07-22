import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Car, PartBody } from '@/types/types';

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['car'],
  endpoints: (build) => ({
    getCar: build.query<Car, void>({
      query: () => 'car',
      providesTags: ['car'],
    }),
    addPart: build.mutation<Car, PartBody>({
      query: (body) => ({
        url: 'parts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['car'],
    }),
    deletePart: build.mutation<Car, PartBody>({
      query: (body) => ({
        url: 'parts',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['car'],
    }),
  }),
});

export const { useGetCarQuery, useAddPartMutation, useDeletePartMutation } =
  carApi;
