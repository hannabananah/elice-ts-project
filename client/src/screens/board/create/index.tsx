import React, { useEffect, useState } from "react";
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

const BoardCreate = () => {
    // hook
    const navigate = useNavigate()

    // state
    let [uid, setUid] = useState<string>('')
    let [title, setTitle] = useState<string>('')
    let [content, setContent] = useState<string>('')

    const formSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (uid.length === 0) {
            alert('이름을 입력해 주세요.')
        } else if (title.length === 0) {
            alert('제목을 입력해 주세요.')
        } else if (content.length === 0) {
            alert('내용을 입력해 주세요.')
        } else {
            if (window.confirm('게시글을 등록하시겠습니까?')) {
                axios.post('http://localhost:3003/posts', {
                    uid: uid,
                    title: title,
                    content: content,
                    createdAt: new Date()
                })
                    .then(function (res) {
                        alert('게시글이 등록되었습니다.')
                        navigate('/posts')
                        console.log('등록성공')
                    })

                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                return false
            }
        }
    }

    const formCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (window.confirm('게시글 작성을 취소하시겠습니까?')) {
            navigate('/posts')
        } else {
            return false
        }
    }

    const [disabledButton, setDisabledButton] = useState<boolean>(true);


    useEffect(() => {
        if (uid && title && content) {
            setDisabledButton(false);
        } else setDisabledButton(true);
    }, [uid, title, content]);




    return (
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
                <Box width="60%">
                    <Grid sx={{ marginTop: 2 }} item xs={6}>
                        <Typography variant="h5" sx={{ mb: 10 }}>게시글 작성하기</Typography>
                    </Grid>
                    <Grid container item sm={10} md={10} lg={10} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                placeholder={"작성자의 이름을 입력해주세요."}
                                autoComplete="true"
                                name="name"
                                fullWidth
                                id="name"
                                label="작성자 이름 *"
                                autoFocus
                                value={uid}
                                // error={Boolean(nameError)}
                                onChange={(e) => setUid(e.target.value)}
                            />
                            <Typography style={{ color: "#bd1c1c" }}>
                                {/* {nameError} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder={"제목을 입력하세요."}
                                fullWidth
                                id="title"
                                label="제목 *"
                                name="title"
                                autoComplete="title"
                                value={title}
                                // error={Boolean(titleError)}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ borderColor: "red" }}
                            />
                            <Typography style={{ color: "#bd1c1c" }}>
                                {/* {titleError} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder={"내용을 입력하세요."}
                                fullWidth
                                id="message"
                                label="내용 *"
                                name="message"
                                autoComplete="message"
                                multiline={true}
                                rows={7}
                                value={content}
                                // error={Boolean(messageError)}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ marginBottom: 10 }}
                            />
                            <Typography style={{ color: "#bd1c1c" }}>
                                {/* {messageError} */}
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
                                    disabled={disabledButton}
                                >
                                    저장
                                </Button>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Box>
            </Box>
        </Container >

    )
}

export default BoardCreate