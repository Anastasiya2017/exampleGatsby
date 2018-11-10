import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import PageTitle from './PageTitle'
import '../../stylesheets/screen.scss'
import Sidebar from './Sidebar'
import Animation from '../elements/Animation'
import withPageData from '../../helpers/withPageData'

class Layout extends PureComponent {
    constructor() {
        super()
        this.state = {
            showSidebar: false,
            showAnim: false
        }
    }

    toggleSidebar = () => {
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    openSidebar = () => {
        this.setState({
            showSidebar: true
        })
    }

    closeSidebar = () => {
        this.setState({
            showSidebar: false
        })
    }

    showAnim = () => {
        this.setState({
            showAnim: true
        })
    }

    render() {
        const title = this.props.currentPage.fullTitle
        const description = 'A short survey about current popular JavaScript technologies.'
        const url = 'http://stateofjs.com'
        const image = 'http://stateofjs.com/images/javascript2017-white.png'

        const meta = [
            { charset: 'utf-8' },
            { name: 'description', content: description },
            // responsive
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            // facebook
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: url },
            { property: 'og:image', content: image },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            // twitter
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image:src', content: image },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },

            // eslint-disable-next-line react/jsx-key
            <script src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript" />
        ]

        const { showPagination = true } = this.props
        const { showAnim } = this.state
        const sidebarClassName = this.state.showSidebar ? 'Sidebar--shown' : 'Sidebar--hidden'

        return (
            <div className={`pagelayout ${sidebarClassName} PageLayout--${showAnim ? 'anim' : ''}`}>
                <Helmet meta={meta}>
                    <title>{title}</title>
                    <script
                        src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js"
                        type="text/javascript"
                    />
                </Helmet>
                <link
                    href="https://fonts.googleapis.com/css?family=Space+Mono:400,400i|Roboto+Slab:300,400,700"
                    rel="stylesheet"
                />
                {this.state.showAnim && <Animation showStart={false} variant="simple" size={70} />}

                <div className="pagelayout__inner">
                    <Sidebar
                        {...this.props}
                        sidebarClassName={sidebarClassName}
                        closeSidebar={this.closeSidebar}
                        showAnim={this.showAnim}
                    />
                    <div className="pagelayout__content">
                        <PageTitle
                            {...this.props}
                            toggleSidebar={this.toggleSidebar}
                            mode="pagination"
                            position="top"
                        />
                        <div className="pagelayout__main">{this.props.children}</div>
                        {showPagination && (
                            <PageTitle
                                {...this.props}
                                toggleSidebar={this.toggleSidebar}
                                mode="pagination"
                                position="bottom"
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default withPageData(Layout)