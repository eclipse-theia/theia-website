import React from 'react'

import styled from '@emotion/styled'
import { breakpoints } from '../../utils/variables'
import IconExtension from '../../resources/icon-extension.svg'
import IconCloudScreen from '../../resources/icon-cloud-screen.svg'
import IconOpenSource from '../../resources/icon-open-source.svg'
import { Link } from 'gatsby'
import Feature from './Feature'

const StyledFeatures = styled.div`
    .features {
        padding: 12rem 0;
    }

    .feature__container {
        display: flex;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
        }
    }

`

const features = [
    {
        img: <img src={IconCloudScreen} alt="Cloud Screen" />,
        title: "Cloud & Desktop",
        paragraphs: ['Not sure whether you need a web or desktop version or both?', 'With Theia you can develop one IDE and run it in browsers or native desktop application from a single source.']
    },
    {
        img: <img src={IconOpenSource} alt="Vendor Neutral Open Source" />,
        title: "Vendor Neutral",
        paragraphs: ['The Theia project is hosted at the Eclipse Foundation, a not-for-profit corporation, and is developed by a diverse community.', <p>
            Unlike other "open-source" projects, projects hosted at an Open-Source Foundation are protected against single-vendor decisions against the interest of the diverse community.
            Learn more <a href="https://www.eclipse.org/projects/dev_process/">here</a>.
        </p>]
    },
    {
        img: <img src={IconExtension} alt="Icon Extension" />,
        title: "Extensible",
        paragraphs: ['Theia is designed in a modular way to allow extenders and adopters customizing and extending every aspect of it.', 
        <p>
            Composing a custom IDE-like product is as easy as listing all needed extensions in a package.json file. Adding new
            functionality by implementing <Link to='/docs/authoring_extensions'>
            your own extensions</Link> is easy, too and provides all the flexibility you need.
        </p>]
    }
]

const Features = () => (
    <StyledFeatures>
        <section className="features" id="features">
            <div className="row feature__container">
                {
                    features.map((feature, i) => <Feature {...feature} id={i}/>)
                }
            </div>
        </section>
    </StyledFeatures>
)

export default Features