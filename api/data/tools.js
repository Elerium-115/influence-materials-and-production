const tools = [
    {
        category_short: 'Mining',
        category: 'Mining Tools',
        items: [
            {title: 'Raw Materials', author: 'Elerium115', url: 'https://influence.elerium.dev/'},
            {title: 'Materials Ratios', author: 'Elerium115', url: 'https://influence.elerium.dev/ratios.html'},
        ],
    },
    {
        category_short: 'Production',
        category: 'Production Tools',
        items: [
            {title: 'Products', author: 'Elerium115', url: 'https://influence.elerium.dev/products.html'},
            {title: 'Derived Products', author: 'Elerium115', url: 'https://influence.elerium.dev/derived-products.html'},
            {title: 'Production Planner', author: 'Elerium115', url: 'https://influence.elerium.dev/production-planner.html'},
            // {title: 'Production Chains', author: 'Elerium115', url: 'https://influence.elerium.dev/production.html'}, // to be reworked
            {title: 'Process Finder', author: 'Denker', url: 'https://www.adalia.info/tools/process-finder'},
            {title: 'Production Tracker', author: 'Denker', url: 'https://www.adalia.info/tools/production-tracker'},
            {title: 'Product List', author: 'Daharius', url: 'https://influence.daharius.com/ProductList'},
        ],
    },
    {
        category_short: 'Asteroids',
        category: 'Asteroids Tools',
        items: [
            {title: 'Asteroids Planner', author: 'Elerium115', url: 'https://influence.elerium.dev/asteroids-planner.html'},
            {title: 'Asteroid Management', author: 'Tyrell-Yutani', url: 'https://tyrell-yutani.app/#/asteroid'},
            {title: 'Asteroid Metadata Lookup by Daharius', author: 'Daharius', url: 'https://influence.daharius.com/AsteroidMetadata/1'},
            {title: 'Asteroid Metadata Lookup by trevis', author: 'trevis & Dirac', url: 'https://starksight.plus/collection/INFA/1'},
            {title: 'Asteroid Tracker & Visualizer', author: 'Daharius', url: 'https://influence.daharius.com/AsteroidsTracker'},
            {title: 'Adalia Co-orbital Rocks', author: 'RGR', url: 'https://adalia.coorbital.rocks/'},
        ],
    },
    {
        category_short: 'Crew',
        category: 'Crew Tools',
        items: [
            {title: 'Crew Member Services', author: 'Tyrell-Yutani', url: 'https://tyrell-yutani.app/#/crew'},
            {title: 'Crewmate Metadata Lookup by Daharius', author: 'Daharius', url: 'https://influence.daharius.com/CrewmateMetadata/1'},
            {title: 'Crewmate Metadata Lookup by trevis', author: 'trevis & Dirac', url: 'https://starksight.plus/collection/INFC/1'},
            {title: 'Crew Planner', author: 'Daharius', url: 'https://influence.daharius.com/CrewPlanner'},
            {title: 'Crew Builder', author: 'Grey Area', url: 'https://adalia.academy/POC/index.html'},
            {title: 'Crew Tracker', author: 'Denker', url: 'https://www.adalia.info/tools/crew-tracker'},
            {title: 'Action Planner', author: 'Elerium115', url: 'https://elerium-115.github.io/influence-css/tool-action-planner/'},
        ],
    },
    {
        category_short: 'Flight',
        category: 'Flight Tools',
        items: [
            {title: 'Flight Chart Zoom (Chrome)', author: 'RGR', url: 'https://chromewebstore.google.com/detail/influence-flight-chart-zo/makjdbggcjkjclglokiopecpghgmkgba'},
            {title: 'Flight Chart Zoom (Firefox)', author: 'RGR', url: 'https://addons.mozilla.org/en-US/firefox/addon/influence-flight-zoom-chart/'},
        ],
    },
    {
        category_short: 'Information',
        category: 'Information Tools',
        items: [
            {title: 'Wendash', author: 'Joosh & Admiral', url: 'https://influence.wendash.com/'},
            {title: 'Adalia Academy', author: 'Grey Area & Skippy', url: 'https://adalia.academy/'},
            {title: 'Influence Sales', author: 'Teandy', url: 'https://influence-sales.space/'},
            {title: 'Adalia.Guide', author: 'Korivak', url: 'https://adalia.guide/'},
            {title: 'Adalia Info', author: 'Denker', url: 'https://adalia.info/'},
            {title: 'Analytics on Dune', author: 'brakmaar', url: 'https://dune.com/brakmaar/Influence-asteroids'}, // blocked by "dune.com"
            // {title: 'Adalia.id', author: 'strwrsfrk & Myrhea', url: 'https://my.adalia.id/'}, // abandoned?
        ],
    },
    {
        category_short: 'Lore',
        category: 'Influence Lore',
        items: [
            {title: 'Last Night in Space', author: 'Korivak', url: 'https://lastnight.space/'},
            {title: 'Influence Lore by Korivak', author: 'Korivak', url: 'https://matthew.debarth.com/influence'}, // individual articles blocked by "medium.com"
            {title: 'Influence Lore by strwrsfrk', author: 'strwrsfrk', url: 'https://strwrsfrk.medium.com/'}, // blocked by "medium.com"
        ],
    },
    {
        category_short: 'Games',
        category: 'Games',
        items: [
            {title: 'Influent', author: 'brakmaar', url: 'https://influent.vercel.app/'},
        ],
    },
];

module.exports = {
    tools,
};
