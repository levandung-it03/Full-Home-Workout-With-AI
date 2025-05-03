import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionAdminThunk } from '../thunks/subscriptionThunk';
import { formatResponseLocalDateTime } from '~/utils/formatters';

const changingCoinsSlice = createSlice({
    name: 'changingCoins',
    initialState: {
        primaryKey: 'changingCoinsHistoriesId',
        selectedRows: {},
        data: [],
        totalPages: 1,
        loading: true, // Default is true so that when there is no data, loading will appear
        message: '',
    },
    extraReducers: (builder) => {
        builder
            .addCase(SubscriptionAdminThunk.getAllCoinsHistoriesByUserInfoThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(SubscriptionAdminThunk.getAllCoinsHistoriesByUserInfoThunk.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.data = action.payload.data.data.map(objData => ({
                    ...objData,
                    changingTime: formatResponseLocalDateTime(objData.changingTime),
                }));
                state.totalPages = action.payload.data.totalPages;
                state.message = action.payload.message;
            })
            .addCase(SubscriptionAdminThunk.getAllCoinsHistoriesByUserInfoThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default changingCoinsSlice.reducer;