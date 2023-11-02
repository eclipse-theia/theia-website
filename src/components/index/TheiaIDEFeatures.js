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

import React from 'react'

import CompletionVideo from '../../resources/completion.mp4'
import TermianlVideo from '../../resources/terminal.mp4'
import LayoutVideo from '../../resources/layout.mp4'
import Promo from './Promo'

const features = [
    {
        title: "Language Support",
        para: <p>
            Experience world-class code editing support in Theia IDE, integrated with the Language Server Protocol (LSP). This allows you to develop in almost any programming language, including Python, Java, JavaScript, C++, and more—all within one versatile environment.
        </p>,
        videoSrc: CompletionVideo
    },
    {
        title: "Modern UX",
        para: <p>Elevate your development workflow with Theia IDE's flexible workbench layout and user experience. Featuring a dynamic toolbar, detachable views, and efficient tab management, our interface is designed to adapt to your needs, streamlining your projects for optimal productivity.</p>,
        videoSrc: TermianlVideo
    },
    {
        title: "Extensible and Open",
        para: <p>Unlock limitless possibilities with Theia IDE's seamless compatibility with the vast VS Code extension ecosystem. From robust linting tools to interactive notebook editors, customize your development experience like never before. Plus, enjoy the added confidence of a fully open-source platform governed by a vendor-neutral community. Streamline your workflow, enrich your toolset, and code on your own terms.

        </p>,
        videoSrc: LayoutVideo
    }
]
 

const TheiaIDEFeatures = () => (
        <section className="promos">
            <div className="row">
                { features.map((promo, i) => <Promo key={i} {...promo} />) }
            </div>
        </section>
)

export default TheiaIDEFeatures