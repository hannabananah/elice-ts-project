import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
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

    const formSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('보내기')
        if (title.length === 0) {
            alert('제목을 입력해 주세요.')
        } else if (content.length === 0) {
            alert('내용을 입력해 주세요.')
        } else {
            if (window.confirm('게시글을 수정하시겠습니까?')) {
                axios.patch(`http://localhost:3003/posts/${params}`, {
                    id: id,
                    title: title,
                    content: content,
                    updatedAt: new Date()
                })
                    .then(function (res) {
                        alert('게시글이 수정되었습니다.')
                        navigate('/posts')
                    })

                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                return false
            }
        }
    }

    const refresh = () => {
        window.location.reload();
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
                navigate('/error/404')
                console.log(error)
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
        <div>
            <h2>Write content</h2>

            <form>

                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title || ""} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." />
                </div>

                <div>
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" value={content || ""} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요." />
                </div>
            </form>

            <div>
                <button onClick={formSubmit}>확인</button>
                <button onClick={formCancel}>취소</button>
            </div>
        </div >
    )
}

export default BoardModify