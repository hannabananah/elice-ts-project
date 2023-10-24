import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'

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
        <div>
            {loading ? (
                <>
                    <h2>{detailPost.title}</h2>

                    <div>
                        <div>
                            <p>No.{detailPost.id}</p>
                            <p>{dayjs(detailPost.createdAt).format('YYYY.MM.DD')}</p>
                        </div>

                        <div>
                            <p>{detailPost.content}</p>
                        </div>
                    </div>

                    <div>
                        <Link to={`/posts/modify/${detailPost.id}`}>
                            <button>수정</button>
                        </Link>
                        <button onClick={deletePost}>삭제</button>
                        <Link to="/posts">
                            <button>목록보기</button>
                        </Link>
                    </div>
                </>

            ) : (
                <h2>loading...</h2>
            )}
        </div>
    );
};

export default BoardDetail;