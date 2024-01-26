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
import styled from '@emotion/styled'
import Background from '../resources/background-image.png'
import TwitterLogo from '../resources/twitter.svg'
import GithubLogo from '../resources/github.svg'
import DiscourseLogo from '../resources/discourse.svg'

const StyledFooter = styled.div`
    .footer {
        padding: 4rem 0;
        text-align: center;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-top: 10px solid #f8f8f8;

        &__icons {
            display: flex;
            justify-content: center;
            margin: 2rem 0;
        }

        &__icon {
            height: 3rem;
            display: block;
        }

        &__link {
            &:not(:last-child) {
                margin-right: 3rem;
            }
        }

        &__copyright {
            margin: 2rem 0;
        }
    }
`

const Footer = ({background}) => (
    <StyledFooter>
        <footer className="footer" role="contentinfo" style={{background: background ? `url(${Background})` : null}}>
            <p>Join the community!</p>
            <div className="footer__icons">
                <a href="https://twitter.com/theia_ide" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <img src={TwitterLogo} alt="Twitter Logo" className="footer__icon" />
                </a>
                <a href="https://github.com/eclipse-theia/theia" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <img src={GithubLogo} alt="Github Logo" className="footer__icon" />
                </a>
            </div>
            <p className="footer__copyright"><a target="_blank" rel="noopener noreferrer" href="https://projects.eclipse.org/projects/ecd.theia/">About</a> | <a target="_blank" rel="noopener noreferrer" href=" http://www.eclipse.org/legal/privacy.php">Privacy Policy</a> | <a target="_blank" rel="noopener noreferrer" href=" http://www.eclipse.org/legal/termsofuse.php">Terms of Use</a> | <a target="_blank" rel="noopener noreferrer" href="http://www.eclipse.org/legal/copyright.php">Copyright Agent</a></p>
            <p>© {(new Date()).getFullYear()} by <a href="https://www.eclipse.org/org/" target="_blank" rel="noopener">Eclipse Foundation</a></p>
        </footer>
    </StyledFooter>
)

export default Footer
