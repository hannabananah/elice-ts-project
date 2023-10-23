import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoardDetail = () => {
    const [loading, setLoading] = useState(true);


    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div>상세페이지</div>
            )}
        </div>
    );
};

export default BoardDetail;