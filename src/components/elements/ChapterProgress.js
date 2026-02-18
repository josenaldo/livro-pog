import BacklogIcon from '@mui/icons-material/Assignment'
import ProgressIcon from '@mui/icons-material/AssignmentInd'
import ReviewIcon from '@mui/icons-material/AssignmentReturn'
import DoneIcon from '@mui/icons-material/AssignmentTurnedIn'
import { Box, CircularProgress } from '@mui/material'

const PROGRESS = {
    backlog: {
        color: 'error.main',
        icon: <BacklogIcon color="error" />,
        value: 0,
    },
    progress: {
        color: 'warning.main',
        icon: <ProgressIcon color="warning" />,
        value: 33,
    },
    review: {
        color: 'info.main',
        icon: <ReviewIcon color="info" />,
        value: 66,
    },
    done: {
        color: 'success.main',
        icon: <DoneIcon color="success" />,
        value: 100,
    },
}

const ChapterProgress = ({ chapter, iconSx = {}, progressSx = {} }) => {
    const { status } = chapter
    const { color, icon, value } = status ? PROGRESS[status] : PROGRESS.backlog

    return (
        <Box
            sx={{
                m: 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                marginLeft: 1,
            }}
        >
            {icon}
            <CircularProgress
                value={value}
                variant="determinate"
                sx={{
                    color: `${color}`,
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                }}
            />
        </Box>
    )
}

export { ChapterProgress }
