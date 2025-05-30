import { AdminSidebarLayout, UserSidebarLayout } from '~/layout/SidebarLayout/SidebarLayout';
import UserHomePage from '~/pages/User/HomePage/UserHomePage';
import LoginPage from '~/pages/LoginPage/LoginPage';
import ManageUserInfoPage from '~/pages/Admin/ManageUserInfoPage/ManageUserInfoPage';
import ManageSlidesPage from '~/pages/Admin/ManageSlidesPage/ManageSlidesPage';
import DashboardPage from '~/pages/Admin/DashboardPage/DashboardPage';
import StartSessionPage from '~/pages/User/StartSessionPage/StartSessionPage';
import SubscribeSchedulesPage from '~/pages/User/SubscribeSchedules/SubscribeSchedulesPage';
import RegisterPage from '~/pages/RegisterPage/RegisterPage';
import ManageScheduleDatasetPage from '~/pages/Admin/ManageScheduleDatasetPage/ManageScheduleDatasetPage';
import ForgotPasswordPage from '~/pages/ForgotPasswordPage/ForgotPasswordPage';
import GenerateSchedulePage from '~/pages/User/GenerateSchedulePage/GenerateSchedulePage';
import Oauth2RedirectPage from '~/pages/Oauth2/Oauth2RedirectPage';
import DepositCoinsPage from '~/pages/User/DepositCoinsPage/DepositCoinsPage';
import CoinsHistoriesPage from '~/pages/User/CoinsHistories/CoinsHistoriesPage';

const publicRoutes = [
    { path: '/auth/google/callback', component: Oauth2RedirectPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/forgot-password', component: ForgotPasswordPage },
];

const adminRoutes = [
    { path: '/', component: DashboardPage, layout: AdminSidebarLayout },
    { path: '/dashboard', component: DashboardPage, layout: AdminSidebarLayout },
    { path: '/manage-user-info', component: ManageUserInfoPage, layout: AdminSidebarLayout },
    { path: '/manage-slides', component: ManageSlidesPage, layout: AdminSidebarLayout },
    { path: '/manage-decision-schedule-dataset', component: ManageScheduleDatasetPage, layout: AdminSidebarLayout },
];

const userRoutes = [
    { path: '/', component: UserHomePage, layout: UserSidebarLayout },
    { path: '/start-session', component: StartSessionPage, layout: UserSidebarLayout },
    { path: '/subscribe-schedules', component: SubscribeSchedulesPage, layout: UserSidebarLayout },
    { path: '/generate-schedules', component: GenerateSchedulePage, layout: UserSidebarLayout },
    { path: '/deposit-coins', component: DepositCoinsPage, layout: UserSidebarLayout },
    { path: '/coins-histories', component: CoinsHistoriesPage, layout: UserSidebarLayout },
];

export { publicRoutes, adminRoutes, userRoutes };
