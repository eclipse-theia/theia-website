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

import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { contributorsAndAdopters } from '../../utils/data'
import { breakpoints } from '../../utils/variables'

const Styled = styled.div`
     .contributors {
        padding-bottom: 5rem;
        margin-top: 4rem;

        &__images {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

                @media(min-width: 768px) {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-row-gap: 80px;
                }

            @media(max-width: 50rem) {
                text-align: center;
            }
        }

        &__image {
            height: 100%;
            max-width: 14rem;
            object-fit: contain;

            &-container {
                height: 4rem;

                @media(min-width: 768px) {
                    height: 4.5rem;
                    text-align: center;
                }

                @media(max-width: 50rem) {
                    width: 40%;
                    margin-bottom: 4rem;
                }

                @media(max-width: 30rem) {
                    width: 100%;
                }
            }

            &--ericsson {
                transform: scale(1.3);
            }

            &--ibm {
                transform: scale(.8);
            }

            &--arm {
                transform: scale(.5);
            }

            &--sap {
                @media(min-width: ${breakpoints.md}) {
                    transform: translateX(2.5rem);
                }
            }
        }
    }
`

const ContributorsAndAdopters = ({ adopters }) => {
    const allAdopters = useMemo(() => {
        const result = [...contributorsAndAdopters, ...adopters]
        result.sort((a,b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)
        return result
    }, [adopters])
    return (
        <div className="row">
            <Styled>
                <section className="contributors" >
                    <h3 className="heading-tertiary">Contributors & Adopters</h3>
                    <div className="contributors__images">
                        {
                            allAdopters.map((item, i) => (
                                <div key={i} className="contributors__image-container">
                                    <a target="_blank" rel="noopener noreferrer" href={item.homepage_url}>
                                        <img className="contributors__image" src={(item.src) ? item.src : 'https://api.eclipse.org/adopters/assets/images/adopters/' + item.logo } alt={item.name} />
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </Styled>
            <center><a href="https://eclipsesource.com/blogs/2023/11/22/how-to-become-visible-theia-adopter/">How to get listed as an Eclipse Theia adopter/contributor</a></center>
            <br></br>
        </div>
    )
}

export default ContributorsAndAdopters