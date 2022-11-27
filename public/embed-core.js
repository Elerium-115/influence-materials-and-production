const queryParams = new URLSearchParams(window.location.search);
if (queryParams.has('embed')) {
    document.body.classList.add('embed');
}
