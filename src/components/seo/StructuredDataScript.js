export function StructuredDataScript({ data, id }) {
    if (!data) {
        return null
    }

    const payload = Array.isArray(data) ? data : [data]
    const items = payload.filter(Boolean)

    if (items.length === 0) {
        return null
    }

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(items.length === 1 ? items[0] : items),
            }}
        />
    )
}
