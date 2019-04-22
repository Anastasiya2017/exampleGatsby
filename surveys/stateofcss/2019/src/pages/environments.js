import React, { useContext } from 'react'
import TextBlock from '../core/blocks/TextBlock'
import PageHeader from '../core/pages/PageHeader'
import { PageContext } from 'core/pages/pageContext'

const EnvironmentsPage = ({ data }) => {
    const context = useContext(PageContext)

    return (
        <>
            <PageHeader showIntro={false} />
            {context.blocks.map(block => (
                <TextBlock key={block.id} text={`@todo ${block.id}`} />
            ))}
        </>
    )
}

export default EnvironmentsPage
