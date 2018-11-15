import React from 'react'
import Layout from '../components/common/Layout'
import { graphql } from 'gatsby'
import TextBlock from '../components/blocks/TextBlock'
import SectionHeader from '../components/elements/SectionHeader'

const title = 'Support Us'

const Support = ({ data }) => {
    const projects = data.allProject.edges.map(({ node }) => node)
    return (
    <Layout projects={projects} title={title}>
        <SectionHeader currentPage={{ title }} showIntro={false} />
        <TextBlock text={data.file.childMarkdownRemark.html} />
    </Layout>
    )
}

export default Support

export const query = graphql`
    query {
        file(name: { eq: "support" }) {
            childMarkdownRemark {
                html
            }
        }
        allProject {
            edges {
                node {
                    id,
                    name,
                    stars,
                    github,
                    description,
                    homepage
                }
            }
        }
    }
`
