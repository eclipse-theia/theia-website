import React from 'react'

import styled from '@emotion/styled'
import CompletionVideo from '../../resources/completion.mp4'
import TermianlVideo from '../../resources/terminal.mp4'
import LayoutVideo from '../../resources/layout.mp4'
import Promo from './Promo'

const StyledPromos = styled.div`
    .promos {
        margin: 15rem 0;
    }
`

const promos = [
    {
        title: "Supports JavaScript, Java, Python and many more",
        para: <p>
            Built on the <a href="https://microsoft.github.io/language-server-protocol/" target="_blank" rel="noopener noreferrer">Language Server Protocol</a>,
            Theia benefits from a growing ecosystem of <e>over 60 available language servers</e>, delivering intelligent editing support
            for all major programming languages.
        </p>,
        videoSrc: CompletionVideo
    },
    {
        title: "Integrated Terminal",
        para: <p>Theia integrates a full featured terminal, that reconnects on browser reload keeping the full history.</p>,
        videoSrc: TermianlVideo
    },
    {
        title: "Flexible Layout",
        para: <p>Theia's shell is based on <a href="https://phosphorjs.github.io/" target="blank">PhosphorJS</a>, which provides a solid foundation for draggable dock layouts.</p>,
        videoSrc: LayoutVideo
    }
]

const Promos = () => (
    <StyledPromos>
        <section className="promos">
            <div className="row">
                { promos.map((promo, i) => <Promo key={i} {...promo} />) }
            </div>
        </section>
    </StyledPromos>
)

export default Promos