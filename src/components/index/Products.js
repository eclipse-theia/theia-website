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

import styled from '@emotion/styled'
import { products } from '../../utils/data'
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
            max-width: 42rem;
            object-fit: contain;

            &-container {
                height: 18rem;

                @media(min-width: 768px) {
                    height: 18rem;
                    text-align: center;
                }

                @media(max-width: 50rem) {
                    width: 40%;
                    margin-bottom: 4rem;
                }

                @media(max-width: 30rem) {
                    width: 100%;
                }
                padding: 2px;
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

const Products = () => (
    <div className="row">
        <Styled>
            <section className="contributors" >
                <h3 className="heading-tertiary">Selected Tools based on Eclipse Theia</h3>
                <div className="contributors__images">
                    {
                        products.map((item, i) => (
                            <div key={i} className="contributors__image-container">
                                <a target="_blank" rel="noopener noreferrer" href={item.href}>
                                    <img className="contributors__image" src={item.src} alt={item.alt} />
                                </a>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Styled>
    </div>
)

export default Products