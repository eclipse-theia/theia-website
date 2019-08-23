import React from 'react'
import styled from '@emotion/styled'
import { breakpoints, colors } from '../utils/variables'
import useDocs from '../hooks/use-docs'
import { Link } from 'gatsby'
import Background from '../resources/background-image.png'
import TheiaLogoDark from '../resources/theia-logo-dark.svg'

const Styled = styled.div`
    width: 30%;
    min-height: 100vh;
    min-width: 25rem;
    padding: 10rem 0;
    background-image: url(${Background});
    background-size: cover;
    background-repeat: no-repeat;
    border-right: 10px solid #f8f8f8;

    @media(max-width: ${breakpoints.xmd}) {
        display: none;
    }

    .logo {
        display: block;
        height: 2.8rem;
        margin: 0 auto 10rem auto;
    }

    .links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        list-style: none;
        min-width: 21rem;
        width: 50%;
        margin: 0 auto;
    }

    li {
        text-align: left;
        &:not(:last-of-type) {
            margin-bottom: .7rem;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .caption {
        font-family: 'Anonymous Pro', sans-serif;
        font-weight: bold;
        text-transform: uppercase;

        &:not(:first-of-type) {
            margin-top: 3rem;
        }
    }
`

const DocSideBar = () => {
    return (
        <Styled>
            <Link to='/'><img className="logo" src={TheiaLogoDark} alt="theia logo" /></Link>
            <ul className="links">
                <li className="caption">Architecture</li>
                <li><Link activeClassName='active' to="/docs/architecture">Overview</Link></li>
                <li><Link activeClassName='active' to="/docs/extensions">Extensions</Link></li>
                <li><Link activeClassName='active' to="/docs/services_and_contributions">Services and Contributions</Link></li>

                <li className="caption">Using Theia</li>
                <li><Link activeClassName='active' to="/docs/composing_applications">Build your own IDE</Link></li>
                <li><Link activeClassName='active' to="/docs/authoring_extensions">Authoring an Extension</Link></li>
                <li><Link activeClassName='active' to="/docs/authoring_plugins">Authoring Plug-ins</Link></li>
                <li><Link activeClassName='active' to="/docs/language_support">Adding Language Support</Link>
                        <li style={{marginLeft: '2rem', marginTop: '.8rem'}}><Link activeClassName='active' to="/docs/textmate">TextMate Coloring</Link></li>
                </li>


                <li className="caption">Concepts Apis</li>
                <li><Link activeClassName='active' to="/docs/commands_keybindings">Commands and Keybindings</Link></li>
                <li><Link activeClassName='active' to="/docs/preferences">Preferences</Link></li>
                <li><Link activeClassName='active' to="/docs/events">Events</Link></li>
                <li><Link activeClassName='active' to="/docs/json_rpc">Communication via JSON-RPC</Link></li>
            </ul>
        </Styled>
    )
}

export default DocSideBar