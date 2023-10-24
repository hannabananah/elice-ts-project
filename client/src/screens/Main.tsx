import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

type Post = {
    id: number;
    uid: string,
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};


function Main() {
    const navigate = useNavigate();
    const refresh = () => {
        window.location.reload();
    }

    const [data, setData] = useState<Post[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:3003/posts').then((res) => {
                setData(res.data)
            })
        }
        fetchData()
    }, [])

    // 삭제
    // 2. deletePost에서 id는 Number type으로 받는다.
    const deletePost = async (id: Number) => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete('http://localhost:3003/posts', { params: { id: id } }).then((res) => {
                const status = res.status;
                if (status === 200) {
                    refresh()
                } else {
                    alert(status);
                }
            });
        }
    }

    // 글 작성페이지로 이동
    const gotoWrite = () => {
        navigate('/write');
    };

    // 글 작성페이지로 이동
    const gotoDetail = () => {
        navigate('/detail');
    };

    return (
        <div><span>Main</span>
            <button onClick={gotoWrite}>글 작성</button>
            {/* 데이터가 있으면 가져온다*/}
            <ul>
                {data && data.map(item => (
                    <li key={item.id}>
                        <h2>{item.uid}</h2>
                        <h2>{item.title}</h2>
                        <p onClick={gotoDetail}>{item.content}</p>
                        <p>{item.createdAt}</p>
                        <p>{item.updatedAt}</p>

                        {/*1. 버튼을 누르면 현재 게시글 id를 deletePost로 보낸다*/}
                        <button onClick={() => deletePost(item.id)}>클릭</button>
                    </li>
                ))}
                {/* 데이터가 없는 경우 빈 목록 보여주기 */}
            </ul>

        </div>
    )
}

export default Main