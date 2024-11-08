/********************************************************************************
 * Copyright (C) 2020 EclipseSource and others.
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
import { extensions } from '../../utils/data'
import 'reactjs-popup/dist/index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

const Styled = styled.div`
    .products {
        padding-bottom: 5rem;
        margin-top: 4rem;
        position: relative;
        &__thumb {
            height: calc(100% - 1.5em);
            max-width: 100%;
            object-fit: fill;
            cursor: pointer;
            display: block;
            margin: auto;

            &-container {
                height: 12rem;
                padding: 2px;
                text-align: center;
                @media(max-width: 50rem) {
                    width: 40%;
                    margin-bottom: 4rem;
                }
                @media(max-width: 30rem) {
                    width: 100%;
                }
            }
            &-popup {
                height: 100%;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        }
    }
`

const VSCodeExtensions = () => (
    <div className="row">
        <Styled>
            <section className="products">
                <h3 className="heading-tertiary">Most popular extensions for Theia</h3>
                <p>Unlock limitless possibilities with Theia IDE's seamless compatibility with the VS Code extension ecosystem. From robust linting tools to interactive notebook editors, customize your development experience like never before. Explore <b>more than 3000 available extensions</b> for the Theia IDE at <a href="https://open-vsx.org/">open-vsx.org!</a></p>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={1}
                    breakpoints={{
                        "500": {
                            "slidesPerView": 1,
                        },
                        "750": {
                            "slidesPerView": 2,
                            "spaceBetween": 15,
                        },
                        "1120": {
                            "slidesPerView": 3,
                            "spaceBetween": 20,
                        }
                    }}
                    loop={true}
                    navigation={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false
                    }}
                >
                    {extensions.map((item, i) => (
                        <SwiperSlide key={i} className="products__thumb-container">
                            <div className="products__thumb-popup">
                                <a href={item.href}>
                                    <img className="products__thumb" src={item.thumb} alt={item.alt} />
                                </a>
                                <div>{item.alt}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </Styled>
    </div>
)

export default VSCodeExtensions
