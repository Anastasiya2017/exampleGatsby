import React from 'react'
import bowser from 'bowser'
import ReactGA from 'react-ga'
import qs from 'qs'

export default class TakeSurvey extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        setTimeout(() => {
            // geo tracking
            if (typeof geoip2 !== 'undefined') {
                // eslint-disable-next-line no-undef
                geoip2.city(
                    result => {
                        this.setState({
                            location: result.country.names.en,
                            city: result.city.names.en
                        })
                    },
                    error => {
                        console.log(error)
                    }
                )
            }

            // ga id
            if (ReactGA.ga() && ReactGA.ga().getAll) {
                this.setState({
                    gaId: ReactGA.ga()
                        .getAll()[0]
                        .get('clientId')
                })
            }
        }, 200)

        // eslint-disable-next-line no-undef
        const browser = bowser.getParser(window.navigator.userAgent)
        const info = browser.parse().parsedResult

        // eslint-disable-next-line no-undef
        const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true })

        // browser data
        const browserData = {
            device: info.platform.type,
            browser: info.browser.name,
            version: info.browser.version,
            os: info.os.name,
            // eslint-disable-next-line no-undef
            referrer: document.referrer,
            source: queryString.source,
        }

        this.setState(browserData)
    }

    render() {
        return (
            <div className="Block Block--takeSurvey TakeSurvey">
                <a
                    className="TakeSurvey__Button"
                    href={`http://stateofjs.typeform.com/to/TxDuh6?browser=${
                        this.state.browser
                    }&version=${this.state.version}&os=${this.state.os}&referrer=${
                        this.state.referrer
                    }&city=${this.state.city}&location=${this.state.location}&device=${
                        this.state.device
                    }&gaid=${this.state.gaId}&source=${this.state.source}`}
                >
                    Take Survey
                </a>

                <p className="TakeSurvey__Note">
                    Note: to improve results relevance, we keep track of data such as your referrer,
                    location, device, browser, and OS.
                </p>
            </div>
        )
    }
}