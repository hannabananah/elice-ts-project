import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import { BoardType } from '~/interface/BoardType';

const BoardList = () => {
    const [data, setData] = useState<BoardType[] | null>(null);
    // const boardLength = data.length

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:3003/posts').then((res) => {
                setData(res.data);
                console.log(res.data[0]);
                console.log(res.data[0].content);
            })
        }
        fetchData()
    }, [])


    return (
        <div className="board-list">
            <h1>Board list</h1>

            {/* <h4>Total post : {boardLength}</h4> */}

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
                        data && data.map((board, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{board.uid}</td>
                                    <td className="title"><Link to={`/board/${board.id}`}>{board.title}</Link></td>
                                    <td>{board.content}</td>
                                    <td>{dayjs(board.createdAt).format('YYYY.MM.DD')}</td>
                                    <td>{dayjs(board.updatedAt).format('YYYY.MM.DD')}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BoardList