import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import NewsletterBlock from '../components/blocks/NewsletterBlock'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import { graphql } from 'gatsby'

const Conclusion = ({ data, rest }) => {
    const projects = data.allProject.edges.map(({ node }) => node)
    return(
    <Layout projects={projects} {...rest}>
        <div>
            <SectionHeader showIntro={false} />
            <TextBlock text={data.file.childMarkdownRemark.html} />

            <NewsletterBlock />
        </div>
    </Layout>
)}

export default Conclusion

export const query = graphql`
    query {
        file(name: { eq: "conclusion-conclusion" }) {
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
