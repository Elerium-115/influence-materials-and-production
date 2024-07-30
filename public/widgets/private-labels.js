// Save default list of private labels by address into local-storage, if needed
if (!localStorage.getItem('widgetPrivateLabels')) {
    localStorage.setItem('widgetPrivateLabels', JSON.stringify({}));
}

const privateLabels = JSON.parse(localStorage.getItem('widgetPrivateLabels'));
