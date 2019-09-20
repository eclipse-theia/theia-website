import React from 'react'
import styled from '@emotion/styled'
import { breakpoints, colors } from '../utils/variables'
import { Link } from 'gatsby'
import Background from '../resources/background-image.png'
import TheiaLogoDark from '../resources/theia-logo-dark.svg'

const Styled = styled.div`
    width: 30%;
    min-height: 100vh;
    min-width: 25rem;
    border-right: 10px solid #f8f8f8;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .container {
        position: relative;
        min-height: 100vh;
        min-width: 25rem;
        padding: 10rem 0;
        background-image: url(${Background}), linear-gradient(#fff, #fff);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    @media(max-width: ${breakpoints.xmd}) {
        display: none;
    }

    .logo {
        display: block;
        height: 2.8rem;
        margin: 0 auto 13rem auto;
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

    ul {
        list-style: none;
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
        transition: all .2s;

        &:hover,
        &:focus {
            color: ${colors.blue};
            padding: .2rem 0 .4rem;
            border-bottom: 1px dashed #9dc7d9;
        }
    }

    .caption {
        font-family: 'Anonymous Pro', sans-serif;
        font-weight: bold;
        text-transform: uppercase;

        &:not(:first-of-type) {
            margin-top: 3rem;
        }
    }

    .active {
        color: ${colors.blue};
        padding: .2rem 0 .4rem;
        border-bottom: 1px dashed #9dc7d9;
    }
`

const DocSideBar = () => {
    return (
        <Styled>
            <div className="container">
                <Link to='/'><img className="logo" src={TheiaLogoDark} alt="theia logo" /></Link>
                <ul className="links">
                    <li className="caption">Architecture</li>
                    <li><Link activeClassName='active' to="/docs/architecture/">Overview</Link></li>
                    <li><Link activeClassName='active' to="/docs/extensions/">Extensions</Link></li>
                    <li><Link activeClassName='active' to="/docs/services_and_contributions/">Services and Contributions</Link></li>

                    <li className="caption">Using Theia</li>
                    <li><Link activeClassName='active' to="/docs/composing_applications/">Build your own IDE</Link></li>
                    <li><Link activeClassName='active' to="/docs/authoring_extensions/">Authoring an Extension</Link></li>
                    <li><Link activeClassName='active' to="/docs/authoring_plugins/">Authoring Plug-ins</Link></li>
                    <li><Link activeClassName='active' to="/docs/language_support/">Adding Language Support</Link>
                        <ul style={{listStyle: 'circle', listStylePosition: 'inside'}}>
                            <li style={{ marginLeft: '.6rem', marginTop: '1rem' }}><Link activeClassName='active' to="/docs/textmate/">TextMate Coloring</Link></li>
                        </ul>
                    </li>


                    <li className="caption">Concepts Apis</li>
                    <li><Link activeClassName='active' to="/docs/commands_keybindings/">Commands and Keybindings</Link></li>
                    <li><Link activeClassName='active' to="/docs/preferences/">Preferences</Link></li>
                    <li><Link activeClassName='active' to="/docs/events/">Events</Link></li>
                    <li><Link activeClassName='active' to="/docs/json_rpc/">Communication via JSON-RPC</Link></li>
                    <li><Link activeClassName='active' to="/docs/views">Views</Link></li>
                </ul>
            </div>
        </Styled>
    )
}

export default DocSideBar