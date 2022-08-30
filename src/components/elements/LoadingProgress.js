import { Box, CircularProgress } from '@mui/material'

const LoadingProgress = ({ loading }) => {
    return (
        <>
            {loading ? (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '5px',
                        my: 5,
                    }}
                >
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <></>
            )}
        </>
    )
}

export { LoadingProgress }
