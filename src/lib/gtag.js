const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

const getGtag = () => {
    if (typeof window === 'undefined') return null
    window.dataLayer = window.dataLayer || []

    if (typeof window.gtag === 'function') return window.gtag

    const stub = function () {

        window.dataLayer.push(arguments)
    }

    window.gtag = stub
    return stub
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const gaPageView = (url) => {
    if (!GA_TRACKING_ID) return
    const gtag = getGtag()
    if (!gtag) return

    gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const gaEvent = ({ action, category, label, value }) => {
    if (!GA_TRACKING_ID) return
    const gtag = getGtag()
    if (!gtag) return

    gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}

export { GA_TRACKING_ID, gaEvent, gaPageView }
