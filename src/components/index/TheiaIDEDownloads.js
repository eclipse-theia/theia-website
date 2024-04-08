/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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

import Background from '../../resources/background-image.png'
import React from 'react'
import { breakpoints } from '../../utils/variables'
import styled from '@emotion/styled'

const StyledHeader = styled.div`
     .header {
        position: relative;
        background-image: url(${Background});
        background-size: cover;
        background-repeat: no-repeat;
        border-bottom: 10px solid #f8f8f8;
        @media(max-width: ${breakpoints.xmd}) {
            padding-top: 15rem;
        }
        &__logo-box {
            margin-bottom: 3rem;
        }
        &__logo {
            height: 3rem;
        }
        .banner__image {
            height: 15rem;
        }
        &__banner {
            padding: 15px;
            text-align: center;
        }
        h1 {
            margin-bottom: 1rem;
            font-size: 2.2rem;
        }
        .btn {
            max-width: 21rem;
            @media(max-width: 385px) {
                &:not(:last-child) {
                    margin-right: 0;
                }
            }
            @media(max-width: 800px) {
                &:not(:last-child) {
                    margin-right: 2rem;
                }
            }
        }
        &__github-details {
            position: absolute;
            top: 10rem;
            right: 2rem;
        }
        &__buttons {
            display:flex;
            justify-content: space-evenly;
            align-items: center;
            text-align: center;
            padding: 3rem 10vw;
            @media(max-width: 800px){
                padding: 3rem 0;
            }
            
        }
        iframe {
            height: 2.5rem;
            width: 12rem;
        }
    }
`

const TheiaIDEDownloads = () => (
    <StyledHeader>
            <div id="theiaidedownload" className="row">
                <h1 >
                    Download Theia IDE
                </h1>
                
                NOTE: The Eclipse Theia IDE is currently in beta. While we are continuing to make improvements and add functionality, we welcome and value your feedback (see below).
                
                <div className="header__buttons">
                    <a className="btn btn--cta" href="https://www.eclipse.org/downloads/download.php?file=/theia/ide/latest/windows/TheiaIDESetup.exe&r=1" rel="noopener">Windows (latest)</a>
                    <a className="btn btn--cta" href="https://www.eclipse.org/downloads/download.php?file=/theia/ide/latest/linux/TheiaIDE.AppImage&r=1" rel="noopener">Linux (latest)</a>
                    <a className="btn btn--cta" href="https://www.eclipse.org/downloads/download.php?file=/theia/ide/latest/macos/TheiaIDE.dmg&r=1" rel="noopener">MacOS (latest)</a>
                 </div>
                
                 <center>
                 You can also <a href="https://try.theia-cloud.io/">try the latest version of the Theia IDE online</a>. The online test version is limited to 30 minutes per session and hosted via <a href="https://github.com/eclipsesource/theia-cloud">Theia.cloud</a>.<br></br>
                 Finally, we provide an <a href="https://github.com/eclipse-theia/theia-blueprint?tab=readme-ov-file#docker">experimental Docker image</a> for hosting the Theia IDE online.
                 </center>
                 <br></br>
            </div>
            <div className="row">
                <h1>Feature Requests and Bug Reports</h1>
                Help us make the Theia IDE even better, by <a href="https://github.com/eclipse-theia/theia/discussions">sharing your experience and suggestions</a>.
                The features found in the Eclipse Theia IDE are based on Eclipse Theia and the available extensions/plugins. For more details please see the <a href="https://github.com/eclipse-theia/theia">Eclipse Theia GitHub Repository</a>. The Eclipse Theia IDE only packages existing Eclipse Theia functionality and installers. If you believe there is a mistake in packaging, something needs to be added to the packaging or the installers do not work properly, please <a href="https://github.com/eclipse-theia/theia-blueprint/issues/new/choose">open an issue on GitHub</a> to let us know.
                <h1>Support</h1>
                Need help with Theia? To get support by the community go to the <a href="https://github.com/eclipse-theia/theia/discussions">Discussions at GitHub</a>. To get professional support for Theia see the <a href="/support/">support page</a>.
            </div>
    
    </StyledHeader>
)

export default TheiaIDEDownloads
