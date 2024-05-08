import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, Navigate } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
// routes 배열을 순회하며 각 route에 적절한 레이아웃을 적용한 새로운 routes 배열 생성
const finalRoutes = routes.map((route) => {
    if (route.path === '/') {
        return {
            ...route,
            element: _jsx(Navigate, { to: "/entry" }),
        };
    }
    return {
        ...route,
        element: route.layout === 'blank' ? _jsx(BlankLayout, { children: route.element }) : _jsx(DefaultLayout, { children: route.element }),
    };
});
// createBrowserRouter 함수를 사용하여 라우터를 생성하고 finalRoutes 배열을 전달합니다.
const router = createBrowserRouter(finalRoutes);
export default router;
