import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import Arrow from '../resources/arrow.svg'

const Styled = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10rem;

    .arrow {
        display: inline-block;
        height: 7rem;

        &--left {
            transform: rotate(90deg);
        }

        &--right {
            transform: rotate(270deg);
        }
    }
`

const DocArrowNavigators = ({prev, next}) => (
    <Styled>
        <Link to={`/docs/${prev}`} style={{pointerEvents: !prev && 'none' }}>
            <img src={Arrow} alt="Prev Page" className="arrow arrow--left" style={{opacity: !prev ? '.3' : 1}}/>
        </Link>
        <Link to={`/docs/${next}`} alt="Next Page" style={{pointerEvents: !next && 'none' }}>
            <img src={Arrow} alt="Next Page" className="arrow arrow--right" style={{opacity: !next ? '.3' : 1}} />
        </Link>
    </Styled>
)

export default DocArrowNavigators