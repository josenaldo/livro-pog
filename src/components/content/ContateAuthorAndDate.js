import { Typography } from "@mui/material"

import { formatDate } from "@pog/utils/DateUtils"

function ContentAuthorAndDate({ author, date }) {
    if (!author && !date) {
        return null
    }
    const authorText = author ? `Por ${author}` : 'Autor desconhecido'
    const dateText = date ? `em ${formatDate(date)}` : 'Data não disponível'

    return (
        <Typography
            component="p"
            variant="caption"
            sx={{ color: 'text.secondary' }}
        >
            {`${authorText} ${dateText}`}
        </Typography>
    )
}

export { ContentAuthorAndDate }
