import React from 'react'
// import Link from 'gatsby-link'
import DocumentTitle from 'react-document-title'

// import ReactGA from 'react-ga'

import '../stylesheets/screen.scss'
import Share from '../components/common/Share.js'
import Results2016 from '../components/common/Results2016.js'

import TextBlock from '../components/blocks/TextBlock.js'
// import Stats from '../components/common/Stats.js'
import Comments from '../components/common/Comments.js'

import FooterContents from '../data/footer.md'
console.log(FooterContents)
const homeContents = `
The JavaScript world is richer and messier than ever.

So we collected data from over 20,000 developers, asking them questions on topics ranging from front-end frameworks and state management, to build tools and testing libraries.

You'll find out which libraries developers want to learn next, and which have the best satisfaction ratings. And hopefully, get a better understanding of the ever-changing JavaScript ecosystem.

<div class="view-results"><a class="button large-button" href="/2017/introduction/">View Results</a></div>
`

export default class Index extends React.Component {
    render() {
        return (
            <DocumentTitle title="The State Of JavaScript">
                <div className="results-container content home">
                    <h1 className="logo">
                        <img src="images/javascript2017.svg" alt="The State Of JavaScript" />
                        {/*<div className="logo-1"/>
            <div className="logo-2"/>*/}
                    </h1>

                    <div className="bubbles">
                        <h3 className="bubble bubble-great">
                            <img src="images/left-speech-bubble.svg" />
                            <span>JavaScript is great!</span>
                        </h3>
                        <h3 className="bubble bubble-mess">
                            <img src="images/right-speech-bubble.svg" />
                            <span>JavaScript is a mess!</span>
                        </h3>
                    </div>

                    <div className="intro section-border section-narrow">
                        <TextBlock text={homeContents} />
                    </div>
                    {/*<Stats />*/}

                    <Results2016 />

                    <Share />

                    <Comments />

                    <div className="footer home-footer">
                        <TextBlock><FooterContents/></TextBlock>
                    </div>

                </div>
            </DocumentTitle>
        )
    }
}
