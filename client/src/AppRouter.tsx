import React, { FC, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import SuspenseLoader from './components/suspenseLoader/index';

const Loader = (Component: any) => (props: any) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

// 첫진입 시 보이는 로그인 창
const Main = Loader(lazy(() => import("./components/Main.tsx")));
// pages
const BoardList = Loader(lazy(() => import("./components/BoardList.tsx")));
// 글 작성 페이지
const BoardCreate = Loader(lazy(() => import("./components/BoardCreate.tsx")));
// 글 상세 페이지
const BoardDetail = Loader(lazy(() => import("./components/BoardDetail.tsx")));
// 글 수정 페이지
const BoardModify = Loader(lazy(() => import("./components/BoardModify.tsx")));

// Status
const Status404 = Loader(
    lazy(() => import('./errorPages/404.tsx'))
);
const Status500 = Loader(
    lazy(() => import('./errorPages/500.tsx'))
);

export default function AppRouter() {
    let element = useRoutes([
        {
            path: "/",
            element: <Main />,
        },
        {
            path: 'posts',
            element: <BoardList />,
        },
        {
            path: 'posts/:id',
            element: <BoardDetail />,
        },
        {
            path: 'write',
            element: <BoardCreate />,
        },
        {
            path: 'posts/modify/:id',
            element: <BoardModify />,
        },
        {
            path: 'posts/modify/:id',
            element: <BoardModify />,
        },
        {
            path: 'posts/modify/:id',
            element: <BoardModify />,
        },
        {
            path: '*',
            element: <Navigate to="/error/404" replace />
        },
        {
            path: '/error/404',
            element: <Status404 />
        },
        {
            path: '/error/500',
            element: <Status500 />
        },

    ]);

    return element;
}


// const routes: RouteObject[] = [
//     {
//         path: '',
//         element: <Main />,
//         children: [
//             {
//                 path: '/',
//                 element: <BoardList />
//             },
//             {
//                 path: 'posts',
//                 element: <Navigate to="/" replace />,
//             },
//             {
//                 path: 'status',
//                 children: [
//                     {
//                         path: '',
//                         element: <Navigate to="404" replace />
//                     },
//                     {
//                         path: '404',
//                         element: <Status404 />
//                     },
//                     {
//                         path: '500',
//                         element: <Status500 />
//                     },
//                 ]
//             },
//             {
//                 path: '*',
//                 element: <Status404 />
//             }
//         ]
//     },
//     {
//         path: 'posts',
//         children: [
//             {
//                 path: '',
//                 element: <Navigate to="posts" replace />
//             },
//             {
//                 path: 'modify',
//                 element: <BoardModify />
//             },
//         ]
//     },
//     {
//         path: 'write',
//         children: [
//             {
//                 path: '',
//                 element: <Navigate to=":id" replace />
//             },
//             {
//                 path: ':id',
//                 element: <BoardCreate />
//             },
//         ]
//     },
// ];


