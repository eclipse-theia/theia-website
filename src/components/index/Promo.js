import React from 'react'

import styled from '@emotion/styled'
import { breakpoints } from '../../utils/variables'

const StyledPromo = styled.div`
    display: flex;
    border: 2px solid #ebebeb;

    &:nth-child(2n) {
        flex-direction: row-reverse;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
        }
    }

    @media(max-width: ${breakpoints.md}) {
        flex-direction: column;
        max-width: 60rem;
        margin: 0 auto;
    }

    &:not(:last-child) {
        margin-bottom: 10rem;
    }

    .promo__text {
        width: 50%;
        padding: 9rem 5rem;

        @media(max-width: ${breakpoints.md}) {
            width: 100%;
            max-width: 60rem;
        }
    }

    .promo__media {
        position: relative;
        width: 50%;
        z-index: -1000;

        @media(max-width: ${breakpoints.md}) {
            width: 100%;
            max-width: 60rem;
        }

        &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #8c9bae;
            z-index: 1000;
            opacity: .1;
        }
    }

    .promo__video {
        width: 100%;
    }

    p {
        margin-top: 3rem;
    }
`

const Promo = ({ 
    title, 
    para, 
    videoSrc 
}) => (
    <StyledPromo className="promo">
        <div className="promo__text">
            <h3 className="heading-tertiary">{title}</h3>
            {para}
        </div>
        <div className="promo__media">
            <video autoPlay loop muted playsInline className="promo__video">
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    </StyledPromo>
)
export default Promo