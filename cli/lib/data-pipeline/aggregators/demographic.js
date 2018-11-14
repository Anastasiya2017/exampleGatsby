const elastic = require('../loaders/elastic')

const salaryRangeAverages = {
    work_for_free: 0,
    '0_10': 5,
    '10_30': 20,
    '30_50': 40,
    '50_100': 75,
    '100_200': 150,
    more_than_200: 250
}

const countryAndContinentSubAggs = {
    survey: {
        terms: {
            field: 'survey.keyword'
        },
        aggs: {
            gender: {
                terms: {
                    field: 'user_info.gender.keyword'
                }
            },
            salary: {
                terms: {
                    field: 'user_info.salary.keyword'
                }
            },
            company_size: {
                terms: {
                    field: 'user_info.company_size.keyword'
                }
            }
        }
    }
}

exports.salaryAndCompanySizeAndYearsOfExperienceByLocationForSurvey = async (
    locationType,
    survey
) => {
    const result = await elastic.search({
        size: 0,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                'survey.keyword': survey
                            }
                        }
                    ]
                }
            },
            aggs: {
                location: {
                    terms: {
                        size: 200,
                        min_doc_count: 20,
                        field: `user_info.${locationType}.keyword`
                    },
                    aggs: {
                        salary: {
                            terms: {
                                field: 'user_info.salary.keyword'
                            }
                        },
                        company_size: {
                            terms: {
                                field: 'user_info.company_size.keyword'
                            }
                        },
                        years_of_experience: {
                            terms: {
                                field: 'user_info.years_of_experience.keyword'
                            }
                        }
                    }
                }
            }
        }
    })

    return result.aggregations.location.buckets
        .filter(b => b.key !== 'undefined')
        .map(locationBucket => {
            const total = locationBucket.doc_count
            const salaryTotal = locationBucket.salary.buckets.reduce((t, bucket) => {
                return t + salaryRangeAverages[bucket.key] * bucket.doc_count
            }, 0)

            return {
                [locationType]: locationBucket.key,
                total,
                salary: {
                    average: Number((salaryTotal / total).toFixed(1)),
                    ranges: locationBucket.salary.buckets.map(bucket => ({
                        range: bucket.key,
                        count: bucket.doc_count,
                        percentage: Number(((bucket.doc_count / total) * 100).toFixed(1))
                    }))
                }
            }
        })
}

exports.byCountry = async () => {
    const aggs = await elastic.aggs({
        country: {
            terms: {
                size: 200,
                min_doc_count: 1,
                field: 'user_info.country.keyword'
            },
            aggs: countryAndContinentSubAggs
        }
    })

    return aggs.aggregations.country.buckets.filter(b => b.key !== 'undefined').map(country => ({
        country: country.key,
        count: country.doc_count,
        by_survey: country.survey.buckets.map(rawSurvey => ({
            survey: rawSurvey.key,
            count: rawSurvey.doc_count,
            salary: rawSurvey.salary.buckets.reduce(
                (acc, salaryRange) => ({
                    ...acc,
                    [`salary_range_${salaryRange.key}`]: salaryRange.doc_count
                }),
                {}
            ),
            company_size: rawSurvey.company_size.buckets.reduce(
                (acc, companySize) => ({
                    ...acc,
                    [`company_size_${companySize.key}`]: companySize.doc_count
                }),
                {}
            )
        }))
    }))
}

exports.byContinent = async () => {
    const aggs = await elastic.aggs({
        continent: {
            terms: {
                field: 'user_info.continent.keyword'
            },
            aggs: countryAndContinentSubAggs
        }
    })

    return aggs.aggregations.continent.buckets
        .filter(b => b.key !== 'undefined')
        .map(continent => ({
            continent: continent.key,
            count: continent.doc_count,
            by_survey: continent.survey.buckets.map(rawSurvey => ({
                survey: rawSurvey.key,
                count: rawSurvey.doc_count,
                gender: rawSurvey.gender.buckets.map(b => ({
                    id: b.key,
                    count: b.doc_count
                })),
                salary: rawSurvey.salary.buckets.reduce(
                    (acc, salaryRange) => ({
                        ...acc,
                        [`salary_range_${salaryRange.key}`]: salaryRange.doc_count
                    }),
                    {}
                ),
                company_size: rawSurvey.company_size.buckets.reduce(
                    (acc, companySize) => ({
                        ...acc,
                        [`company_size_${companySize.key}`]: companySize.doc_count
                    }),
                    {}
                )
            }))
        }))
}

exports.participationByLocation = async locationType => {
    const result = await elastic.aggs({
        by_survey: {
            terms: {
                field: 'survey.keyword'
            },
            aggs: {
                location: {
                    terms: {
                        field: `user_info.${locationType}.keyword`,
                        size: 200
                    }
                }
            }
        }
    })

    return result.aggregations.by_survey.buckets.map(surveyBucket => {
        const total = surveyBucket.doc_count

        return {
            survey: surveyBucket.key,
            total,
            by_country: surveyBucket.location.buckets.map(locationBucket => {
                return {
                    country: locationBucket.key,
                    count: locationBucket.doc_count,
                    percentage: Number(((locationBucket.doc_count / total) * 100).toFixed(2))
                }
            })
        }
    })
}
exports.participationByContinent = async () => exports.participationByLocation('continent')
exports.participationByCountry = async () => exports.participationByLocation('country')

exports.genderBreakdown = async () => {
    const result = await elastic.aggs({
        by_survey: {
            terms: {
                field: 'survey.keyword'
            },
            aggs: {
                gender: {
                    terms: {
                        field: 'user_info.gender.keyword'
                    }
                }
            }
        }
    })

    return result.aggregations.by_survey.buckets.map(surveyBucket => {
        const total = surveyBucket.doc_count

        return {
            survey: surveyBucket.key,
            total,
            by_gender: surveyBucket.gender.buckets.map(genderBucket => {
                return {
                    gender: genderBucket.key,
                    count: genderBucket.doc_count,
                    percentage: Number(((genderBucket.doc_count / total) * 100).toFixed(2))
                }
            })
        }
    })
}
