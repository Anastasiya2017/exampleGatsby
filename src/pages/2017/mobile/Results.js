import React from 'react'
import mobileData from '../../../data/mobile.json'
import ResultsBlock from '../../../components/blocks/ResultsBlock'
import * as dto from '../../../dto'

const data = dto.experience(mobileData.experience)

const MobileExperience = () => (
    <ResultsBlock
        title="Mobile frameworks"
        data={data}
        description={
            <div className="description">
                <p>
                    The landscape for building mobile apps with JavaScript is still very young, and
                    as expected, the Native Apps category still pulls in the highest awareness
                    rating of the survey, as well as a very high satisfaction rating.
                </p>
                <p>
                    The challenge with native platforms is a doubling of cost/effort when you want
                    to cover more platforms. This was often a non-issue in the past, because
                    customers and clients of mine would only care about targeting iOS thanks to its
                    huge userbase.
                </p>
            </div>
        }
    />
)

export default MobileExperience
