import {
    Box,
    Container,
    Breadcrumbs as MuiBreadcrumbs,
    Typography,
} from '@mui/material'
import { Link } from '@pog/components/elements'

const Breadcrumbs = ({ items }) => {
    console.log('ITEMS', items)
    if (!items || items.length <= 1) return null

    return (
        <Box
            sx={{
                backgroundColor: 'neutral.main',
                py: 1,
            }}
        >
            <Container>
                <MuiBreadcrumbs aria-label="breadcrumb">
                    {items.map((item, index) => {
                        return (
                            <BreadcrumbItem
                                title={item.title}
                                url={item.url}
                                index={index}
                                key={item.url}
                                length={items.length}
                            />
                        )
                    })}
                </MuiBreadcrumbs>
            </Container>
        </Box>
    )
}

const BreadcrumbItem = ({ title, url, index, length }) => {
    return (
        <>
            {index === length - 1 ? (
                <Typography color="neutral" variant="caption">
                    {title}
                </Typography>
            ) : (
                <Link
                    key={index}
                    underline="hover"
                    color="inherit"
                    href={url}
                    variant="caption"
                >
                    {title}
                </Link>
            )}
        </>
    )
}

export { Breadcrumbs }
