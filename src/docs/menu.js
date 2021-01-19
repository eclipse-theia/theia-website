/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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

const M = (title, path, subMenu, indented = false) => ({
    title,
    path: '/docs/' + (path ? path + '/' : ''),
    subMenu,
    indented
})

export const MENU = [
    {
        title: 'Architecture'
    },
    M(
        'Overview',
        'architecture'
    ),
    M(
        'Extensions',
        'extensions'
    ),
    M(
        'Services and Contributions',
        'services_and_contributions'
    ),
    {
        title: 'Using Theia'
    },
    M(
        'Build your own IDE',
        'composing_applications'
    ),
    M(
        'Authoring Extensions',
        'authoring_extensions'
    ),
    M(
        'Authoring Plug-ins',
        'authoring_plugins'
    ),
    M(
        'Adding Language Support',
        'language_support'
    ),
    M(
        'TextMate Coloring',
        'textmate',
        null,
        true
    ),
    {
        title: 'Concepts APIs'
    },
    M(
        'Commands and Keybindings',
        'commands_keybindings'
    ),
    M(
        'Preferences',
        'preferences'
    ),
    M(
        'Events',
        'events'
    ),
    M(
        'Communication via JSON-RPC',
        'json_rpc'
    ),
    {
        title: 'Blueprint Product'
    },
    M(
        'Download',
        'blueprint_download'
    ),
    M(
        'Documentation',
        'blueprint_documentation'
    )
]

export function getMenuContext(slug, menu = MENU, context = {}) {
    const indexOfCurrent = menu.findIndex(({path}) => {
        if (path) {
            return path.includes(slug)
        }
        return false
    })
    const prev =  menu[indexOfCurrent - 1] && menu[indexOfCurrent - 1].path ?
        menu[indexOfCurrent - 1].path : menu[indexOfCurrent - 2] && 
        menu[indexOfCurrent - 2].path && menu[indexOfCurrent - 2].path

    const prevTitle = menu[indexOfCurrent - 1] && menu[indexOfCurrent - 1].path ?
        menu[indexOfCurrent - 1].title :
        menu[indexOfCurrent - 2] && menu[indexOfCurrent - 2].path && 
        menu[indexOfCurrent - 2].title
    
    const next = menu[indexOfCurrent + 1] && menu[indexOfCurrent + 1].path ?
        menu[indexOfCurrent + 1].path : menu[indexOfCurrent + 2] && 
        menu[indexOfCurrent + 2].path && menu[indexOfCurrent + 2].path

    const nextTitle = menu[indexOfCurrent + 1] && menu[indexOfCurrent + 1].path ?
        menu[indexOfCurrent + 1].title :
        menu[indexOfCurrent + 2] && menu[indexOfCurrent + 2].path && 
        menu[indexOfCurrent + 2].title

    return { 
        prev: prev, 
        prevTitle, 
        next: next, 
        nextTitle 
    }
}