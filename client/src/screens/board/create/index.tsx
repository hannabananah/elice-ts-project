import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BoardCreate = () => {
    // hook
    const navigate = useNavigate()

    // state
    let [title, setTitle] = useState<string>('')
    let [content, setContent] = useState<string>('')

    const formSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (title.length === 0) {
            alert('제목을 입력해 주세요.')
        } else if (content.length === 0) {
            alert('내용을 입력해 주세요.')
        } else {
            if (window.confirm('게시글을 등록하시겠습니까?')) {
                axios.post('http://localhost:3003/posts', {
                    title: title,
                    content: content
                })
                    .then(function (res) {
                        alert('게시글이 등록되었습니다.')
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

    const formCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (window.confirm('게시글 작성을 취소하시겠습니까?')) {
            navigate('/posts')
        } else {
            return false
        }
    }

    return (
        <div>
            <h2>Write content</h2>

            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." />
                </div>

                <div>
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요." />
                </div>
            </form>

            <div>
                <button onClick={formSubmit}>확인</button>
                <button onClick={formCancel}>취소</button>
            </div>
        </div>
    )
}

export default BoardCreate