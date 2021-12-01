/********************************************************************************
 * Copyright (C) 2021 EclipseSource and others.
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
 import { introsToTheia } from '../../utils/data'
 import { breakpoints } from '../../utils/variables'
 
 const Styled = styled.div`
      .intros {
         padding-bottom: 5rem;
         margin-top: 4rem;

         &__container {
             display: grid;
             grid-template-columns: repeat(3, 1fr);
             gap: 4rem;
             justify-content: space-between;
             @media(max-width: 768px) {
                 grid-template-columns: 1fr 1fr;
             }
             @media(max-width: ${breakpoints.sm}) {
                 grid-template-columns: 1fr;
             }

         }
         &__item {
             flex: 1 1 0;
             text-align: center;
         }
         &__image {
             width: 70%;
             border: 2px solid black;
             border-radius: 50%;
         }
         h4 {
             font-size: 2rem;
             margin-top: 2rem;
             margin-bottom: 1rem;
         }
     }
 `
 
 const IntrosToTheia = () => (
     <div className="row">
         <Styled>
             <section className="intros" >
                 <h3 className="heading-tertiary">Introductions to Eclipse Theia</h3>
                 <div className="intros__container">
                    {
                    introsToTheia.map((intro, i) => (
                            <div key={i} className="intros__item">
                                <a target="_blank" rel="noopener noreferrer" href={intro.href}>
                                    <img className="intros__image" src={intro.src} alt={intro.title} />
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href={intro.href}>
                                    <h4>{intro.title}</h4>
                                </a>
                                <p>{intro.speaker}</p>
                            </div>
                        ))
                    }
                 </div>
             </section>
         </Styled>
     </div>
 )
 
 export default IntrosToTheia