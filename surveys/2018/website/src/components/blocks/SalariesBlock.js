import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockTitle from '../elements/BlockTitle'
import ChartContainer from '../elements/ChartContainer'
import SalariesBarChart from '../charts/SalariesBarChart'

export default class SalariesBlock extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                survey: PropTypes.string.isRequired,
                average: PropTypes.number.isRequired,
                ranges: PropTypes.arrayOf(
                    PropTypes.shape({
                        range: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired,
        chartId: PropTypes.string.isRequired
    }

    render() {
        const chartData = this.props.data.find(d => d.survey === '2018').ranges

        return (
            <div className="block" id={this.props.chartId}>
                <BlockTitle chartId={this.props.chartId} />
                <ChartContainer>
                    <SalariesBarChart data={chartData} />
                </ChartContainer>
            </div>
        )
    }
}
