import React from 'react'
import addParagraphs from '../../helpers/paragraphs'
import parseBold from '../../helpers/bold'

const TextBlock = ({ text, title }) => (
    <div className="block block--text">
        {title && <h3 className="block__title">{title}</h3>}
        {text && <div dangerouslySetInnerHTML={{ __html: parseBold(addParagraphs(text)) }} />}
    </div>
)

export default TextBlock
