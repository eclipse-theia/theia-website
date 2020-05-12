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
        height: 6rem;

        &--left {
            transform: rotate(90deg);
        }

        &--right {
            transform: rotate(270deg);
        }
    }
`

const DocArrowNavigators = ({prev, next, prevTitle, nextTitle}) => {
    const pTitle = `Go to previous Page ${prevTitle ? `: ${prevTitle}` : ""}`
    const nTitle = `Go to next page ${nextTitle ? `: ${nextTitle}` : ""}`
    return (
    <Styled>
        <Link to={prev} title={pTitle} aria-label={pTitle} style={{pointerEvents: !prev && 'none' }}>
            <img src={Arrow} alt={pTitle} className="arrow arrow--left" style={{opacity: !prev ? '.3' : 1}}/>
        </Link>
        <Link to={next} title={nTitle} aria-label={nTitle} style={{pointerEvents: !next && 'none' }}>
            <img src={Arrow} alt={nTitle} className="arrow arrow--right" style={{opacity: !next ? '.3' : 1}} />
        </Link>
    </Styled>
)
}

export default DocArrowNavigators