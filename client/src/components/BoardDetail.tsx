import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Button,
    Grid,
    Box,
    Container,
    AppBar,
} from "@mui/material";
import "./Board.css"

const BoardDetail = () => {
    // hook
    const params = useParams().id;
    const navigate = useNavigate()

    // state(any 수정해야함)
    const [detailPost, setDetailPost] = useState<any>([])

    useEffect(() => {
        axios.get(`http://localhost:3210/posts/${params}`)
            .then((res) => {
                setDetailPost(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const deletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`http://localhost:3210/posts/${params}`).then((res) => {
                const status = res.status;
                if (status === 200) {
                    navigate('/posts')
                } else {
                    alert(status);
                }
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            return false
        }
    }

    return (
        <>
            <Container component="main" className="board-page-layout">
                <Box
                    component="form"
                    noValidate
                    className="box-container"
                    height="650px"
                >
                    <h2 className="table-title">게시글 상세보기</h2>
                    <div className="detail-layout">
                        <div className='table-detail-title'>
                            <span className="table-label">제목</span>
                            <div className='table-detail-contents'>
                                {detailPost.title}
                            </div>
                        </div>
                        <div className='table-detail-author'>
                            <span className="table-label">작성자</span>
                            <div className='table-detail-contents'>
                                {detailPost.uid}
                            </div>
                        </div>
                        <div className='table-detail-content'>
                            <span className="table-label">내용</span>
                            <div className='table-detail-contents content-scroll'>
                                {detailPost.content}
                            </div>
                        </div>
                    </div>
                    <AppBar
                        position="fixed"
                        color="default"
                        sx={{ top: "auto", bottom: 0 }}
                    >
                        <Grid item container direction="row" justifyContent="flex-end">
                            <Grid item>
                                <Link to={`/posts/modify/${detailPost.id}`}>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        sx={{ mt: 2, mb: 2, mr: 2 }}
                                    >
                                        수정
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={deletePost}
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2, mr: 10 }}
                                >
                                    삭제
                                </Button>
                            </Grid>
                            <Grid item>
                                <Link to="/posts">
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, mb: 2, mr: 10 }}
                                    >
                                        목록보기
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Box ></Container >


        </>


    );
};

export default BoardDetail;