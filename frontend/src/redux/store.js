import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import toastSlice from './slices/toastSlice';
import exerciseSlice from './slices/exerciseSlice';
import sessionSlice from './slices/sessionSlice';
import scheduleSlice from './slices/scheduleSlice';
import userInfoSlice from './slices/userInfoSlice';
import enumSlice from './slices/enumSlice';
import subscriptionSlice from './slices/subscriptionSlice';
import slidesSlice from './slices/slidesSlice';
import datalinesSlice from './slices/datalinesSlice';
import changingCoinsSlice from './slices/changingCoinsSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
        toast: toastSlice,
        exercise: exerciseSlice,
        session: sessionSlice,
        schedule: scheduleSlice,
        userInfo: userInfoSlice,
        enum: enumSlice,
        subscription: subscriptionSlice,
        changingCoins: changingCoinsSlice,
        slides: slidesSlice,
        datalines: datalinesSlice,
    },
});

export default store;
