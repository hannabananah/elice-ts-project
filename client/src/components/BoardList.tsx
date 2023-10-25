import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import { BoardType } from '~/BoardType';
import Pagination from "react-js-pagination";
import { useNavigate } from 'react-router-dom';
import { getPostAll } from '../api/fetch'

const BoardList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dataList, setDataList] = useState<BoardType[]>([]);
    const [currentPost, setCurrentPost] = useState<BoardType[]>(dataList) // 페이지네이션을 통해 보여줄 게시글
    const [page, setPage] = useState<number>(1) // 현재 페이지 번호
    const [postPerPage] = useState<number>(5); // 페이지 당 게시글 개수

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const boardLength = dataList.length
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await getPostAll().then((res) => {
                console.log(res)
                setDataList([...res].reverse())
                setLoading(false)
            })
                .catch(function (error) {
                    console.log(error)
                })
        }
        fetchData()
    }, [])

    // 오류 해결해야 index 제대로 나올듯함
    useEffect(() => {
        const indexOfLastPost: number = page * postPerPage
        const indexOfFirstPost: number = indexOfLastPost - postPerPage
        setCurrentPost(dataList.slice(indexOfFirstPost, indexOfLastPost));
    }, [dataList, page]);

    // 글 작성페이지로 이동
    const gotoWrite = () => {
        navigate('/write');
    };

    return (
        <>
            {loading ?
                <h2>...loading</h2> :
                <><h1>Board list</h1>

                    <h4>Total post : {boardLength}</h4>

                    <table>
                        <colgroup>
                            <col width="10%" />
                            <col width="30%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="7%" />
                            <col width="7%" />
                        </colgroup>

                        <thead>
                            <tr>
                                <th>No</th>
                                <th>User Name</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Create</th>
                                <th>Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentPost && currentPost.map((board, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{board.pageIndex}</td>
                                            <td>{board.uid}</td>
                                            <td><Link to={`/posts/${board.id}`}>{board.title}</Link></td>
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
                        onChange={handlePageChange}
                    />

                    <button onClick={gotoWrite}>글쓰기</button></>
            }

        </>
    )
}

export default BoardList

