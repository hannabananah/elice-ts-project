import React, { useEffect, useState } from "react";
import { useParams } from 'react-router'
import {
    Button,
    TextField,
    Grid,
    Box,
    Container,
    AppBar,
    Typography
} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BoardModify = () => {
    // hook
    const params = useParams().id
    const navigate = useNavigate()

    // state
    // TODO :: any 타입 수정
    let [modifyBoardData, setModifyBoardData] = useState<any>([])
    let [id, setId] = useState<string>(modifyBoardData.id)
    let [title, setTitle] = useState<string>(modifyBoardData.title)
    let [content, setContent] = useState<string>(modifyBoardData.content)
    let uid = modifyBoardData.uid
    const formSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (title.length === 0) {
            alert('제목을 입력해 주세요.')
        } else if (content.length === 0) {
            alert('내용을 입력해 주세요.')
        } else {
            if (window.confirm('게시글을 수정하시겠습니까?')) {
                axios.put(`http://localhost:3003/posts/${params}`, {
                    id: id,
                    uid: uid,
                    title: title,
                    content: content,
                    updatedAt: new Date()
                })
                    .then(function (res) {
                        alert('게시글이 수정되었습니다.')
                        navigate('/posts')
                    })
                    .catch(function (error) {
                        navigate('/error/404')
                        console.log(error)
                    })
            } else {
                return false
            }
        }
    }

    const formCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (window.confirm('게시글 수정을 취소하시겠습니까?')) {
            navigate('/posts')
        } else {
            return false
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3003/posts/${params}`)
            .then((res) => {
                setModifyBoardData(res.data)
            })
            .catch(function (error) {
                if (error.code === "ERR_NETWORK") {
                    navigate('/error/500')
                }
            })
    }, [])


    // react hook 배우기
    useEffect(() => {
        setId(modifyBoardData.id)
    }, [modifyBoardData.id])

    useEffect(() => {
        setTitle(modifyBoardData.title)
    }, [modifyBoardData.title])

    useEffect(() => {
        setContent(modifyBoardData.content)
    }, [modifyBoardData.content])


    return (
        <Container component="main" className="board-page-layout">
            <Box
                component="form"
                noValidate
                className="box-container"
            >
                <h2 className="table-title">게시글 수정하기</h2>
                <div className="input-layout">
                    <Grid container item sm={10} md={10} lg={10} spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                fullWidth
                                id="name"
                                // undefined에서 useEffect 이후에 값이 들어가면 발생하는 에러로 value={uid}가 아닌 ''의 경우에도 값을 받도록 추가함
                                value={uid || ''}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder={"제목을 수정해주세요."}
                                fullWidth
                                id="title"
                                label="제목 *"
                                name="title"
                                autoComplete="title"
                                value={title || ""}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ borderColor: "red" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder={"내용을 수정해주세요."}
                                fullWidth
                                id="message"
                                label="내용 *"
                                name="message"
                                autoComplete="message"
                                multiline={true}
                                rows={7}
                                value={content || ""}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ marginBottom: 10 }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <AppBar
                    position="fixed"
                    color="default"
                    sx={{ top: "auto", bottom: 0 }}
                >
                    <Grid item container direction="row" justifyContent="flex-end">
                        <Grid item>
                            <Button
                                onClick={formCancel}
                                type="button"
                                variant="outlined"
                                sx={{ mt: 2, mb: 2, mr: 2 }}
                            >
                                취소
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={formSubmit}
                                variant="contained"
                                sx={{ mt: 2, mb: 2, mr: 10 }}
                            >
                                저장
                            </Button>
                        </Grid>
                    </Grid>
                </AppBar>
            </Box ></Container >
    )
}

export default BoardModify