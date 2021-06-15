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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
  Autoplay
} from 'swiper/core';

SwiperCore.use([Autoplay]);

const Styled = styled.div`
     .contributors {
        padding-bottom: 5rem;
        margin-top: 4rem;

        &__thumb {
            height: 100%;
            max-width: 100%;
            object-fit: fill;
            cursor: pointer;

            &-container {
                height: 18rem;
                padding: 2px;

                @media(min-width: 768px) {
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
            &-popup {
                height: 100%
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
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={2}
                        breakpoints={{
                            "800": {
                                "slidesPerView": 3,
                                "spaceBetween": 20,
                            }
                        }}
                        pagination={{ "clickable": true }}
                        autoplay={{
                            "delay": 4000,
                            "disableOnInteraction": false
                        }}
                    >
                        {
                        products.map((item, i) => (
                            <SwiperSlide key={i} className="contributors__thumb-container">
                                <Popup key={i}
                                    trigger={
                                    <div className="contributors__thumb-popup">
                                        <img className="contributors__thumb" src={item.thumb} alt={item.alt} />
                                    </div>
                                    
                                    } modal>
                                    <h2>{item.alt}</h2>
                                    <img style={{ width: '100%', margin: '2rem' }} src={item.src} alt={item.alt} />
                                    <a className="btn" href={item.href} target="_blank" rel="noopener noreferrer">More information</a>
                                </Popup>
                            </SwiperSlide>
                        ))
                    }
                    </Swiper>
                </div>
            </section>
        </Styled>
    </div>
)

export default Products