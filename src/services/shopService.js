import { base_url } from "../firebase/database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products.json`
        }),
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProductsbyCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
        }),
        getProductsbyId: builder.query({
            query: (id) => `products.json?orderBy="id"&equalTo="${id}"`
        }),
        getOrdersbyUser: builder.query({
            query: (user) => `orders.json?orderBy="user"&equalTo="${user}"`
        }),
        getOrdersbyId: builder.query({
            query: (id) => `orders.json?orderBy="id"&equalTo="${id}"`
        }),
        postOrder: builder.mutation({
            query: ({ ...order }) => ({
              url: "orders.json",
              method: "POST",
              body: order,
            }),
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            }),
        postProfileImage: builder.mutation({
            query: ({ localId, image }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                image: image,
                },
            }),
        }),
        getUserLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
            }),
        postUserLocation: builder.mutation({
            query: ({ localId, location}) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address
                },
            })
        })
    })
});

export const { 
    useGetProductsQuery, 
    useGetCategoriesQuery, 
    useGetProductsbyCategoryQuery,
    useGetProductsbyIdQuery,
    useGetOrdersbyUserQuery,
    useGetOrdersbyIdQuery,
    usePostOrderMutation,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetUserLocationQuery,
    usePostUserLocationMutation,
} = shopApi;