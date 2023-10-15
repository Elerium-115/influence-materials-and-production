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
                <label for="toggle-optimize-variants" class="checked"><input type="checkbox" id="toggle-optimize-variants" checked>Optimize Process Variants</label>
                <label for="toggle-auto-replicate" class="checked"><input type="checkbox" id="toggle-auto-replicate" checked>Auto-Replicate Selections</label>
            </div>
            <div class="topbar-section-right">
                <div class="cta connect-wallet-cta" onclick="connectWallet(isExampleAsteroidsPlan)">Connect wallet</div>
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
                    <div id="shopping-list-product-image-wrapper" onclick="onClickProductImage(this)">
                        <img id="shopping-list-product-image" src="" alt="" onerror="this.src='./img/site-icon.png'; this.classList.add('missing-image'); this.parentNode.classList.add('missing-image-wrapper');">
                        <div id="shopping-list-product-name"></div>
                    </div>
                </div>
                <div id="production-chain-items"></div>
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

    <!-- NO "#overlay-wrapper" here, using the one from the parent template -->

    <div id="debug" class="hidden"></div>
`;
