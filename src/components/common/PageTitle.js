import React from 'react'
import nav from '../../data/nav.json'
import sections from '../../data/sections.json'
import _ from 'lodash'
import slugify from '../../helpers/slugify'

const getTitle = pathname => {

	const currentPage =	_.find(nav.items, item => pathname.indexOf(slugify(item.label)) !== -1 )
	let title = currentPage.fullLabel
	if (currentPage.subPages) {
		const currentSubPage = _.find(currentPage.subPages, subPage => pathname.indexOf(subPage) !== -1 )
		title += ` – ${sections[currentSubPage].fullLabel}`
	}
	return title
}

const PageTitle = ({ location }) =>
    <h2 className="page-title">
		{getTitle(location.pathname)}
    </h2>

export default PageTitle
