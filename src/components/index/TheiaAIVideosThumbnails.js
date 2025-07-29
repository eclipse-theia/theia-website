/********************************************************************************
 * Copyright (C) 2025 EclipseSource and others.
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

import React, { useState } from 'react'
import styled from '@emotion/styled'
import 'reactjs-popup/dist/index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { breakpoints } from '../../utils/variables'
import { youtubeVideos } from '../../utils/youtube-data'

const Styled = styled.div`
    .youtube-gallery {
        padding-bottom: 5rem;
        margin-top: 4rem;
        position: relative;
        
        &__container {
            margin-top: 2rem;
        }
        
        &__thumbnail {
            position: relative;
            cursor: pointer;
            
            img {
                width: 100%;
                border-radius: 4px;
                border: 1px solid #ebebeb;
            }
            
            &-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: background 0.3s;
                
                &:hover {
                    background: rgba(0, 0, 0, 0.4);
                }
                
                svg {
                    width: 60px;
                    height: 60px;
                    fill: #fff;
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
                }
            }
        }
        
        &__title {
            font-size: 1.1rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        &__description {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        &__duration {
            font-size: 0.8rem;
            color: #fff;
            display: inline-block;
            background: rgba(0, 0, 0, 0.7);
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    }
    
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        
        &__content {
            position: relative;
            width: 90%;
            max-width: 900px;
            
            &-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                background: none;
                border: none;
                outline: none;
            }
        }
        
        &__iframe {
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            position: relative;
            
            iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
            }
        }
    }
`

const YoutubeCard = styled.div`
    height: 100%;
    border-radius: 4px;
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
`

const PlayIcon = () => (
    <svg viewBox="0 0 68 48">
        <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
)

const VideoModal = ({ videoId, onClose }) => (
    <div className="video-modal">
        <div className="video-modal__content">
            <button className="video-modal__content-close" onClick={onClose}>×</button>
            <div className="video-modal__iframe">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    </div>
)

const TheiaAIVideosThumbnails = () => {
    const [activeVideo, setActiveVideo] = useState(null);
    
    // Filter videos by theia-ai tag
    const theiaAIVideos = youtubeVideos.filter(video => 
        video.tags && video.tags.includes('theia-ai')
    );
    
    const openVideo = (videoId) => {
        setActiveVideo(videoId);
        document.body.style.overflow = 'hidden';
    }
    
    const closeVideo = () => {
        setActiveVideo(null);
        document.body.style.overflow = 'auto';
    }

    return (
        <div className="row">
            <Styled>
                <section className="youtube-gallery">
                    <h3 className="heading-tertiary">Latest Theia AI Demo Videos</h3>
                    
                    <div className="youtube-gallery__container">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            slidesPerView={1}
                            breakpoints={{
                                "500": {
                                    "slidesPerView": 1,
                                },
                                "750": {
                                    "slidesPerView": 2,
                                    "spaceBetween": 20,
                                },
                                "1120": {
                                    "slidesPerView": 3,
                                    "spaceBetween": 30,
                                }
                            }}
                            loop={true}
                            navigation={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false
                            }}
                        >
                            {theiaAIVideos.map((video, i) => (
                                <SwiperSlide key={i}>
                                    <YoutubeCard>
                                        <div 
                                            className="youtube-gallery__thumbnail"
                                            onClick={() => openVideo(video.id)}
                                        >
                                            <img 
                                                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                                                alt={video.title}
                                                onError={(e) => {
                                                    // If medium quality fails, try standard quality thumbnail
                                                    e.target.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
                                                    // If standard quality also fails, use a placeholder
                                                    e.target.onerror = () => {
                                                        e.target.src = 'https://via.placeholder.com/320x180?text=Video+Unavailable';
                                                        e.target.onerror = null; // Prevent infinite error loop
                                                    };
                                                }}
                                            />
                                            <div className="youtube-gallery__thumbnail-overlay">
                                                <PlayIcon />
                                            </div>
                                            {video.duration && (
                                                <span className="youtube-gallery__duration">
                                                    {video.duration}
                                                </span>
                                            )}
                                        </div>

                                    </YoutubeCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    
                    {activeVideo && (
                        <VideoModal 
                            videoId={activeVideo} 
                            onClose={closeVideo} 
                        />
                    )}
                </section>
            </Styled>
        </div>
    )
}

export default TheiaAIVideosThumbnails