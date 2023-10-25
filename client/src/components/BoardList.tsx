import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { BoardType } from '~/BoardType';
import { useNavigate } from 'react-router-dom';
import { getPostAll } from '../api/fetch'
import "./Paging.css"
import Box, { BoxProps } from '@mui/material/Box';
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

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}


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
    const [loading, setLoading] = useState(false)
    const [dataList, setDataList] = useState<BoardType[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPost = dataList.slice(startIndex, endIndex);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataList.length - startIndex);
    const boardLength = dataList.length

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

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


    // 글 작성페이지로 이동
    const gotoWrite = () => {
        navigate('/write');
    };

    return (<>
        {
            loading ?
                <h2>...loading</h2> :
                <><h1>Board list</h1>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Item><Typography>Total post : {boardLength}</Typography></Item>
                        <Button variant="outlined" size="small" sx={{ height: '25%' }} onClick={gotoWrite}>글쓰기</Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>목록</TableCell>
                                    <TableCell>작성자명</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>내용</TableCell>
                                    <TableCell>등록일시</TableCell>
                                    <TableCell>수정일시</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : currentPost && currentPost
                                ).map((board, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{board.pageIndex}</TableCell>
                                        <TableCell>{board.uid}</TableCell>
                                        <TableCell><Link to={`/posts/${board.id}`}>{board.title}</Link></TableCell>
                                        <TableCell>{board.content}</TableCell>
                                        <TableCell>{dayjs(board.createdAt).format('YYYY.MM.DD')}</TableCell>
                                        <TableCell>{dayjs(board.updatedAt).format('YYYY.MM.DD')}</TableCell>
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
                                                'aria-label': 'rows per page',
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
                </>
        }
    </>
    )
}

export default BoardList

