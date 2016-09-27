import React from 'react'
import DocumentTitle from 'react-document-title'
import parseCSV from '../../helpers/parseCSV.js'

import StackedBlock from '../../components/blocks/StackedBlock.js'
import VerticalBlock from '../../components/blocks/VerticalBlock.js'
import HorizontalBlock from '../../components/blocks/HorizontalBlock.js'
import SectionHeatmapBlock from '../../components/blocks/SectionHeatmapBlock.js'
import Pagination from '../../components/Pagination.js'
import PageTitle from '../../components/PageTitle.js'
import AuthorBlock from '../../components/blocks/AuthorBlock.js'
import TLDRBlock from '../../components/blocks/TLDRBlock.js'
import TwitterBlock from '../../components/blocks/TwitterBlock.js'

import stacked from '../../data/buildtools/results.csv'
import other from '../../data/buildtools/other.csv'
import happiness from '../../data/buildtools/happiness.csv'

import tldrContents from '../../data/buildtools/tldr.md'
import resultsContents from '../../data/buildtools/results.md'
import heatmapContents from '../../data/buildtools/heatmap.md'
import otherContents from '../../data/buildtools/other.md'
import happinessContents from '../../data/buildtools/happiness.md'

const section = 'buildtools'
const title = 'Build Tools'
const items = ['Webpack', 'Grunt', 'Gulp', 'Browserify']

const BuildTools = () =>
  <DocumentTitle title={title}>
    <div className="results-container">
      <PageTitle section={section} />
      <TLDRBlock contents={tldrContents} />
      <StackedBlock
        data={parseCSV(stacked)}
        contents={resultsContents}
        section={section}
        title={title}
      />
      <SectionHeatmapBlock
        rows={items}
        contents={heatmapContents}
        title="How likely are build tool users to also use other technologies?"
      />
      <VerticalBlock data={parseCSV(other)} contents={otherContents} title="Other Build Tools" />
      <HorizontalBlock data={parseCSV(happiness)} contents={happinessContents} title="On a scale of 1 to 5, how happy are you with your current build tools?" />
      <AuthorBlock section={section} />
      <Pagination section={section} />
      <TwitterBlock section={section} />
    </div>
  </DocumentTitle>

export default BuildTools
