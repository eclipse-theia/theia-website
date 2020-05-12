import React from 'react'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/variables'

const StyledDocImage = styled.div`
    .docimage {
        width: ${({width}) => width ? width : '100%'};
        min-width: 30rem;
        margin: 2rem 0;
        &-container {
            max-width: 114.5rem;
            margin: 0 auto;

            @media(max-width: ${breakpoints.sm}) {
                overflow-x: scroll;
            }
        }
    }
`

const DocImage = ({ name, alt, shadow, width , styles}) => (
    <StyledDocImage width={width}>
        <div className="docimage-container">
            <img className="docimage" src={`/${name}`} alt={alt} style={{boxShadow: shadow ? "0 1.5rem 3rem rgba(0,0,0, .25)" : null, ...styles}}/>
        </div>
    </StyledDocImage>
)

export default DocImage