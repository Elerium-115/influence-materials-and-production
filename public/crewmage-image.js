const crewmateId = urlParams.get('id');

const elCrewmateImageWrapper = document.getElementById('crewmate-image-wrapper');
const elDownloadSvg = document.getElementById('download-svg');

// Update prices via API call
async function generateCrewmateImage() {
    if (!crewmateId) {
        console.log(`--- MISSING crewmateId`); //// TEST
        return;
    }
    let apiResponse = null;
    const config = {
        method: 'get',
        url: `${apiUrl}/crewmate-images/${crewmateId}`,
    };
    try {
        const response = await axios(config);
        const rawData = response.data;
        // console.log(`--- rawData from API:`, rawData); //// TEST
        if (rawData.error) {
            // Abort re: error in data from API
            console.log(`--- ERROR in data from API:`, rawData.error); //// TEST
            elCrewmateImageWrapper.textContent = 'ERROR';
            return;
        }
        apiResponse = rawData;
    } catch (error) {
        // Abort re: error from API
        console.log(`--- ERROR from API:`, error); //// TEST
        return;
    }
    elCrewmateImageWrapper.textContent = '';
    elDownloadSvg.style.display = 'unset';
    // Start black-gradient at 12.5% from top = 150px of total height 1200px = how much will be cropped by hedra.com
    const svgCombined = /*html*/ `
        <svg id="svg-combined" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="900" height="1200">
            <defs>
                <linearGradient id="fadetoblack" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="12.5%" stop-color="black"/>
                    <stop offset="50%" stop-color="transparent"/>
                </linearGradient>
            </defs>
            <g class="child-svg-wrapper">
                ${apiResponse.svg_full}
            </g>
            <rect width="100%" height="100%" fill="url(#fadetoblack)"></rect>
            <g class="child-svg-wrapper">
                ${apiResponse.svg_bust}
            </g>
        </svg>
    `;
    // Source: https://stackoverflow.com/a/24109000
    const parser = new DOMParser();
    const docSvgTest = parser.parseFromString(svgCombined, 'image/svg+xml');
    const elSvgTest = docSvgTest.documentElement;
    elSvgTest.style.background = 'black';
    /**
     * Show only the first <image> tag inside each child-SVG (i.e. the actual crewmate).
     * All other tags inside the child-SVGs will be hidden via CSS (i.e. overlayed graphics / texts).
     */
    [...elSvgTest.querySelectorAll('.child-svg-wrapper > svg')].forEach((childSvg, idx) => {
        [...childSvg.children].forEach(childInsideSvg => {
            childInsideSvg.style.display = 'none';
        });
        // The actual crewmate is the first image inside each child-SVG
        childSvg.querySelector('image').style.display = 'unset';
    });
    elCrewmateImageWrapper.append(elSvgTest);
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

function onClickDownloadSvg() {
    const elSvgCombined = document.getElementById('svg-combined');
    if (!elSvgCombined) {
        alert('ERROR: SVG not found');
        return;
    }
    saveSvg(elSvgCombined, `${crewmateId}.svg`);
}

generateCrewmateImage();
