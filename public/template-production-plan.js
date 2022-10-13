/**
 * [REQUIRED] Load the following stylesheets in the parent template `<head>`:
 * - `<link rel="stylesheet" href="./style.css">`
 * - `<link rel="stylesheet" href="./production.css">`
 * 
 * [REQUIRED] Load the following scripts at the end of the parent template `<body>`:
 * - `<script src="./pagemap-1.4.0.min.js"></script>`
 * - `<script src="./production-planner-core.js"></script>`
 */
const templateProductionPlan = /*html*/ `
    <div class="main production-planner">

        <nav class="topbar">
            <a onclick="onClickProductionPlanActions(['close'])">Close without saving</a>
            <a class="active" onclick="onClickProductionPlanActions(['save', 'close'])">Save and close</a>
            <a onclick="onClickProductionPlanActions(['save'])">Save and continue editing</a>
            <div class="options">
                <label for="toggle-horizontal-layout" class="checked"><input type="checkbox" id="toggle-horizontal-layout" checked>Horizontal Layout</label>
            </div>
            <div class="topbar-section-right">
                <div class="cta connect-wallet-cta" onclick="connectWallet()">Connect wallet</div>
                <div class="cta connected-address disabled hidden"></div>
            </div>
        </nav>

        <div id="production-wrapper" class="chain-type-combined">
            <div id="selected-production-chain">
                <h2><span id="selected-item-name"></span> - Production Plan</h2>
            </div>
            <div id="user-selected-products-wrapper" class="hidden-NOT">
                <div>Intermediate products that you also plan to produce</div>
                <div class="extra-info">(counting selected occurrences in the chain, not quantities required for the planned product)</div>
                <div id="user-selected-products-list" class="brand-text"><span>N/A</span></div>
            </div>
            <div id="production-chain-wrapper">
                <div id="shopping-list-wrapper">
                    <h3>Shopping List</h3>
                    <div id="shopping-list"></div>
                    <img id="shopping-list-product-image" src="" alt="" onerror="this.src='./img/site-icon.png'; this.classList.add('missing-image');">
                </div>
                <div id="production-chain-items" class="horizontal-layout"></div>
            </div>
            <div id="user-selected-products-info">
                <span class="brand-text">Select any other products</span> from the chain, that you also plan to produce.<br>
                All the remaining items will need to be obtained from a marketplace or other players.<br>
                They will also need to be delivered to the buildings where you plan to produce the selected items.
            </div>
        </div>

        <div id="minimap-wrapper">
            <div id="minimap-toggle" class="pointer" onclick="toggleMinimap()">Minimap</div>
        </div>

        <div id="production-chain-overlay" class="hidden">
            <div>
                <div>
                    Selecting this process variant will deselect the entire sub-chain<br>
                    of the currently-selected process - "<span id="overlay-selected-process-name"></span>".
                </div>
                <div class="overlay-question brand-text">Are you sure?</div>
                <div class="options">
                    <label for="toggle-always-confirm"><input type="checkbox" id="toggle-always-confirm">Always confirm automatically</label>
                </div>
                <div class="overlay-responses">
                    <span id="overlay-response-no" class="overlay-response" onclick="handleOverlayResponse(false)">No</span>
                    <span id="overlay-response-yes" class="overlay-response" onclick="handleOverlayResponse(true)">Yes</span>
                </div>
            </div>
        </div>
    </div>

    <div id="debug" class="hidden"></div>
`;
