import React from 'react'
import ReactMarkdown from 'react-markdown'
import authors from '../data/authors.yaml'

const About = () => (
    <div className="block about">
        <h3 className="block-heading about__heading">The State of CSS is Made by:</h3>
        <div className="about__authors">
            {authors.map(({ name, slug, bio, url }) => (
                <div key={slug} className="about__author">
                    <h3 className="about__author__name">
                        <a href={url}>{name}</a>
                    </h3>
                    <div className="about__author__bio">
                        <ReactMarkdown source={bio} />
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default About
