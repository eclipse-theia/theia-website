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
import { products } from '../../utils/data'
import Popup from 'reactjs-popup'
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
                height: 18rem;
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

const Products = () => (
    <div className="row">
        <Styled>
            <section className="products">
                <h3 className="heading-tertiary">Selected Tools based on Eclipse Theia</h3>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={1}
                    breakpoints={{
                        "750": {
                            "slidesPerView": 2,
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
                    {products.map((item, i) => (
                        <SwiperSlide key={i} className="products__thumb-container">
                            <Popup
                                trigger={
                                    <div className="products__thumb-popup">
                                        <img className="products__thumb" src={item.thumb} alt={item.alt} />
                                        <div>{item.alt}</div>
                                    </div>
                                } modal>
                                {close => (
                                <>
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <h2>{item.alt}</h2>
                                    <img style={{ width: '100%', margin: '2rem' }} src={item.src} alt={item.alt} />
                                    <a className="btn" href={item.href} target="_blank" rel="noopener noreferrer">More information</a>
                                </>
                                )}
                            </Popup>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </Styled>
    </div>
)

export default Products
