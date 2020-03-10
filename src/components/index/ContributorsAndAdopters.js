import React from 'react'

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
                    grid-template-columns: repeat(5, 1fr);
                    grid-row-gap: 80px;

                    & > div {
                        &:nth-child(n + 6) {
                            transform: translateX(50%);
                        }
                    }
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

const ContributorsAndAdopters = () => (
    <div className="row">
        <Styled>
            <section className="contributors" >
                <h3 className="heading-tertiary">Contributors & Adopters</h3>
                <div className="contributors__images">
                    {
                        contributorsAndAdopters.map((item, i) => (
                            <div key={i} className="contributors__image-container">
                                <a target="_blank" rel="noopener" href={item.href}>
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

export default ContributorsAndAdopters