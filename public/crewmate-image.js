let crewmateId;

const elCrewmateIdInput = document.getElementById('crewmate-id-input');
const elWorkflow = document.getElementById('workflow');
const elCrewmateImageWrapper = document.getElementById('crewmate-image-wrapper');

function onErrorGenerateCrewmateImage(errorMessage) {
    elWorkflow.classList.add('hidden');
    elCrewmateImageWrapper.textContent = errorMessage;
    elCrewmateImageWrapper.classList.add('error');
}

// Update prices via API call
async function generateCrewmateImage() {
    elCrewmateImageWrapper.classList.remove('error');
    if (!crewmateId) {
        console.log(`--- ERROR re: crewmateId`); //// TEST
        onErrorGenerateCrewmateImage('ERROR: Crewmate ID missing or invalid');
        return;
    }
    elCrewmateImageWrapper.textContent = `Generating image for crewmate #${crewmateId}...`;
    let apiResponse = null;

    // Get the "bust" SVG
    const configBust = {
        method: 'get',
        url: `${apiUrl}/crewmate-image/bust/${crewmateId}`,
    };
    try {
        const response = await axios(configBust);
        const rawData = response.data;
        // console.log(`--- rawData from API:`, rawData); //// TEST
        if (rawData.error) {
            // Abort re: error in data from API
            console.log(`--- ERROR in data from API:`, rawData.error); //// TEST
            onErrorGenerateCrewmateImage('ERROR in data from API');
            return;
        }
        apiResponse = rawData;
    } catch (error) {
        // Abort re: error from API
        console.log(`--- ERROR from API:`, error); //// TEST
        return;
    }
    const svgBust = apiResponse.svg_bust;

    // Get the "full" SVG
    const configFull = {
        method: 'get',
        url: `${apiUrl}/crewmate-image/full/${crewmateId}`,
    };
    try {
        const response = await axios(configFull);
        const rawData = response.data;
        // console.log(`--- rawData from API:`, rawData); //// TEST
        if (rawData.error) {
            // Abort re: error in data from API
            console.log(`--- ERROR in data from API:`, rawData.error); //// TEST
            onErrorGenerateCrewmateImage('ERROR in data from API');
            return;
        }
        apiResponse = rawData;
    } catch (error) {
        // Abort re: error from API
        console.log(`--- ERROR from API:`, error); //// TEST
        return;
    }
    const svgFull = apiResponse.svg_full;

    // Generate the combined SVG
    elWorkflow.classList.remove('hidden');
    elCrewmateImageWrapper.textContent = '';
    // Start black-gradient at 10% from top = 120px of total height 1200px = how much the child-SVGs are cropped
    const svgCombined = /*html*/ `
        <svg id="svg-combined" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="900" height="1080">
            <defs>
                <linearGradient id="fadetoblack" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="10%" stop-color="black"/>
                    <stop offset="50%" stop-color="transparent"/>
                </linearGradient>
            </defs>
            <g class="child-svg-wrapper" transform="translate(0 -120)">
                ${svgFull}
            </g>
            <rect width="100%" height="100%" fill="url(#fadetoblack)"></rect>
            <g class="child-svg-wrapper" transform="translate(0 -120)">
                ${svgBust}
            </g>
        </svg>
    `;
    // Source: https://stackoverflow.com/a/24109000
    const parser = new DOMParser();
    const docSvgTest = parser.parseFromString(svgCombined, 'image/svg+xml');
    const elSvgCombined = docSvgTest.documentElement;
    /**
     * Show only the first <image> tag inside each child-SVG (i.e. the actual crewmate).
     * All other tags inside the child-SVGs will be hidden via CSS (i.e. overlayed graphics / texts).
     */
    [...elSvgCombined.querySelectorAll('.child-svg-wrapper > svg')].forEach((childSvg, idx) => {
        [...childSvg.children].forEach(childInsideSvg => {
            childInsideSvg.style.display = 'none';
        });
        // The actual crewmate is the first image inside each child-SVG
        childSvg.querySelector('image').style.display = 'unset';
    });
    elCrewmateImageWrapper.append(elSvgCombined);
}

// Source: https://stackoverflow.com/a/46403589
function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const svgData = svgEl.outerHTML;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function onClickGenerateSvg() {
    const elCrewmateIdRaw = parseInt(elCrewmateIdInput.value);
    crewmateId = isNaN(elCrewmateIdRaw) ? null : elCrewmateIdRaw;
    generateCrewmateImage();
}

function onClickDownloadSvg() {
    const elSvgCombined = document.getElementById('svg-combined');
    if (!elSvgCombined) {
        alert('ERROR: SVG not found');
        return;
    }
    saveSvg(elSvgCombined, `${crewmateId}.svg`);
}
