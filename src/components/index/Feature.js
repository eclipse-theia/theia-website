import React from 'react'

import styled from '@emotion/styled'
import { breakpoints } from '../../utils/variables'


const StyledFeature = styled.div`
    flex: 3.33%;

    &:not(:last-child) {
            margin-right: 8rem;

        @media(max-width: ${breakpoints.md}) {
            margin: 0 0 4rem 0;
        }
    }

    & > div {
        text-align: center;
    }

    h3 {
        margin: 2rem 0 3rem;
    }

    & > p {
        margin: 0 auto;
        margin-bottom: 1rem;
        max-width: 45rem;
    }

    img {
        height: 7rem;
    }
`

const Feature = ({ img, title, paragraphs }) => (
    <StyledFeature className="feature">
        <div>
            {img}
            <h3 className="heading-tertiary">{title}</h3>
        </div>
        {
            paragraphs.map((p, i) => <p key={`${i}${title}`}>{p}</p>)
        }
    </StyledFeature>
)

export default Feature