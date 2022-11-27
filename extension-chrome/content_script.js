const tools = [
    {
        category_short: 'Mining',
        category: 'Mining Tools',
        items: [
            {title: 'Raw Materials', author: 'Elerium115', url: 'https://materials.adalia.id/'},
            {title: 'Materials Ratios', author: 'Elerium115', url: 'https://materials.adalia.id/ratios.html'},
        ],
    },
    {
        category_short: 'Production',
        category: 'Production Tools',
        items: [
            {title: 'Production Planner', author: 'Elerium115', url: 'https://materials.adalia.id/production-planner.html'},
            {title: 'Production Chains', author: 'Elerium115', url: 'https://materials.adalia.id/production.html'},
            {title: 'Product List', author: 'Daharius', url: 'https://influence.daharius.com/ProductList'},
        ],
    },
    {
        category_short: 'Asteroids',
        category: 'Asteroids Tools',
        items: [
            {title: 'Asteroids Planner', author: 'Elerium115', url: 'https://materials.adalia.id/asteroids-planner.html'},
            {title: 'Asteroid Management', author: 'Tyrell-Yutani', url: 'https://tyrell-yutani.app/#/asteroid'},
            {title: 'Asteroid Tracker & Visualizer', author: 'Daharius', url: 'https://influence.daharius.com/AsteroidsTracker'},
            {title: 'Adalia Co-orbital Rocks', author: 'RGR', url: 'https://adalia.coorbital.rocks/'},
        ],
    },
    {
        category_short: 'Crew',
        category: 'Crew Tools',
        items: [
            {title: 'Crew Planner', author: 'Daharius', url: 'https://influence.daharius.com/CrewPlanner'},
            {title: 'Crew Member Services', author: 'Tyrell-Yutani', url: 'https://tyrell-yutani.app/#/crew'},
        ],
    },
    {
        category_short: 'Information',
        category: 'Information Tools',
        items: [
            {title: 'Influence Sales', author: 'Teandy', url: 'https://influence-sales.space/'},
            {title: 'Adalia Guide', author: 'Korivak', url: 'https://adalia.guide/'},
            {title: 'Adalia Info', author: 'Denker', url: 'https://adalia.info/'},
            {title: 'Adalia.id', author: 'strwrsfrk & Myrhea', url: 'https://my.adalia.id/'},
            // {title: 'Analytics on Dune', author: 'brakmaar', url: 'https://dune.com/brakmaar/Influence-asteroids'}, // blocked by "dune.com"
        ],
    },
    /* DISABLED re: blocked by "medium.com"
    {
        category_short: 'Lore',
        category: 'Influence Lore',
        items: [
            {title: 'The Incident in Sixteen', author: 'Korivak', url: 'https://matthew.debarth.com/influence/the-incident-in-sixteen'},
            {title: 'strwrsfrk Influence Lore', author: 'strwrsfrk', url: 'https://strwrsfrk.medium.com/'},
        ],
    },
    */
];

/**
 * Classes of DOM elements
 */
const cls = {
    main: ['sc-dNCsYx', 'gglZw'], // has children "cls.standardWindowWrapper", "cls.bottomMenu"
    // Standard window
    standardWindowWrapper: ['sc-jhrdCu', 'faJcWL'],
    standardWindow: ['sc-hjsNop', 'hgtEvr'],
    standardWindowTitle: ['sc-bRlCZA', 'epbBDP'], // h1
    standardWindowClose: ['sc-hHTYSt', 'fAiLNU', 'sc-edLOhm', 'eRqRVr'], // button, has child "svg.e115IconClose"
    // Side menu
    sideMenuPanel: ['sc-jfTVlA', 'joMUIB'],
    sideMenuPanelBar: ['sc-lbVpMG', 'lonsSj'], // has child "svg.e115IconShip"
    sideMenuPanelTitle: ['sc-iOeugr', 'iwOMEl'], // h2
    sideMenuPanelClose: ['sc-hHTYSt', 'fAiLNU', 'sc-jfvxQR', 'ceJfqQ'], // button, has child "svg.e115IconClose"
    sideMenuPanelContent: ['sc-gScZFl', 'egtYcz'],
    // Bottom menu
    bottomMenuItem: ['sc-kgTSHT', 'bKznIm'],
    bottomMenuItemLabel: ['sc-bBABsx', 'fERzvQ'],
    bottomMenuItemList: ['sc-iveFHk', 'bwpfoI'],
    bottomMenuItemListItem: ['jCUfva'], // has child "svg.e115IconShip" + text
};

