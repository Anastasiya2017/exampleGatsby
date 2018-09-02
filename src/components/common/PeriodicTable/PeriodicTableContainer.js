import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flatten, times } from 'lodash'

import settings from '../../../data/periodic-table.yaml'
import PeriodicTable from './PeriodicTable'

const repeatArray = (array, number) => times(number).reduce(acc => acc.concat(array), [])

const PeriodicTableContainer = ({ data }) => {
    const allProjects = data.allProject.edges.map(edge => edge.node)
    const findProject = id => allProjects.find(project => project.id === id)
    const categories = Object.values(settings)
    const addBestOfJavaScriptData = project => {
        const foundProject = findProject(project.id)
        return { ...foundProject, ...project } // the order matters, `project` values (from yaml) override `foundProject` values
    }
    const elements = flatten(
        categories.map(({ color, projects }) =>
            projects.map(project => ({ ...addBestOfJavaScriptData(project), color }))
        )
    )
    // Let's duplicate N times data to fill the screen
    const repeatedElements = repeatArray(elements, 4)
    return <PeriodicTable elements={repeatedElements} />
}

PeriodicTableContainer.propTypes = {
    data: PropTypes.object.isRequired, // provided by GraphQL data store (see `layouts/index.js`)
}

export default PeriodicTableContainer

// used in layouts/index.js
export const periodicTableFragment = graphql`
  fragment PeriodicTableFragment on Project {
    id
    stars
    name
  }
`;