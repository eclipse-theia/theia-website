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