/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { breakpoints, colors } from '../utils/variables'
import Hamburger from '../resources/hamburger.svg'
import Multiply from '../resources/multiply.svg'
import TheiaLogoDark from '../resources/theia-logo-dark.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const StyledNav = styled.div`
    @media(max-width: ${breakpoints.xmd}) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    &.fixed {
        position: fixed;
        background: #fff;
        width: 100%;
    }

    .nav {
        display: flex;
        position: relative;
        padding-top: 5rem;
        margin-bottom: 7rem;

        @media(max-width: ${breakpoints.xmd}) {
            flex-direction: column;
            padding-top: 0;

            .navIsRendered {
                display: flex;
            }

            .navIsNotRendered {
                display: none;
            }

            &__header {
                display: flex;
                justify-content: space-between;
                flex: 1;
                padding: 3rem 2rem;
            }

        }

        .logo {
            height: 2.7rem;
            color: transparent;
        }

        &__button {
            border: none;
            background: #fff;
            color: transparent;
            transition: all .2s;

            &:hover,
            &:focus {
                transform: scale(1.1);
            }

            img {
                height: 3.5rem;

                @media(max-width: ${breakpoints.sm}) {
                    height: 3rem;
                }
            }

            @media(min-width: ${breakpoints.xmd}) {
                display: none;
            }
        }

        &__items {
            display: flex;
            justify-content: flex-end;
            list-style: none;
            width: 100%;
            z-index: 1000;

            @media(max-width: ${breakpoints.xmd}) {
                height: 95vh;
                flex-direction: column;
                text-align: center;
                justify-content: center;
                align-items: center;
                background: white;
            }
        }

        &__item {
            margin-bottom: 3rem;

            @media(min-width: ${breakpoints.xmd}) {
                &:not(:last-child) {
                    margin-right: 3rem;
                }
            }

            @media(max-width: ${breakpoints.xmd}) {
                width: 100vw;
            }
        }

        &__link {
            position: relative;
            width: 100%;
            text-decoration: none;
            color: ${colors.greyOne};
            display: block;
            padding-bottom: .8rem;

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 100%;
                left: 0;
                border-bottom: 2px solid ${colors.greyOne};
                transition: all .4s cubic-bezier(0,.5,0, 1);

                @media(max-width: ${breakpoints.xmd}) {
                    display: none;
                }
            }

            &:hover,
            &:focus {
                color: ${colors.blue};

                @media(max-width: ${breakpoints.xmd}) {
                    transform: scale(1.2);
                }

                &::after {
                    right: 0;
                    border-color: ${colors.blue};
                }
            }
        }
    }

    .active {
        color: ${colors.blue};
    }
`

const Nav = ({ shouldRenderLogo }) => {
    const [isNavRendered, setIsNavRendered] = useState(false)
    const navRef = useRef(null) 

    const toggleNavigation = () => {
        setIsNavRendered(!isNavRendered)
    }

    const handleScroll = () => {
        if (window.scrollY > 200) {
            navRef.current.classList.add('fixed')
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {

        }
    })

    return (
        <StyledNav ref={navRef}>
            <nav className="nav" style={isNavRendered ? { background: '#fff', height: '100vh' } : {}}>
                <div className="nav__header">
                    {shouldRenderLogo ?
                        <Link to="/" className="logo-container">
                            <img className="logo" src={TheiaLogoDark} alt="theia logo" />
                        </Link> : <span aria-hidden={true}>&nbsp;</span>
                    }
                    <div className="nav__button-container">
                        <button
                            className="nav__button"
                            aria-label="Navigation Toggle"
                            onClick={toggleNavigation}
                        >
                            {isNavRendered ? <img src={Multiply} alt="close menu icon" /> : <img src={Hamburger} alt="hamburger menu icon" />}
                        </button>
                    </div>
                </div>
                <ul className={`nav__items ${isNavRendered ? 'navIsRendered' : 'navIsNotRendered'}`}>
                    <li className="nav__item">
                        <Link to="/#features" className="nav__link">Features</Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/docs/" className="nav__link" activeClassName="active">Documentation</Link>
                    </li>
                    <li className="nav__item">
                        <a href="https://community.theia-ide.org/" target="_blank" rel="noopener" className="nav__link">Community</a>
                    </li>
                    <li className="nav__item">
                        <a href="https://www.typefox.io/theia/" className="nav__link" target="_blank" rel="noopener">Support</a>
                    </li>
                    <li className="nav__item">
                        <a href="https://www.typefox.io/trainings/" className="nav__link" target="_blank" rel="noopener">Training</a>
                    </li>
                </ul>
            </nav>
        </StyledNav>
    )
}

export default Nav
