/********************************************************************************
 * Copyright (C) 2022 EclipseSource and others.
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

import Nav from './Nav'
import React from 'react'
import { breakpoints } from '../utils/variables'
import styled from '@emotion/styled'
import Background from '../resources/background-image.png'

const StyledResources = styled.div`
.header {
    position: relative;
    background-image: url(${Background});
    background-size: cover;
    padding-bottom: 3rem;
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
}
heading-primary {
    margin-bottom: 1rem;
    font-size: 3.4rem;
}
.heading-secondary {
    font-size: 3rem;
    margin-bottom: 2rem;
}
.heading-tertiary {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}
.category {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
.category:not(:last-child) {
    border-bottom: 1px solid #ccc;
}
.frameworks {
    padding: 0.5rem 0;
}
.icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-size: contain;
    background-repeat: no-repeat;
}
.module-listing {
    margin-left: 3rem
}
`

const communityReleases = [
    {
        name: 'Theia 1.43.x (2023-11) - planned',
        releasedate: 'November 30th, 2023',
        releasecandidatedate: 'October 26th, 2023',
        technologiesin: 'December 7th, 2023',
        releaseanouncement: 'December 14th, 2023',
        announcementurl: '',
        frameworks: [
            {
                title: 'Eclipse GLSP',
                url: 'https://www.eclipse.dev/glsp/',
                version: 'TBD',
                modules: []
            },
            {
                title: 'Eclipse EMF.cloud',
                url: 'https://www.eclipse.dev/emfcloud/',
                version: '0.8.0-theia-cr03',
                modules: [
                    { modulename: '@eclipse-emfcloud/jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/jsonforms-property-view/v/0.8.0-theia-cr03' }
                ]
            },
            {
                title: 'Eclipse Sprotty',
                url: 'https://www.eclipse.dev/sprotty/',
                version: 'TBD',
                modules: []
            },
            {
                title: 'Eclipse CDT Cloud Debug Adapter',
                url: 'https://projects.eclipse.org/projects/ecd.cdt-cloud',
                version: 'TBD',
                modules: []
            },
            {
                title: 'Langium',
                url: 'https://langium.org/',
                version: 'TBD',
                modules: []
            },
            {
                title: 'Theia Trace Extension',
                url: 'https://github.com/eclipse-cdt-cloud/theia-trace-extension',
                version: 'TBD',
                modules: []
            }
        ]
    },

    {
        name: 'Theia 1.40.x (2023-08) - published',
        releasedate: 'August 31st, 2023',
        releasecandidatedate: 'July 27th, 2023',
        technologiesin: 'September 7th, 2023',
        releaseanouncement: 'September 14th, 2023',
        announcementurl: 'https://eclipsesource.com/blogs/2023/09/15/the-eclipse-theia-community-release-2023-08/',
        frameworks: [
            {
                title: 'Eclipse GLSP',
                url: 'https://www.eclipse.dev/glsp/',
                version: '2.0.0',
                modules: [
                    { modulename: '@eclipse-glsp/theia-integration', url: 'https://www.npmjs.com/package/@eclipse-glsp/theia-integration/v/2.0.0' }
                ]
            },
            {
                title: 'Eclipse EMF.cloud',
                url: 'https://www.eclipse.dev/emfcloud/',
                version: '0.8.0-theia-cr03',
                modules: [
                    { modulename: '@eclipse-emfcloud/modelserver-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-theia/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/modelserver-client', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-client/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/modelserver-markers-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-markers-theia/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/jsonforms-property-view/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/modelserver-jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-jsonforms-property-view/v/0.8.0-theia-cr03' }
                ]
            },
            {
                title: 'Eclipse Sprotty',
                url: 'https://www.eclipse.dev/sprotty/',
                version: '0.14.0',
                modules: []
            },
            {
                title: 'Eclipse CDT Cloud Debug Adapter',
                url: 'https://projects.eclipse.org/projects/ecd.cdt-cloud',
                version: '0.0.102',
                modules: [
                    { modulename: 'cdt-gdb-vscode', url: 'https://open-vsx.org/extension/eclipse-cdt/cdt-gdb-vscode/0.0.102' },
                    { modulename: 'cdt-gdb-adapter', url: 'https://www.npmjs.com/package/cdt-gdb-adapter/v/0.0.27' }
                ]
            },
            {
                title: 'Langium',
                url: 'https://langium.org/',
                version: '2.0.0',
                modules: []
            },
            {
                title: 'Theia Trace Extension',
                url: 'https://github.com/eclipse-cdt-cloud/theia-trace-extension',
                version: 'since 0.2.0-next.20230908184630.abe6fad.0',
                modules: [
                    { modulename: 'theia-traceviewer', url: 'https://www.npmjs.com/package/theia-traceviewer' },
                    { modulename: 'traceviewer-base', url: 'https://www.npmjs.com/package/traceviewer-base' },
                    { modulename: 'traceviewer-react-components', url: 'https://www.npmjs.com/package/traceviewer-react-components' }
                ]
            }
        ]
    },
    {
        name: 'Theia 1.37.x (2023-05) - published',
        releasedate: 'May 25th, 2023',
        releasecandidatedate: 'April 27th, 2023',
        technologiesin: 'June 1st, 2023',
        releaseanouncement: 'June 12th, 2023',
        announcementurl: 'https://eclipsesource.com/blogs/2023/06/12/the-eclipse-theia-community-release-2023-05/',
        frameworks: [
            {
                title: 'Eclipse GLSP',
                url: 'https://www.eclipse.dev/glsp/',
                version: '1.0.0-theia1.34.0',
                modules: [
                    { modulename: '@eclipse-glsp/theia-integration', url: 'https://www.npmjs.com/package/@eclipse-glsp/theia-integration/v/1.0.0-theia1.34.0' }
                ]
            },
            {
                title: 'Eclipse EMF.cloud',
                url: 'https://www.eclipse.dev/emfcloud/',
                version: '0.8.0-theia-cr03',
                modules: [
                    { modulename: '@eclipse-emfcloud/modelserver-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-theia/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/modelserver-client', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-client/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/modelserver-markers-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-markers-theia/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/jsonforms-property-view/v/0.8.0-theia-cr03' },
                    { modulename: '@eclipse-emfcloud/modelserver-jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-jsonforms-property-view/v/0.8.0-theia-cr03' }
                ]
            },
            {
                title: 'Eclipse Sprotty',
                url: 'https://www.eclipse.dev/sprotty/',
                version: '0.13.0',
                modules: []
            },
            {
                title: 'Eclipse CDT Cloud Debug Adapter',
                url: 'https://projects.eclipse.org/projects/ecd.cdt-cloud',
                version: '0.0.98',
                modules: []
            },
            {
                title: 'Langium',
                url: 'https://langium.org/',
                version: '1.2.0',
                modules: []
            },
            {
                title: 'Theia Trace Extension',
                url: 'https://github.com/eclipse-cdt-cloud/theia-trace-extension',
                version: 'since 0.2.0-next.20230613130240.a37bbf1.0',
                modules: [
                    { modulename: 'theia-traceviewer', url: 'https://www.npmjs.com/package/theia-traceviewer' },
                    { modulename: 'traceviewer-base', url: 'https://www.npmjs.com/package/traceviewer-base' },
                    { modulename: 'traceviewer-react-components', url: 'https://www.npmjs.com/package/traceviewer-react-components' }
                ]
            }
        ]
    },
    {
        name: 'Theia 1.34.x (2023-02) - published',
        releasedate: 'February 23rd, 2023',
        releasecandidatedate: 'January 26th, 2023',
        technologiesin: 'March 2nd, 2023',
        releaseanouncement: 'March 9th, 2023',
        announcementurl: 'https://eclipsesource.com/blogs/2023/03/09/the-eclipse-theia-community-release-2023-02/',
        frameworks: [
            {
                title: 'Eclipse GLSP',
                url: 'https://www.eclipse.dev/glsp/',
                version: '1.0.0-theia1.34.0',
                modules: [
                    { modulename: '@eclipse-glsp/theia-integration', url: 'https://www.npmjs.com/package/@eclipse-glsp/theia-integration/v/1.0.0-theia1.34.0' }
                ]
            },
            {
                title: 'Eclipse EMF.cloud',
                url: 'https://www.eclipse.dev/emfcloud/',
                version: '0.8.0-theia-cr02',
                modules: [
                    { modulename: '@eclipse-emfcloud/modelserver-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-theia/v/0.8.0-theia-cr02' },
                    { modulename: '@eclipse-emfcloud/modelserver-client', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-client/v/0.8.0-theia-cr02' },
                    { modulename: '@eclipse-emfcloud/modelserver-markers-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-markers-theia/v/0.8.0-theia-cr02' },
                    { modulename: '@eclipse-emfcloud/jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/jsonforms-property-view/v/0.8.0-theia-cr02' },
                    { modulename: '@eclipse-emfcloud/modelserver-jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-jsonforms-property-view/v/0.8.0-theia-cr02' }
                ]
            },
            {
                title: 'Eclipse Sprotty',
                url: 'https://www.eclipse.dev/sprotty/',
                version: '0.13.0',
                modules: []
            },
            {
                title: 'Eclipse CDT Cloud Debug Adapter',
                url: 'https://projects.eclipse.org/projects/ecd.cdt-cloud',
                version: '0.0.93',
                modules: [
                    { modulename: 'cdt-gdb-vscode', url: 'https://open-vsx.org/extension/eclipse-cdt/cdt-gdb-vscode/0.0.95' },
                    { modulename: 'cdt-gdb-adapter', url: 'https://www.npmjs.com/package/cdt-gdb-adapter/v/0.0.19' }
                ]
            },
            {
                title: 'Langium',
                url: 'https://langium.org/',
                version: '1.1.0',
                modules: []
            }
        ]
    },
    {
        name: 'Theia 1.29.x (2022-09) - published',
        releasedate: 'September 29th, 2022',
        releasecandidatedate: 'August 25th, 2022',
        technologiesin: 'October 6th, 2022',
        releaseanouncement: 'October 18th, 2022',
        announcementurl: 'https://eclipsesource.com/blogs/2022/10/18/the-eclipse-theia-community-release-2022-09/',
        frameworks: [
            {
                title: 'Eclipse GLSP',
                url: 'https://www.eclipse.dev/glsp/',
                version: '1.0.0-theia1.27.0',
                modules: [
                    { modulename: '@eclipse-glsp/theia-integration', url: 'https://www.npmjs.com/package/@eclipse-glsp/theia-integration/v/1.0.0-theia1.27.0' }
                ]
            },
            {
                title: 'Eclipse EMF.cloud',
                url: 'https://www.eclipse.dev/emfcloud/',
                version: '0.8.0-theia-cr01',
                modules: [
                    { modulename: '@eclipse-emfcloud/modelserver-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-theia/v/0.8.0-theia-cr01' },
                    { modulename: '@eclipse-emfcloud/modelserver-client', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-client/v/0.8.0-theia-cr01' },
                    { modulename: '@eclipse-emfcloud/modelserver-markers-theia', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-markers-theia/v/0.8.0-theia-cr01' },
                    { modulename: '@eclipse-emfcloud/jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/jsonforms-property-view/v/0.8.0-theia-cr01' },
                    { modulename: '@eclipse-emfcloud/modelserver-jsonforms-property-view', url: 'https://www.npmjs.com/package/@eclipse-emfcloud/modelserver-jsonforms-property-view/v/0.8.0-theia-cr01' }
                ]
            },
            {
                title: 'Eclipse Sprotty',
                url: 'https://www.eclipse.dev/sprotty/',
                version: '0.12.0',
                modules: [
                    { modulename: 'sprotty-theia', url: 'https://www.npmjs.com/package/sprotty-theia/v/0.12.0' }
                ]
            },
            {
                title: 'Eclipse CDT Cloud Debug Adapter',
                url: 'https://projects.eclipse.org/projects/ecd.cdt-cloud',
                version: '0.0.93',
                modules: [
                    { modulename: 'cdt-gdb-vscode', url: 'https://open-vsx.org/extension/eclipse-cdt/cdt-gdb-vscode/0.0.93' },
                    { modulename: 'cdt-gdb-adapter', url: 'https://www.npmjs.com/package/cdt-gdb-adapter/v/0.0.16-next.20220930230402.c653a9a.0' }
                ]
            }
        ]
    }
]

const monthlyReleases = [
    {
        title: 'Eclipse Theia 1.43 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/11/02/eclipse-theia-1-43-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.42 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/10/06/eclipse-theia-1-42-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 2023-08 Community Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/09/15/the-eclipse-theia-community-release-2023-08/',
    },
    {
        title: 'Eclipse Theia 1.41 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/09/05/eclipse-theia-1-41-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.40 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/08/01/eclipse-theia-1-40-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.39 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/07/06/eclipse-theia-1-39-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 2023-05 Community Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/06/12/the-eclipse-theia-community-release-2023-05/',
    },
    {
        title: 'Eclipse Theia 1.38 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/06/05/eclipse-theia-1-38-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.37 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/05/08/eclipse-theia-1-37-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.36 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/04/12/eclipse-theia-1-36-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 2023-02 Community Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/03/09/the-eclipse-theia-community-release-2023-02/',
    },
    {
        title: 'Eclipse Theia 1.35 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/03/02/eclipse-theia-1-35-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.34 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/02/02/eclipse-theia-1-34-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.33 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2023/01/13/eclipse-theia-1-33-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.32 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/12/07/eclipse-theia-1-32-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.31 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/11/14/eclipse-theia-1-31-1-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 2022-09 Community Release Celebration Video',
        url: 'https://youtu.be/MUIZT2wOkmw',
    },
    {
        title: 'Eclipse Theia 2022-09 Community Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/10/18/the-eclipse-theia-community-release-2022-09/',
    },
    {
        title: 'Eclipse Theia 1.30 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/10/13/eclipse-theia-1-30-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.29 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/09/09/eclipse-theia-1-29-release-news-and-noteworthy/',
    },
    {
        title: 'Introducing the Eclipse Theia Community Release',
        url: 'https://eclipsesource.com/blogs/2022/08/16/introducing-the-eclipse-theia-community-release/',
    },
    {
        title: 'Eclipse Theia 1.28 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/08/09/eclipse-theia-1-28-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.27 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/07/11/eclipse-theia-1-27-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.26 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/06/10/eclipse-theia-1-26-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.25 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/05/09/eclipse-theia-1-25-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.24 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/04/14/eclipse-theia-1-24-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.23 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/03/01/eclipse-theia-1-23-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.22 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/02/07/eclipse-theia-1-22-release-news-and-noteworthy/',
    },
    {
        title: 'Eclipse Theia 1.21 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2022/01/12/eclipse-theia-1-21-release-news-and-noteworthy/',
    }
]

const Releases = () => (
    <StyledResources>
        <header className='header' role="banner">
            <div className="row">
                <Nav shouldRenderLogo={true} />
                <div className="header__text-box">
                    <h1 className="heading-primary">
                        Releases
                    </h1>
                    <p>Eclipse Theia follows a monthly release cycle. You can find all monthly releases including changelogs and breaking changes <a href="#monthlyreleases">here</a>.</p>
                    <br></br>
                    <p>In addition, Theia provides a "community release" every three month with extra focus on stability and compatibility.</p>
                    <p>The list below shows all community releases including the next one planned. In addition, you can find technologies that integrate with Theia, including the respective version that is supposed to be compatible with the community release.</p>
                    <p>This compatibility information is provided and ensured by the respective project and therefore not in scope for the Theia project team. If you find issues with a technology, please report them at the respective project. If you are interested in getting a technology listed, please open a PR to <a href="https://github.com/eclipse-theia/theia-website">this repo</a>.</p>
                    <p>For more information, please refer to <a href="https://eclipsesource.com/blogs/2022/08/16/introducing-the-eclipse-theia-community-release/">this article about the Theia community release.</a></p>

                </div>
            </div>
        </header>
        <div className='row'>
            <h1 className='heading-primary'>Community Releases</h1>
        </div>
        {communityReleases.map(({ name, frameworks, releasedate, releasecandidatedate, technologiesin, releaseanouncement, announcementurl }, i) => {
            return (
                <section key={i} className="category row" id="frameworks">
                    <h2 className="heading-secondary">{name}</h2>
                    <p>Community Release Candidate: <b>{releasecandidatedate}</b></p>
                    <p>Community Release Available: <b>{releasedate}</b></p>
                    <p>Compatible Technologies Listed: <b>{technologiesin}</b></p>
                    <p><a href={announcementurl}>Community Release Announcement</a>: <b>{releaseanouncement}</b></p>
                    <br></br>
                    <p><h3 className="heading-tertiary"><b>Compatible Technologies:</b></h3></p>
                    {frameworks.map(
                        ({ title, url, version, icon, modules }, i) => {
                            return (
                                <div key={`${i}_${title}`} className="framework">
                                    <h4 className="heading-tertiary">
                                        <a href={url}>{title}, Version: {version}</a>
                                        {modules &&
                                            <ul className="module-listing">
                                                {modules.map(({ modulename, url }) => {
                                                    return <li><a href={url}>{modulename}</a></li>
                                                })}
                                            </ul>
                                        }
                                    </h4>
                                </div>)
                        }
                    )}
                </section>
            )
        }
        )}
        <div className='row'>
            <h1 className='heading-primary' id='monthlyreleases'>Monthly Releases</h1>
        </div>
        <div className='row'>
        {monthlyReleases.map(
                        ({ title, url }, i) => {
                            return (
                                <div key={`${i}_${title}`} className="resource">
                                    <div>
                                        <h3 className="heading-secondary">
                                            <a href={url}>{title}</a>
                                        </h3>
                                    </div>
                                </div>)
                        }
        )}
        </div>
    </StyledResources>
)
export default Releases
