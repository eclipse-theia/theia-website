import React from 'react'

import Layout from '../layouts/layout'
import Error404 from '../resources/404-error.svg'
import Background from '../resources/background-image.png'
import Footer from '../components/Footer'
import styled from '@emotion/styled'
import { breakpoints } from '../utils/variables'
import Nav from '../components/Nav'
import { Link } from 'gatsby'

const StyledNotFoundPage = styled.div`
    background-image: url(${Background});
    background-size: cover;
    background-repeat: no-repeat;
    border-bottom: 10px solid #f8f8f8;

    main {
        margin-top: 15rem;
        text-align: center;

        @media(min-width: ${breakpoints.md}) {
            min-height: 80vh;
        }
    }

    img {
        display: inline-block;
        height: 18rem;
        border-bottom: 2px solid;

        @media(max-width: ${breakpoints.md}) {
            height: 15rem;
        }

        @media(max-width: ${breakpoints.sm}) {
            height: 10rem;
        } 
    }

    h1 {
        font-size: 6rem;
    }

    p {
        margin-bottom: 1.5rem;
    }

`

const NotFoundPage = () => (
    <Layout>
        <StyledNotFoundPage>
                <div className="row">
                    <Nav shouldRenderLogo={true}/>
                    <main>
                        <div>
                            <img src={Error404} alt="404"/>
                            <h1>Oops!</h1>
                            <p>We can't find the page you're looking for</p>
                            <Link to="/" className="btn">Back to Home &nbsp;&rarr;</Link>
                        </div>
                    </main> 
                </div>
        </StyledNotFoundPage>
        <Footer />
    </Layout>
)

export default NotFoundPage