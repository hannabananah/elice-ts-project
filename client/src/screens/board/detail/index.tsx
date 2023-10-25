import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import {
    Button,
    TextField,
    Grid,
    Box,
    Container,
    AppBar,
    Typography
} from "@mui/material";

const BoardDetail = () => {
    // hook
    const params = useParams().id;
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    // state(any 수정해야함)
    const [detailPost, setDetailPost] = useState<any>([])

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:3003/posts/${params}`)
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
            await axios.delete(`http://localhost:3003/posts/${params}`).then((res) => {
                const status = res.status;
                if (status === 200) {
                    navigate('/posts')
                } else {
                    alert(status);
                }
            }).catch(function (error) {
                console.log("e--------", error)
            })
        } else {
            return false
        }
    }


    return (
        // <div>
        //     {loading ? (
        //         <>
        //             <h2>{detailPost.title}</h2>

        //             <div>
        //                 <div>
        //                     <p>No.{detailPost.id}</p>
        //                     <p>{dayjs(detailPost.createdAt).format('YYYY.MM.DD')}</p>
        //                 </div>

        //                 <div>
        //                     <p>{detailPost.content}</p>
        //                 </div>
        //             </div>

        //             <div>
        //                 <Link to={`/posts/modify/${detailPost.id}`}>
        //                     <button>수정</button>
        //                 </Link>
        //                 <button onClick={deletePost}>삭제</button>
        //                 <Link to="/posts">
        //                     <button>목록보기</button>
        //                 </Link>
        //             </div>
        //         </>

        //     ) : (
        //         <h2>loading...</h2>
        //     )}
        // </div>

        <>{loading ? (
            <Container component="main">
                <Box
                    flex={1}
                    component="form"
                    noValidate
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="96vh"
                    flexDirection="column"
                >
                    <Box width="60%" >
                        <Grid sx={{ marginTop: 2 }} item xs={6}>
                            <Typography variant="h5" sx={{ mb: 10 }}>게시글 작성하기</Typography>
                        </Grid>
                        <Grid container item sm={10} md={10} lg={10} spacing={2}>
                            <Grid item xs={12} sm={6}>

                                <Typography>
                                    제목  :  {detailPost.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    작성자  :  {detailPost.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    내용  :  {detailPost.content}
                                </Typography>
                            </Grid>
                        </Grid>
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
                    </Box>
                </Box>
            </Container >
        ) : (
            <h2>loading...</h2>
        )}
        </>


    );
};

export default BoardDetail;