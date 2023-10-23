import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import { BoardType } from '~/interface/BoardType';
import Pagination from "react-js-pagination";
import { useNavigate } from 'react-router-dom';

const BoardList = () => {
    const navigate = useNavigate();

    const [dataList, setDataList] = useState<BoardType[]>([]);
    const [currentPost, setCurrentPost] = useState<BoardType[]>(dataList) // 페이지네이션을 통해 보여줄 게시글
    const [page, setPage] = useState<number>(1) // 현재 페이지 번호
    const postPerPage: number = 5 // 페이지 당 게시글 개수
    const indexOfLastPost: number = page * postPerPage
    const indexOfFirstPost: number = indexOfLastPost - postPerPage

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const boardLength = dataList.length
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:3003/posts').then((res) => {
                setDataList([...res.data].reverse())
            })
                .catch(function (error) {
                    console.log(error)
                })
        }
        fetchData()
    }, [])

    useEffect(() => {
        setCurrentPost(dataList.slice(indexOfFirstPost, indexOfLastPost))
    }, [dataList, page])


    // 글 작성페이지로 이동
    const gotoWrite = () => {
        navigate('/write');
    };

    return (
        <div className="board-list">
            <h1>Board list</h1>

            <h4>Total post : {boardLength}</h4>

            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="65%" />
                    <col width="20%" />
                </colgroup>

                <thead>
                    <tr>
                        <th>No</th>
                        <th>User Name</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        currentPost && currentPost.map((board, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{board.uid}</td>
                                    <td className="title"><Link to={`/posts/${board.id}`}>{board.title}</Link></td>
                                    <td>{board.content}</td>
                                    <td>{dayjs(board.createdAt).format('YYYY.MM.DD')}</td>
                                    <td>{dayjs(board.updatedAt).format('YYYY.MM.DD')}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Pagination
                activePage={page}
                itemsCountPerPage={postPerPage}
                totalItemsCount={dataList.length}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange} />

            <button onClick={gotoWrite}>글쓰기</button>
        </div>
    )
}

export default BoardList