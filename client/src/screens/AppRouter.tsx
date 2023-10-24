import React, { FC, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// 첫진입 시 보이는 로그인 창
// const Main = React.lazy(() => require("./Main"));
const BoardList = React.lazy(() => import("./board/list/index"));
// // 글 작성 페이지
const Write = React.lazy(() => import("./board/create/index"));
// 글 상세 페이지
const BoardDetail = React.lazy(() => import("./board/detail/index"));

const AppRouter: FC = () => {

    return (
        <BrowserRouter>
            <Suspense fallback="..loading">
                <div>
                    <Routes>
                        {/* <Route path="/" element={<Main />} /> */}
                        <Route path="/posts" element={<BoardList />} />
                        <Route path="/posts/:id" element={<BoardDetail />} />
                        {/* <Route path="/create" element={<Write />} />
                        <Route path="/modify/:id" element={<Write />} /> */}
                    </Routes>
                </div>
            </Suspense>
        </BrowserRouter>
    );
};
export default AppRouter;