import React from 'react'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/variables'
import DropDownArrow from '../resources/drop-down-arrow.svg';
import { MENU } from '../docs/menu'

const Styled = styled.div`
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translate(-50%, -2rem);
    z-index: 100;

    @media(max-width: 360px) {
        top: 9rem;
    }

    @media(min-width: ${breakpoints.xmd}) {
        display: none;
    }

    select {
        font: inherit;
        color: inherit;
        padding: 1rem 1.5rem;
        background: #fff;
        border: 1px solid #ddd;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-image: url(${DropDownArrow}),
        linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
    }

    option {
        &:disabled {
            font-family: 'Anonymous Pro', monospace;
            color: inherit;
        }
    }
`

const onSelectTopic = (e) => {
     navigate(e.currentTarget.value)
}

const DocTopicChooser = () => (
    <Styled>
        <select onChange={onSelectTopic} defaultValue="Select A Topic">
             <option value='#' selected={true}>Select A Topic</option>
            {MENU.map((m, i) => (
                <option key={i} value={m.path} disabled={!m.path}>
                    {m.title}
                </option>
            ))}
        </select>
    </Styled>
)

export default DocTopicChooser