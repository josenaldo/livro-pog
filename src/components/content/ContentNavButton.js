import Link from 'next/link'

import { Button } from '@mui/material'

const ContentNavButton = ({ url, icon, onClick = () => {} }) => {
    return (
        <Button
            component={Link}
            href={url}
            variant="contained"
            color="navButton"
            sx={{
                minWidth: '0',
                width: '100%',
                height: '100%',
                borderRadius: '0',
                padding: '0 !important',
                px: '0px !important',
                py: '0 !important',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& svg': {
                    color: 'text.secondary',
                },
            }}
            onClick={onClick}
        >
            {icon}
        </Button>
    )
}

export { ContentNavButton }
