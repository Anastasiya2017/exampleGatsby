import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'core/Layout'
import PageHeader from 'core/pages/PageHeader'
import ToolOpinionBlock from './blocks/ToolOpinionBlock'

const ToolsTemplate = ({ pageContext, data, ...rest }) => {
    return (
        <Layout {...rest} pageContext={pageContext}>
            <PageHeader
                introduction={
                    data.introduction !== null
                        ? data.introduction.html
                        : `[missing] ${pageContext.id} introduction.`
                }
            />
            {pageContext.blocks.map(block => {
                const blockData = data.aggs.aggregations.find(a => a.id === block.id)
                const resources = data.aggs.fields.resources.find(r => r.id === block.id)

                if (!blockData) {
                    return <div key={block.id}>No data available for tool: {block.id}</div>
                }

                return (
                    <ToolOpinionBlock
                        key={block.id}
                        block={block}
                        buckets={blockData.buckets}
                        resources={resources}
                    />
                )
            })}
        </Layout>
    )
}

export default ToolsTemplate

export const query = graphql`
    query toolsByLocale($id: String!, $locale: String!) {
        introduction: markdownRemark(
            frontmatter: {
                type: { eq: "introduction" }
                page: { eq: $id }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        aggs: toolsYaml(section_id: { eq: $id }) {
            id
            aggregations {
                id
                total
                buckets {
                    id
                    count
                }
            }
            fields {
                resources {
                    id
                    github {
                        name
                        full_name
                        description
                        url
                        stars
                        forks
                        opened_issues
                        homepage
                    }
                }
            }
        }
    }
`