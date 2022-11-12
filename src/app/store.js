import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';
import signUpReducer from "../features/auth/signUpSlice";
import taskReducer from "../pages/PortfolioAndBundle/customerSegment/strategySlice";
import repairReducer from "../pages/Repair/dropdowns/repairSlice";
import portfolioItemReducer from "../pages/PortfolioAndBundle/createItem/portfolioSlice";

import { appReducer } from "../redux/reducers/appReducer";
import { userReducer } from "../redux/reducers/userReducer";
import { guidedSoltionReducer } from "../redux/reducers/guidedSolutionReducer"
import { VerifyEmail } from './../pages/LoginSignUp/VerifyEmail';





const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    signUp: signUpReducer,
    task:taskReducer,
    dropdown: repairReducer,
    VerifyEmail:signUpReducer,
    loginSuccess:authReducer,
    portfolioItem:portfolioItemReducer,
    
    app: appReducer,
    user: userReducer,
    guidedSolution: guidedSoltionReducer
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false,}).concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
