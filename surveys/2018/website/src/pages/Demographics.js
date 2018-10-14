import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import Layout from '../components/common/Layout'
import ParticipationMapChart from '../components/charts/ParticipationMapChart'
import { graphql } from 'gatsby'

const text = `
Demographics intro TODO.
`

const Demographics = props => {
    console.log(props.data)
    return (
        <Layout {...props}>
            <div>
                <TextBlock text={text} />
                <ParticipationMapChart />
            </div>
        </Layout>
    )
}

export default Demographics

export const query = graphql`
    query demographics {
        resultsYaml {
            demographics {
                by_continent {
                    continent
                    by_survey {
                        survey
                        salary {
                            salary_range_work_for_free
                            salary_range_0_10
                            salary_range_30_50
                            salary_range_50_100
                            salary_range_100_200
                            salary_range_more_than_200
                        }
                        company_size {
                            company_size_1
                            company_size_1_5
                            company_size_5_10
                            company_size_10_20
                            company_size_20_50
                            company_size_50_100
                            company_size_100_1000
                            company_size_more_than_1000
                        }
                    }
                }
            }
        }
    }
`
