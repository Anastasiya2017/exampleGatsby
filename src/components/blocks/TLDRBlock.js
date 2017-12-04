import React from 'react'
import PropTypes from 'prop-types'
import SectionTitle from './SectionTitle.js'
import classNames from 'classnames'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const TLDRBlock = props => {
    return (
        <div className={classNames('tldr', 'section', 'section-layout-b', props.className)}>
            <div className="section-contents-wide">
                <div className="tldr-inner">
                    <h2>TL;DR</h2>
                    <div className="tldr-contents">
                        <props.contents />
                    </div>
                </div>
            </div>
        </div>
    )
}

TLDRBlock.propTypes = {
    className: PropTypes.string,
    contents: PropTypes.func,
}

export default TLDRBlock
