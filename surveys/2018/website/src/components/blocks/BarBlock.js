import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BarChart from '../charts/BarChart'
import BlockTitle from '../elements/BlockTitle'

export default class BarBlock extends Component {
    state = {
        mode: 'compare'
    }

    static propTypes = {
        description: PropTypes.string,
        title: PropTypes.string,
        chart: PropTypes.string,
        data: PropTypes.array.isRequired,
        projects: PropTypes.array.isRequired
    }

    render() {
        const { title, data, chart, description, projects } = this.props
        return (
            <div className="block block--chart block--othersbar">
                <BlockTitle chart={chart} title={title} projects={projects} />
                <div className="block__description">
                    <p>{description}</p>
                </div>
                <div className="capture others-wrapper">
                    <BarChart data={data} projects={projects} />
                </div>
            </div>
        )
    }
}
