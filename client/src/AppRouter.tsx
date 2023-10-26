import { Suspense, lazy } from "react";
import { Navigate } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import SuspenseLoader from './components/suspenseLoader';

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
            element: <Navigate to="/posts" replace />,
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