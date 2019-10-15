import React from 'react'
import styled from '@emotion/styled'
import Layout from '../layouts/layout'
import DocSideBar from '../components/DocSideBar'
import DocTopicChooser from '../components/DocTopicChooser'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { breakpoints } from '../utils/variables'

const DocContainer = styled.div`
    display: flex;

    .main {
        position: relative;
        overflow-x: hidden;

        @media(max-width: ${breakpoints.xmd}) {
            padding: 5rem 3rem;
        }

        @media(min-width: ${breakpoints.xmd}) {
            width: 70%;
        }

        @media(max-width: ${breakpoints.xmd}) {
            min-width: 100vw;
        }
    }

    .docs-row {
        width: 85%;
        max-wdith: 96rem;
        margin: 0 auto;
        padding-bottom: 10rem;

        @media(max-width: ${breakpoints.sm}) {
            width: 100%;
        }

        @media(min-width: ${breakpoints.sm}) {
            min-height: 90rem;
        }
    }

    h1 {
        margin-bottom: 3rem;
    }

    h2 {
        margin: 2.5rem 0;
        font-size: 2.6rem;
    }

    p {
        margin: 1rem 0;
    }

    ul {
        margin-bottom: 7rem;
        list-style-position: inside;

        ul {
            margin-left: 3rem;
            margin-bottom: 0;
        }
    }

    li {
        margin-top: .8rem;
    }

    code {
        display: inline-block;
        font-size: 80%;
        padding: 0 1rem;
        background: #f9f9f9;
        color: #dc2a2a;
        border: 1px dashed rgba(0,0,0, .2);
        box-shadow: 0 .1rem .2rem rgba(0,0,0, .05);
    }

    pre {
        padding: 1.5rem 2.5rem;
        background: rgba(0,0,0, .02);
        overflow-x: scroll;
        font-size: 90%;
        border: 1px solid rgba(0,0,0, .1);
        font-size: 90%;
        box-shadow: 0 .3rem .6rem #00000029;


        & code {
            font-size: inherit;
            color: inherit;
            padding: none;
            border: none;
            box-shadow: none;
        }
    }
`

const DocsLayout = ({children, canonical}) => (
    <Layout canonical={canonical}>
        <DocContainer>
            <DocSideBar />
            <DocTopicChooser />
            <div className="main">
                <div>
                    <div className="docs-row">
                        <Nav />
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </DocContainer>
    </Layout>
)

export default DocsLayout