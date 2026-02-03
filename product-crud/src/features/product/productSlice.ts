import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import *as api from "./productAPI"
import type { Product } from "./productTypes";

interface ProductState {
    items: Product[],
    loading: boolean
    error: string | null
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null
}

export const getProducts = createAsyncThunk("products/get", async () => {
    const res = await api.fetchProduct();
    return res.data as Product[];
});

export const createProducts = createAsyncThunk("products/create", async (data: Product) => {
    const res = await api.createProduct(data);
    return res.data as Product;

});

export const updateProduct = createAsyncThunk("products/update", async ({ id, data }: { id: number; data: Product }) => {
    const res = await api.updateProduct(id, data)
    return res.data as Product;

})

export const deleteProduct = createAsyncThunk("products/delete", async (id: number) => {
    await api.deleteProduct(id);

    return id;
})


const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        }).addCase(getProducts.fulfilled, (state, action:PayloadAction<Product[]>) => {
            state.items = action.payload;
            state.loading = false;
        }).addCase(getProducts.rejected, (state) => {
            state.error = "Product is not found..!";
            state.loading = false;

        }).addCase(createProducts.pending, (state) => {
            state.loading = true;
        }).addCase(createProducts.fulfilled, (state, action:PayloadAction<Product>) => {
            state.items.push(action.payload);
            state.loading = false;
        }).addCase(createProducts.rejected, (state) => {
            state.error = "geting error while create product..!"
            state.loading=false;
        }).addCase(updateProduct.pending, (state) => {
            state.loading = true;
        }).addCase(updateProduct.fulfilled, (state, action:PayloadAction<Product>) => {
            const index = state.items.findIndex(p => p.id === action.payload.id)
            if (index !== -1)state.items[index] = action.payload
            state.loading = false;
        }).addCase(updateProduct.rejected, (stare) => {
            stare.error = "Product is not update...!";
            stare.loading = false;
        }).addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        }).addCase(deleteProduct.fulfilled, (state, action:PayloadAction<number>) => {
            state.items = state.items.filter(p => p.id !==action.payload);
            state.loading = false;
        }).addCase(deleteProduct.rejected, (state) => {
            state.loading = false;
            state.error="product not delete..!"
        })
    }
})

export default ProductSlice.reducer