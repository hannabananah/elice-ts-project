import React, { FC, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// 첫진입 시 보이는 로그인 창
const Main = React.lazy(() => import("./Main"));
// 글 작성 페이지
const Write = React.lazy(() => import("./Write"));
// 글 상세 페이지
const Detail = React.lazy(() => import("./Detail"));

const AppRouter: FC = () => {

    return (
        <BrowserRouter>
            <Suspense fallback="..loading">
                <div>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/write" element={<Write />} />
                        <Route path="/detail" element={<Detail />} />
                        {/*  */}
                    </Routes>
                </div>
            </Suspense>
        </BrowserRouter>
    );
};
export default AppRouter;