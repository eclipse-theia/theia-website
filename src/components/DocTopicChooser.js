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
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import DropDownArrow from '../resources/drop-down-arrow.svg';
import { MENU } from '../docs/menu'
import { Link } from 'gatsby'
import DocSearch from './DocSearch'

const Styled = styled.div`
    position: absolute;
    top: 12rem;
    left: 50%;
    transform: translate(-50%, -2rem);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media(max-width: 360px) {
        top: 9rem;
    }

    .support-callout {
        background: #f0f7ff;
        border-radius: 6px;
        padding: 10px 14px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;

        a {
            color: #0074D9;
            font-size: 1.3rem;
            text-decoration: none;
            transition: all 0.2s;

            &:hover,
            &:focus {
                color: #0000f8;
                text-decoration: underline;
            }
        }
    }

    .mobile-search {
        width: 100%;
        min-width: 250px;
        margin-bottom: 0;
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
        <div className="support-callout">
            <Link to="/support">Professional Support →</Link>
            <Link to="/support#sponsoring">Become a Sponsor →</Link>
        </div>
        <DocSearch className="mobile-search" isMobile />
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