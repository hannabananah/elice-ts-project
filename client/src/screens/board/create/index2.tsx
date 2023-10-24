import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        contents: '',
    });

    const { title, createdBy, contents } = board; //비구조화 할당

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = e.target; //e.target에서 name과 value만 가져오기
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const { value, name } = e.target; //e.target에서 name과 value만 가져오기
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const saveBoard = async () => {
        await axios.post(`//localhost:8080/board`, board).then((res) => {
            alert('등록되었습니다.');
            navigate('/board');
        });
    };

    // 이전 메인페이지로 이동
    const backToMain = () => {
        navigate('/');
    };

    return (
        <div>
            <div>
                <span>제목</span>
                <input type="text" name="title" value={title} onChange={onChangeInput} />
            </div>
            <br />
            <div>
                <span>작성자</span>
                <input
                    type="text"
                    name="createdBy"
                    value={createdBy}
                    onChange={onChangeInput}
                />
            </div>
            <br />
            <div>
                <span>내용</span>
                <textarea
                    name="contents"
                    cols={30}
                    rows={10}
                    value={contents}
                    onChange={onChangeTextArea}
                ></textarea>
            </div>
            <br />
            <div>
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToMain}>취소</button>
            </div>
        </div>
    );
};

export default BoardWrite;