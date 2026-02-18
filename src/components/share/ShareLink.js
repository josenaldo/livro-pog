import React from 'react'

import ShareIcon from '@mui/icons-material/Share'
import { Box, IconButton } from '@mui/material'

import { ShareDialog } from '@pog/components/share'

const ShareLink = ({ title, description, url, icon, color = 'secondary' }) => {
    const [open, setOpen] = React.useState(false)
    const [isNativeShare, setNativeShare] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    React.useEffect(() => {
        if (navigator.share) {
            setNativeShare(true)
        }
    }, [])

    const handleOnClick = async () => {
        const data = {
            title: title,
            text: description,
            url: url,
        }

        // Se tiver ícone, construir URL da OG image
        if (icon) {
            const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?icon=${encodeURIComponent(icon)}&title=${encodeURIComponent(title)}`
            
            try {
                const blob = await fetch(imageUrl).then((r) => r.blob())
                const ext = blob.type.split('/')[1]
                const files = [
                    new File([blob], `file.${ext}`, {
                        type: blob.type,
                    }),
                ]

                if (navigator.canShare && navigator.canShare({ files })) {
                    data.files = files
                }
            } catch (error) {
                console.warn('Failed to fetch OG image for sharing:', error)
            }
        }

        if (navigator.share) {
            navigator
                .share(data)
                .then(() => {
                    console.log('Successfully shared')
                })
                .catch((error) => {
                    setOpen(true)
                })
        } else {
            setOpen(true)
        }
    }

    return (
        <Box>
            <IconButton
                onClick={handleOnClick}
                color={color}
                variant="contained"
                aria-label="Compartilhar"
            >
                <ShareIcon />
            </IconButton>

            {!isNativeShare && (
                <ShareDialog
                    title={title}
                    url={url}
                    description={description}
                    open={open}
                    onClose={() => {
                        handleClose()
                    }}
                />
            )}
        </Box>
    )
}

export { ShareLink }