const svg = {
    e115IconShip: `<svg viewBox="0 0 221.73 94.58"><g><g><path fill="#fff" d="M221.73,47.3L110.78,0H0L71.49,30.77l-22.68,16.53,22.68,16.53L0,94.58H110.78l110.95-47.28Z"/></g></g></svg>`,
    e115IconClose: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`,
};

/**
 * Inject global styles that reproduce the dynamically-injected styles
 * (for dynamically-injected DOM elements) in the game client,
 * as well as custom styles for newly-injected elements.
 */
const elStyleE115 = document.createElement('style');
elStyleE115.innerHTML = /*html*/ `

    /* Dynamic styles */

    .e115-window-wrapper { /* re: standardWindowWrapper */
        flex: 1 1 0px;
        max-width: 1400px;
        padding: 25px 25px 0px;
        position: relative;
        overflow: hidden;
        width: 100%;
    }
    .e115-window { /* re: standardWindow */
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        clip-path: polygon(0px 0px, 100% 0px, 100% calc(100% - 35px), calc(100% - 35px) 100%, 0px 100%);
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        pointer-events: auto;
    }
    .e115-window-title { /* re: standardWindowTitle */
        border-left: 5px solid rgb(54, 167, 205);
        font-size: 24px;
        font-weight: 400;
        height: 60px;
        line-height: 60px;
        padding: 0px 0px 0px 30px;
        position: relative;
        margin: 0px;
        z-index: 1;
    }
    .e115-window-close { /* re: standardWindowClose */
        position: absolute !important;
        top: 17px;
        right: 20px;
        z-index: 1;
    }
    .e115-side-menu-panel-close { /* re: sideMenuPanelClose */
        position: absolute !important;
        top: 15px;
        right: 10px;
        opacity: 0;
    }
    .${cls.sideMenuPanel[0]}:hover .${cls.sideMenuPanelClose[2]} {
        opacity: 1;
    }
    .e115-side-menu-panel-content { /* re: sideMenuPanelContent */
        max-height: 350px;
        padding-bottom: 20px;
    }

    /* Custom styles */

    :root {
        /* --e115-highlight: rgb(63, 128, 234); */ /* blue */
        /* --e115-highlight: rgb(223, 67, 0); */ /* red */
        --e115-highlight: rgb(163, 107, 247); /* violet */
        --e115-highlight-faded-10: rgba(163, 107, 247, 0.1);
        --e115-highlight-faded-15: rgba(163, 107, 247, 0.15);
        --e115-highlight-faded-25: rgba(163, 107, 247, 0.25);
    }

    .e115-cursor {
        cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFw2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTEtMjZUMTc6MjY6MDErMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTExLTI2VDE4OjA5OjI4KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTExLTI2VDE4OjA5OjI4KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplZWZhYmUxOS05N2MzLTQ5NzAtYTg0My0xYjk5MmZkZjZlYmQiIHhtcE1NOkRvY3VtZW50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") 5 5, auto;
    }
    .e115-cursor-full,
    .e115-cursor-full a,
    .e115-cursor-full button {
        cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFw2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTEtMjZUMTc6MzA6MTYrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTExLTI2VDE4OjA5OjE3KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTExLTI2VDE4OjA5OjE3KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowZWM1Mjk5NS01MDFmLTQwMTgtOWVlZC0wZGJhMmRmMjA2MmQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N2UxMWQ0MWMtZGRmZS00NjZmLTliM2UtNzFjOGI5ZmJjMjI0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6N2UxMWQ0MWMtZGRmZS00NjZmLTliM2UtNzFjOGI5ZmJjMjI0Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ZTExZDQxYy1kZGZlLTQ2NmYtOWIzZS03MWM4YjlmYmMyMjQiIHN0RXZ0OndoZW49IjIwMjItMTEtMjZUMTc6MzA6MTYrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowZWM1Mjk5NS01MDFmLTQwMTgtOWVlZC0wZGJhMmRmMjA2MmQiIHN0RXZ0OndoZW49IjIwMjItMTEtMjZUMTg6MDk6MTcrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pki4NbAAAAQISURBVFiF7ZdvTFV1GMc/vwvcC4bV+BPGLMytWuUbp1aw1Yu2XmhvWm3VZtLWimVGTKtptqUjnH+qG+DMtmZE5h/UNXOajFBwZW7453pdkIjREAXvhQty497LPeee8/TiQuLlCBfEeNOznTfn+/s9z+f37Hme8ztKRJhKs01p9P8BrADqtjCzbgv5SqlkpVTCfw4AzE904Kwtk193FelFb8ypnqGUSrxdACq2C5RSjp+dUuOYzpOGzt9i4g9e41B7S/fupZWZp4GwTGLrWAEkVC03lmU8YPvAcQczAUQIGzq9eogmv5cfzpw8e2DdkblXgcitwowAAChe1JST9+yje1PuYkGsZuj4TJNAoIfDHa29uwq+SWsABiYKYgmglEo6WCLO1HReTrSTabVRhLAIZrifJl+bse2V0sQdQEBEjMkAUFtf68p7eH7Gd/ZpzB7LiaHTCxh+D1VX/vJVvfVtxknirBVLgEGI5JrP5VDyneTabKSMfRYQQYto+LQA53qvGLvdbnfN+rp5XhGJTARA7VlhFmTMVh/bU8iOB2C4GTo+Q8fT7+Pghd/bdry/b1YzoMVm5aYAAEVP/HLv8/lPnbCnkDNegCETQROTQLgf1/GaxpVrq+c0MqxoRx3F5Q1PdwV7qDYN+i0cR0S4aWqHTCnsYoIWIr2+vv4+IG143FEBRCTSer6zEsWINClFYvs5/bgWomd0H3QF+zj93EdqXf3AO8Gh13EBALy7M9ulBWmy0mY8lDSntHj7Bk8LtaZJ0GKJRwvi+qz4qzKgG7gI+MYFAIQ9F7WvtRAdsYI9hfTXC5YsenVj1hf7K06s7vfhNnS6hvZpQS4UFr396ZHA0gDQDlwRkRuG1pgAIiKLNzv22hLQrfS0HBYszd1/v/O3vGPlGyqWt5zq2xnR8IT6aF6zotzZJFvNweCXgXDs/lG74N9FSiUcWCub7s7mTVsC02N1LUTHqsKNLzXIqlYgedMLrS82Nzfr2xoXtgB/ApdEJGTpO94R/mW+N/eRx++ptE/jwVhNBP2SW9u5eLOjBOgEUoFMoifuJDqiLQPFfSNatj3LpYU4b6UpRVLmLPtcoi2WxPWCuzRa8HEBAGH/VdmnhbgcK4jgMTS8gANwiIgxWGxjfg/iBhARcblctQh9MdJVPcQfCz9UnwCRwSduG9eldH3dPK/fy0+mGZ2MInRrQRrLSr4vBRIAD4ycmpMGICIR96mmCjHQDJ1r/V2ceaZQFf/oWeIn2madIjKi1SYNAGDN4cdaTZOeQA8dK1e/V0X05G1Ee31gvP4mctvVzh67XHj06NHsc+Ls5vqEG9fJhyzuOXDDJqVSgSzAALwiYvUduK0ANqKpF8C4lZvxhAAm06b83/Aft4Yph81mACUAAAAASUVORK5CYII=") 5 5, auto;
    }

    /* Fill custom SVG icon */
    [data-e115-menu-id] .e115-bottom-menu-item-list-item svg path {
        fill: rgba(255, 255, 255, 0.75);
    }
    [data-e115-panel-id] .e115-side-menu-panel-bar svg path {
        fill: rgba(255, 255, 255, 0.5);
    }
    [data-e115-panel-id]:hover .e115-side-menu-panel-bar svg path,
    [data-e115-menu-id] .e115-bottom-menu-item-list-item:hover svg path {
        fill: white;
    }

    [data-e115-window-id] .${cls.standardWindowClose[1]}:hover,
    [data-e115-panel-id] .${cls.sideMenuPanelClose[1]}:hover {
        background-image: linear-gradient(120deg, var(--e115-highlight-faded-10), var(--e115-highlight-faded-25));
        color: white;
    }

    .e115-window-title {
        border-left-color: var(--e115-highlight);
    }
    .e115-window-close.${cls.standardWindowClose[1]} {
        border-color: var(--e115-highlight);
        color: var(--e115-highlight);
    }
    .e115-window iframe {
        border: none;
        height: 100%;
    }

    .${cls.sideMenuPanel[1]}[data-e115-panel-id]::after {
        background-image: linear-gradient(0.25turn, var(--e115-highlight-faded-15), rgba(0, 0, 0, 0));
    }
    .${cls.sideMenuPanel[0]}[data-e115-panel-id]:hover .${cls.sideMenuPanelBar[0]},
    .${cls.sideMenuPanel[0]}[data-e115-panel-id].e115-hover .${cls.sideMenuPanelBar[0]} {
        background-color: var(--e115-highlight);
    }
    [data-e115-panel-id] .${cls.sideMenuPanelClose[1]} {
        color: var(--e115-highlight);
        border-color: var(--e115-highlight);
    }

    .${cls.bottomMenuItem[0]}[data-e115-menu-id]:hover {
        max-height: 500px;
    }
    .${cls.bottomMenuItem[0]}[data-e115-menu-id]:hover .${cls.bottomMenuItemLabel[0]} {
        border-bottom-color: var(--e115-highlight);
        color: var(--e115-highlight);
    }
    .${cls.bottomMenuItemListItem[0]}[data-e115-submenu-id]:hover {
        background-color: var(--e115-highlight);
    }

    .e115-list {
        list-stye: none;
        margin: 0;
        padding: 0;
    }
    .e115-list li:hover {
        background: var(--e115-highlight-faded-10);
    }
    .e115-list li a {
        display: block;
        padding: 10px;
    }

    .e115-faded {
        opacity: 0.5;
    }
`;
document.head.appendChild(elStyleE115);

function getElLastBottomMenuItem() {
    const elsBottomMenuItem = document.querySelectorAll(`.${cls.bottomMenuItem[1]}`);
    const elLastBottomMenuItem = [...elsBottomMenuItem].pop();
    return elLastBottomMenuItem;
}

/** Add classes from array of class-names */
function addCls(el, classes) {
    classes.forEach(className => el.classList.add(className));
}

/** Delete DOM element matching selector */
function delSel(selector) {
    // console.log(`--- [delSel] selector = ${selector}`); //// TEST
    el = document.querySelector(selector);
    el.parentElement.removeChild(el);
}

function createEl(nodeType, primaryClasses, secondaryClasses = null) {
    const el = document.createElement(nodeType);
    addCls(el, primaryClasses);
    if (secondaryClasses) {
        addCls(el, secondaryClasses);
    }
    return el;
}

function flashSidePanel(el) {
    // -- first flash
    el.classList.add('e115-hover');
    setTimeout(() => {
        el.classList.remove('e115-hover');
        setTimeout(() => {
            // -- second flash
            el.classList.add('e115-hover');
            setTimeout(() => {
                el.classList.remove('e115-hover');
            }, 250);
        }, 250);
    }, 500);
}

function injectStandardWindow(title, url) {
    // console.log(`--- [injectStandardWindow] title = ${title}`); //// TEST
    // Prepare new standard window > wrapper
    const elNewWindowWrapper = createEl('div', cls.standardWindowWrapper, ['e115-window-wrapper', 'e115-cursor']);
    elNewWindowWrapper.dataset.e115WindowId = title;
    // Prepare new standard window
    const elNewWindow = createEl('div', cls.standardWindow, ['e115-window']);
    elNewWindowWrapper.appendChild(elNewWindow);
    // Prepare new standard window > title
    const elNewWindowTitle = createEl('h1', cls.standardWindowTitle, ['e115-window-title']);
    elNewWindowTitle.textContent = title;
    elNewWindow.appendChild(elNewWindowTitle);
    // Prepare new standard window > close
    const elNewWindowClose = createEl('button', cls.standardWindowClose, ['e115-window-close', 'e115-cursor-full']);
    elNewWindowClose.innerHTML = svg.e115IconClose;
    // Define onclick handler to delete this window
    elNewWindowClose.dataset.onClickFunction = 'delSel';
    elNewWindowClose.dataset.onClickArgs = JSON.stringify([`[data-e115-window-id='${title}']`]);
    elNewWindow.appendChild(elNewWindowClose);
    // Prepare new standard window > iframe
    const elNewWindowIframe = document.createElement('iframe');
    elNewWindowIframe.src = url;
    elNewWindow.appendChild(elNewWindowIframe);
    // Inject new standard window, at the start of the main content
    const elMain = document.querySelector(`.${cls.main[1]}`);
    elMain.insertAdjacentHTML('afterbegin', elNewWindowWrapper.outerHTML);
    const elNewWindowWrapperInjected = document.querySelector(`[data-e115-window-id='${title}']`);
    return elNewWindowWrapperInjected;
}

function injectSideMenuPanel(title, items_stringify) {
    // console.log(`--- [injectSideMenuPanel] title = ${title}`); //// TEST
    // Check if side menu panel already exists with the same "title"
    const elMatchingSideMenuPanel = document.querySelector(`[data-e115-panel-id="${title}"]`);
    if (elMatchingSideMenuPanel) {
        flashSidePanel(elMatchingSideMenuPanel);
        return;
    }
    // Prepare new side menu panel
    const elNewSideMenuPanel = createEl('div', cls.sideMenuPanel, ['e115-cursor']);
    elNewSideMenuPanel.dataset.e115PanelId = title;
    // Prepare new side menu panel > bar
    const elNewSideMenuPanelBar = createEl('div', cls.sideMenuPanelBar, ['e115-side-menu-panel-bar']);
    elNewSideMenuPanelBar.innerHTML = svg.e115IconShip;
    elNewSideMenuPanel.appendChild(elNewSideMenuPanelBar);
    // Prepare new side menu panel > title
    const elNewSideMenuPanelTitle = createEl('h2', cls.sideMenuPanelTitle, ['e115-cursor-full']);
    elNewSideMenuPanelTitle.textContent = title;
    elNewSideMenuPanel.appendChild(elNewSideMenuPanelTitle);
    // Prepare new side menu panel > close
    const elNewSideMenuPanelClose = createEl('button', cls.sideMenuPanelClose, ['e115-side-menu-panel-close', 'e115-cursor-full']);
    elNewSideMenuPanelClose.innerHTML = svg.e115IconClose;
    // Define onclick handler to delete this panel
    elNewSideMenuPanelClose.dataset.onClickFunction = 'delSel';
    elNewSideMenuPanelClose.dataset.onClickArgs = JSON.stringify([`[data-e115-panel-id='${title}']`]);
    elNewSideMenuPanel.appendChild(elNewSideMenuPanelClose);
    // Prepare new side menu panel > content
    const elNewSideMenuPanelContent = createEl('div', cls.sideMenuPanelContent, ['e115-side-menu-panel-content']);
    try {
        const items = JSON.parse(items_stringify);
        let contentHtml = `<ul class="e115-list">`;
        items.forEach(itemData => {
            contentHtml += /*html*/ `
                <li>
                    <a class="e115-cursor-full"
                        data-on-click-function="injectStandardWindow"
                        data-on-click-args='${JSON.stringify([itemData.title, itemData.url])}'
                    >${itemData.title} <span class="e115-faded">- by ${itemData.author}</span></a>
                </li>
            `;
        });
        contentHtml += `</ul>`;
        elNewSideMenuPanelContent.innerHTML = contentHtml;
    } catch (error) {
        console.log(`--- [injectSideMenuPanel] ERROR:`, {error}); //// TEST
    }
    elNewSideMenuPanel.appendChild(elNewSideMenuPanelContent);
    // Inject new side menu panel, right after the last side menu panel
    const elsSideMenuPanel = document.querySelectorAll(`.${cls.sideMenuPanel[1]}`);
    const elLastSideMenuPanel = [...elsSideMenuPanel].pop();
    elLastSideMenuPanel.insertAdjacentHTML('afterend', elNewSideMenuPanel.outerHTML);
    const elNewSideMenuPanelInjected = document.querySelector(`[data-e115-panel-id='${title}']`);
    flashSidePanel(elNewSideMenuPanelInjected);
    return elNewSideMenuPanelInjected;
}

/**
 * 
 * @param label e.g. "Tools"
 * @param list e.g. [{category: 'Mining', items: [{title: 'Tool Name', url: 'http...'}, ...]}, ...]
 */
function injectBottomMenuItem(label, list) {
    // console.log(`--- [injectBottomMenuItem] label = ${label}`); //// TEST
    // Check if it will be possible to inject the new menu item
    const elLastBottomMenuItem = getElLastBottomMenuItem();
    if (!elLastBottomMenuItem) {
        console.log(`--- [injectBottomMenuItem] ERROR: bottom menu not yet loaded`); //// TEST
        return null;
    }
    // Prepare new menu item
    const elNewMenuItem = createEl('div', cls.bottomMenuItem, ['e115-cursor-full']);
    elNewMenuItem.dataset.e115MenuId = label;
    // Prepare new menu item > label
    const elNewMenuItemLabel = createEl('div', cls.bottomMenuItemLabel);
    elNewMenuItemLabel.textContent = label;
    elNewMenuItem.appendChild(elNewMenuItemLabel);
    // Prepare new menu item > list
    const elNewMenuItemList = createEl('div', cls.bottomMenuItemList);
    list.forEach(listItemData => {
        const elNewMenuItemListItem = createEl('div', cls.bottomMenuItemListItem, ['e115-bottom-menu-item-list-item']);
        elNewMenuItemListItem.innerHTML = /*html*/ `${svg.e115IconShip}<span>${listItemData.category_short}</span>`;
        elNewMenuItemListItem.dataset.e115SubmenuId = listItemData.category_short;
        // Define onclick handler to open side panel
        elNewMenuItemListItem.dataset.onClickFunction = 'injectSideMenuPanel';
        elNewMenuItemListItem.dataset.onClickArgs = JSON.stringify([listItemData.category, JSON.stringify(listItemData.items)]);
        elNewMenuItemList.appendChild(elNewMenuItemListItem);
    });
    elNewMenuItem.appendChild(elNewMenuItemList);
    // Inject new menu item, right after the last menu item
    elLastBottomMenuItem.insertAdjacentHTML('afterend', elNewMenuItem.outerHTML);
    const elNewMenuItemInjected = document.querySelector(`[data-e115-menu-id='${label}']`);
    return elNewMenuItemInjected;
}

// Source: https://gist.github.com/Machy8/1b0e3cd6c61f140a6b520269acdd645f
function on(eventType, selector, callback) {
    document.addEventListener(eventType, event => {
        // console.log(`--- EVENT ${eventType} @ el:`, event.target); //// TEST
        if (event.target.matches === undefined) {
            // Avoid errors in Brave
            return;
        }
        // Parse target and its ancestors, until a matching selector is found
        let el = event.target;
        while (el) {
            if (el.matches(selector)) {
                callback(el);
                break;
            } else {
                el = el.parentElement; // null after parsing the "html" element
            }
        }
    }, true); // "true" required for correct behaviour of e.g. "mouseenter" / "mouseleave" attached to elements that have children
}

// Handle onclick events for injected elements
on('click', '[data-on-click-function]', el => {
    const args = JSON.parse(el.dataset.onClickArgs);
    // console.log(`--- CALL ${el.dataset.onClickFunction} w/ args:`, args); //// TEST
    switch (el.dataset.onClickFunction) {
        case 'delSel': delSel(args[0]); break;
        case 'injectSideMenuPanel': injectSideMenuPanel(args[0], args[1]); break;
        case 'injectStandardWindow': injectStandardWindow(args[0], args[1]); break;
    }
});

// Inject the bottom menu item only after the bottom menu is loaded
var existCondition = setInterval(() => {
    const elLastBottomMenuItem = getElLastBottomMenuItem();
    if (elLastBottomMenuItem) {
        clearInterval(existCondition);
        injectBottomMenuItem('Tools', tools);
    }
}, 1000);
