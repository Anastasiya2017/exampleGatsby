import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { PageContext } from 'core/pages/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'
import PageHeader from 'core/pages/PageHeader'
import FeaturesScatterplotBlock from './blocks/FeaturesScatterplotBlock'
import { mergeFeaturesResources } from './featuresHelpers'

const FeaturesConclusionTemplate = ({ data }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    const features = mergeFeaturesResources(data.features.aggregations, data.features.fields.resources)

    return (
        <>
            <PageHeader
                title={translate('page.features_conclusion', {
                    values: { section: translate(`features.${context.section}`) }
                })}
                introduction={
                    data.conclusion !== null
                        ? data.conclusion.html
                        : `[missing] ${context.section} conclusion.`
                }
            />
            <FeaturesScatterplotBlock
                features={features}
            />
        </>
    )
}

export default FeaturesConclusionTemplate

export const query = graphql`
    query featuresConclusionByLocale($section: String!, $locale: String!) {
        conclusion: markdownRemark(
            frontmatter: {
                type: { eq: "conclusion" }
                page: { eq: $section }
                locale: { eq: $locale }
            }
        ) {
            html
        }
        features: featuresUsageYaml(section_id: { eq: $section }) {
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
                    mdn {
                        locale
                        url
                        title
                        summary
                    }
                    caniuse {
                        title
                        spec
                        links {
                            title
                            url
                        }
                        stats {
                            browser
                            by_version {
                                version
                                support
                            }
                        }
                    }
                }
            }
        }
    }
`
