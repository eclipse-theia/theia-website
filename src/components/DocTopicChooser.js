import React from 'react'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/variables'
import DropDownArrow from '../resources/drop-down-arrow.svg';

const data = [
    {
        title: "Architecture"
    },
    {
        title: "Overview",
        slug: "architecture"
    },
    {
        title: "Extensions",
        slug: "extensions"
    },
    {
        title: "Services and Contributions",
        slug: "services_and_contributions"
    },
    {
        title: "Using Theia",
    },
    {
        title: "Build your own IDE",
        slug: "composing_applications"
    },
    {
        title: "Authoring an Extension",
        slug: "authoring_extensions"
    },
    {
        title: "Authoring Plug-ins",
        slug: "authoring_plugins"
    },
    {
        title: "Adding Language Support",
        slug: "language_support"
    },
    {
        title: "TextMate Coloring",
        slug: "textmate"
    },
    {
        title: "Concept APIs"
    },
    {
        title: "Commands and Keybindings",
        slug: "commands_keybindings"
    },
    {
        title: "preferences",
        slug: "preferences"
    },
    {
        title: "Events",
        slug: "events"
    },
    {
        title: "Communication via JSON-RPC",
        slug: "json_rpc"
    }
]

const Styled = styled.div`
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translate(-50%, -2rem);
    z-index: 100;

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
        <select onChange={onSelectTopic}>
            <option value='#' selected={true}>Select A Topic</option>
            {data.map(m => {
                return <>
                    <option key={m.slug} value={`/docs/${m.slug}`} disabled={!m.slug} >{m.title}</option>
                </>
            })}
        </select>
    </Styled>
)

export default DocTopicChooser