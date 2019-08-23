import React from 'react'
import styled from '@emotion/styled'
import TheiaScreenShot from '../resources/theia-screenshot.png'

const StyledScreenShot = styled.div`
    .screenshot {
        width: 100%;
        &-container {
            max-width: 114.5rem;
            margin: 0 auto;
        }
    }
`

const Screenshot = () => (
    <StyledScreenShot>
        <div className="screenshot-container">
            <img className="screenshot" src={TheiaScreenShot} alt="Screenshot of Theia IDE" />
        </div>
    </StyledScreenShot>
)

export default Screenshot