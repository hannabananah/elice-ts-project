import React, { useState, useEffect } from 'react'
import axios from "axios";

type Post = {
    id: Number;
    uid: string,
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};


function Main() {
    const [data, setData] = useState<Post[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:3003/posts').then((res) => {
                setData(res.data)
                console.log(res.data[0])
                console.log(res.data[0].content)
            })
        }
        fetchData()
    }, [])

    // 삭제
    // function onClick() {
    //     async function fetchData() {
    //         await axios.delete('http://localhost:3003/posts').then((res) => {
    //             // id 정보를 json 형식으로 서버에 보내주어야 한다
    //             console.log('데이터 삭제')
    //         })
    //     }
    //     fetchData()
    // }
    
    return (
        <div>Main
            {/* 데이터가 있으면 가져온다*/}
            <ul>
                {data && data.map(item => (
                    <li key={String(item.id)}>
                        <h2>{item.uid}</h2>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <p>{item.createdAt}</p>
                        <p>{item.updatedAt}</p>
                        {/* 버튼 누르면 해당 아이디가 함수로 보내지는 문법 찾기 */}
                        <button>delete</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Main