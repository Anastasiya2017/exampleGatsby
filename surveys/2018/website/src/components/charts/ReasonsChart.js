import React, { Component } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { reasons } from '../../constants'
import theme from '../../nivoTheme'

const verticalMargin = 30
const innerMargin = 5
const outerMargin = 220
const barHeight = 26

export default class ReasonsChart extends Component {
    render() {
        const { like, dislike } = this.props.reasons

        const dislikeData = reasons.dislike
            .map(reason => {
                const match = dislike.find(r => r.id === reason.id)

                return {
                    reason: reason.label,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        const likeData = reasons.like
            .map(reason => {
                const match = like.find(r => r.id === reason.id)

                return {
                    reason: reason.label,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridColumnGap: '20px',
                    gridRowGap: '20px'
                }}
            >
                <div style={{ textAlign: 'right' }}>what people disliked about it</div>
                <div>what people liked about it</div>
                <div style={{ height: dislikeData.length * barHeight + verticalMargin * 2 }}>
                    <ResponsiveBar
                        layout="horizontal"
                        enableGridX={true}
                        enableGridY={false}
                        enableLabel={false}
                        labelSkipWidth={36}
                        reverse={true}
                        theme={theme}
                        colors={theme.reasonsColors.dislike}
                        data={dislikeData}
                        padding={0.8}
                        borderRadius={2.5}
                        keys={['count']}
                        indexBy="reason"
                        margin={{
                            top: verticalMargin,
                            right: innerMargin,
                            bottom: verticalMargin,
                            left: outerMargin
                        }}
                        axisTop={{}}
                        axisLeft={{
                            tickSize: 0,
                            tickPadding: 10
                        }}
                    />
                </div>
                <div style={{ height: likeData.length * barHeight + verticalMargin * 2 }}>
                    <ResponsiveBar
                        layout="horizontal"
                        enableGridX={true}
                        enableGridY={false}
                        enableLabel={false}
                        labelSkipWidth={36}
                        theme={theme}
                        colors={theme.reasonsColors.like}
                        data={likeData}
                        padding={0.8}
                        borderRadius={2.5}
                        keys={['count']}
                        indexBy="reason"
                        margin={{
                            top: verticalMargin,
                            right: outerMargin,
                            bottom: verticalMargin,
                            left: innerMargin
                        }}
                        axisTop={{}}
                        axisRight={{
                            tickSize: 0,
                            tickPadding: 10
                        }}
                        axisLeft={null}
                    />
                </div>
            </div>
        )
    }
}
