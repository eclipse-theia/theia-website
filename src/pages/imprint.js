import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { breakpoints } from '../utils/variables'
import Layout from '../layouts/layout'
import Nav from '../components/Nav'
import Footer from '../components/Footer'


export default () => {
    return (
        <Layout canonical='https://theia-ide.org/'>
                <div className='row'>
                    <Nav />
                </div>
                <Footer background={true} />
        </Layout>
    )
}
