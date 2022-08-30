import { getSortedChapters } from '@pog/data'

export default async function handler(req, res) {
    const chapters = await getSortedChapters(false)

    res.status(200).json(chapters)
}
