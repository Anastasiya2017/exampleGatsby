import React from 'react'
import PropTypes from 'prop-types'
import { getToolName } from '../../helpers/wording'
import PeriodicElement from '../elements/PeriodicElement'
import periodicTableData from '../../data/periodic_table.yml'

/*

Take x and y distances, and return distances we want 
to move the element by to avoid collision

*/
const hoverDistance = 40
const getHoverCoords = ({ dx, dy }) => {
    return {
        dx: dx < 0 ? hoverDistance : -hoverDistance,
        dy: dy < 0 ? hoverDistance : -hoverDistance
    }
}

// const QuadrantChartNode = ({ data, x, y, r, styles }) => {
//     return (
//         <Fragment>
//             <circle cx={x} cy={y} r={r} fill={styles.circlesColor} fillOpacity="0.9" />
//             <text
//                 fontSize={Math.max(8, r * 0.7)}
//                 textAnchor="middle"
//                 alignmentBaseline="central"
//                 x={x}
//                 y={y}
//                 fontWeight="normal"
//                 fill={'#333'}
//                 className="Quadrants__Chart__Value"
//             >
//                 {data.i}%
//             </text>
//             <text
//                 alignmentBaseline="central"
//                 x={x + r + 5}
//                 y={y}
//                 fill={styles.labelsColor}
//                 className="Quadrants__Chart__Label"
//             >
//                 {getToolName(data.id)}
//             </text>
//         </Fragment>
//     )
// }

const QuadrantChartNode = ({ data, id, x, y, collisionData }) => {
    return (
        <PeriodicElement
            className={`Quadrants__Chart__PeriodicTableElement ${
                collisionData ? 'Quadrants__Chart__PeriodicTableElement--collision' : ''
            }`}
            x={x}
            y={y}
            symbol={periodicTableData.tools[id]}
            name={getToolName(id)}
            number={`${data.s}%`}
            fire={data.i > 50}
            size={55}
            hoverCoords={getHoverCoords(collisionData)}
        />
    )
}

QuadrantChartNode.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        u: PropTypes.number.isRequired,
        s: PropTypes.number.isRequired,
        i: PropTypes.number.isRequired
    }).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    styles: PropTypes.shape({
        circlesColor: PropTypes.string.isRequired,
        labelsColor: PropTypes.string.isRequired
    }).isRequired
}

export default QuadrantChartNode
