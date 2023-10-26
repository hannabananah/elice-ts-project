import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { BoardType } from '~/BoardType';
import { useNavigate } from 'react-router-dom';
import { getPostAll } from '../api/fetch'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./Board.css"

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        e: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}
function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(e, 0);
    };

    const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page - 1);
    };

    const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page + 1);
    };

    const handleLastPageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const BoardList = () => {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState<BoardType[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPost = dataList.slice(startIndex, endIndex);
    const boardLength = dataList.length

    const emptyRows =
        page > 0 ? Math.max(0, rowsPerPage - setDataList.length) : 0;

    const handleChangePage = (
        e: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        async function fetchData() {
            await getPostAll().then((res) => {
                setDataList([...res].reverse())
            })
                .catch(function (error) {
                    console.log(error)
                })
        }
        fetchData()
    }, [])


    // 글 작성페이지로 이동
    const gotoWrite = () => {
        navigate('/write');
    };

    return (
        <><div className='board-page-layout'>
            <h1>게시판</h1>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1,
                    m: 0,
                    borderRadius: 1,
                }}
            >
                <Typography>총 게시물 수 : {boardLength}개</Typography>
                <Button variant="contained" size="small" onClick={gotoWrite}>글쓰기</Button>
            </Box>
            <TableContainer component={Paper} className='table-container'>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead className='table-head'>
                        <TableRow>
                            <TableCell align='center' className="table-cell-index">목록</TableCell>
                            <TableCell className="table-cell-author">작성자명</TableCell>
                            <TableCell className="table-cell-title">제목</TableCell>
                            <TableCell className="table-cell-content">내용</TableCell>
                            <TableCell className="table-cell-date">등록일시</TableCell>
                            <TableCell className="table-cell-date">수정일시</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : currentPost && currentPost
                        ).map((board, index) => (
                            <TableRow key={index}>
                                <TableCell align='center' className="table-cell-index">{board.pageIndex}</TableCell>
                                <TableCell className="table-cell-author">{board.uid}</TableCell>
                                <TableCell className="table-cell-title"><Link className="link" to={`/posts/${board.id}`}>{board.title}</Link></TableCell>
                                <TableCell className="table-cell-content">{board.content}</TableCell>
                                <TableCell className="table-cell-date">{dayjs(board.createdAt).format('YYYY.MM.DD')}</TableCell>
                                <TableCell className="table-cell-date">{dayjs(board.updatedAt).format('YYYY.MM.DD')}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={dataList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': '페이지당 게시물 수',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
        </>
    )
}

export default BoardList

