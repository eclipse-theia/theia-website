import React from 'react'
import styled from '@emotion/styled'
import { products } from '../../utils/data'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

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

const TheiaIDEExtensible = () => (
    <div className="row">
        <Styled>
            <section className="products">
                <h2 className="heading-tertiary">Extensible and Open</h2>
                <p>
                    The Theia IDE is built upon the highly modular <a href="./">Theia platform</a>, enabling the integration of custom extensions and the creation of fully tailored tools (see examples below). <a href="./">Explore the Theia Platform</a> and learn how to create custom tool offerings with ease!
                </p>
                <p>
                    While Theia incorporates certain components from Visual Studio Code, such as the Monaco editor, it is <a href="https://eclipsesource.com/blogs/2024/07/12/vs-code-vs-theia-ide/">independently developed</a> with a unique, modular architecture, <b>Theia is not a <a href="https://eclipsesource.com/blogs/2024/12/17/is-it-a-good-idea-to-fork-vs-code/">fork of VS Code</a></b>.
                </p>
                <br></br>
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
                    pagination={{ clickable: true }}
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

export default TheiaIDEExtensible
