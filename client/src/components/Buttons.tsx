import {
    Button
} from '@mui/material';

export function PrimaryBtn() {
    return (
        <>
            <Button variant="outlined" sx={{ margin: 1 }} color="primary">
                저장
            </Button>
        </>
    );
}

export function SecondaryBtn() {
    return (
        <>
            <Button variant="outlined" sx={{ margin: 1 }} color="secondary">
                취소
            </Button>
        </>
    );
}

