import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { ResponsiveBar } from '@nivo/bar'
import theme from '../../nivoTheme'

export default class SectionOpinionsChart extends Component {
    static propTypes = {
        opinions: PropTypes.arrayOf(
            PropTypes.shape({
                survey_id: PropTypes.string.isRequired
            })
        ).isRequired
    }

    render() {
        const { opinions } = this.props
        const surveyData = opinions.find(o => o.survey_id === '2018')

        if (surveyData === undefined) {
            return (
                <div style={{ color: 'red' }}>
                    No data found found for survey: <strong>2018</strong>
                    <br />
                    <br />
                </div>
            )
        }

        const sortedData = sortBy(surveyData.tools, 'would_use')

        return (
            <div style={{ height: 360 }}>
                <ResponsiveBar
                    margin={{
                        bottom: 80
                    }}
                    keys={[
                        'would_use',
                        'would_not_use',
                        'interested',
                        'not_interested',
                        'never_heard'
                    ]}
                    indexBy="tool_id"
                    data={sortedData}
                    theme={theme}
                    colors={theme.opinionColors}
                    labelFormat=".2s"
                    labelTextColor="inherit:darker(1.6)"
                    labelSkipWidth={32}
                    labelSkipHeight={20}
                    padding={0.6}
                    axisLeft={null}
                    /*
                    axisBottom={{
                        renderTick: tick => {
                            return (
                                <g
                                    key={tick.key}
                                    transform={`translate(${tick.x - 30},${tick.y +
                                    14})`}
                                >
                                    <PeriodicTableElementSvg
                                        size={60}
                                        id={tick.value.slice(0, 2)}
                                        //color="#72D7D1"
                                    />
                                </g>
                            )
                        },
                    }}
                    */
                />
            </div>
        )
    }
}
