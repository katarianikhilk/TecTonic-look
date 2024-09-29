import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const headers = {
  'x-tenant-id': 'd68fdb5f-fed9-47a1-852a-c3b3cca201ec'
};

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://workplace-safety-vision-api-dev.azurewebsites.net/api',
    headers
  }),
  endpoints: (builder) => ({
    pokemonList: builder.query({
      query: () => '/pokemon'
    })
  })
});

export default baseApi;
export const { usePokemonListQuery } = baseApi;
