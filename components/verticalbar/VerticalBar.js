import React from 'react'
// import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Chart from './Chart.js'

export default class VerticalBar extends React.Component {

  render () {
    return (
      <div className={classNames('chart', 'vertical-chart')}>
        <h4 className="chart-block-title">{this.props.chartTitle}</h4>
        <Chart {...this.props} />
      </div>
    )
  }
}

VerticalBar.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
}
