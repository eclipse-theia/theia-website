import React from 'react'
import styled from '@emotion/styled'
import Background from '../resources/background-image.png'
import TwitterLogo from '../resources/twitter.svg'
import GithubLogo from '../resources/github.svg'
import SpectrumLogo from '../resources/spectrum.svg'

const StyledFooter = styled.div`
    .footer {
        padding: 4rem 0;
        text-align: center;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-top: 10px solid #f8f8f8;

        &__icons {
            display: flex;
            justify-content: center;
            margin: 2rem 0;
        }

        &__icon {
            height: 3rem;
            display: block;
        }

        &__link {
            &:not(:last-child) {
                margin-right: 3rem;
            }
        }

        &__copyright {
            margin: 2rem 0;
        }
    }
`

const Footer = ({background}) => (
    <StyledFooter>
        <footer className="footer" role="contentinfo" style={{background: background ? `url(${Background})` : null}}>
            <p>Join the community!</p>
            <div className="footer__icons">
                <a href="https://twitter.com/theia_ide" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <img src={TwitterLogo} alt="Twitter Logo" className="footer__icon" />
                </a>
                <a href="https://github.com/eclipse-theia/theia" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <img src={GithubLogo} alt="Github Logo" className="footer__icon" />
                </a>
                <a href="https://spectrum.chat/theia" target="_blank" rel="noopener noreferrer" className="footer__link">
                    <img src={SpectrumLogo} alt="Spectrum Logo" className="footer__icon" style={{transform: 'scale(1.2)'}}/>
                </a>
            </div>
            <p className="footer__copyright"><a target="_blank" rel="noopener noreferrer" href=" http://www.eclipse.org/legal/privacy.php">Privacy Policy</a> | <a target="_blank" rel="noopener noreferrer" href=" http://www.eclipse.org/legal/termsofuse.php">Terms of Use</a> | <a target="_blank" rel="noopener noreferrer" href="http://www.eclipse.org/legal/copyright.php">Copyright Agent</a></p>
            <p>© 2019 by <a href="https://typefox.io" target="_blank" rel="noopener">TypeFox</a></p>
        </footer>
    </StyledFooter>
)

export default Footer
