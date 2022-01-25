alert('123')
createButton();

const ob = new MutationObserver((_muta, me) => {
    let el = document.querySelector('.proof-factor-cb-overlay')
    if (el) {
        document.querySelector('.proof-factor-cb-overlay').style.zIndex = '2147483645'
        document.getElementById('capture').addEventListener("click", ()=>{
            capture('BOX');
        });
        me.disconnect();
        return;
    }
});
ob.observe(document, { childList: true, subtree: true });

const ob2 = new MutationObserver((_muta, me) => {
    let el = document.querySelector('.proof-factor-fw-container')
    if (el) {
        document.querySelector('.proof-factor-fw-container').style.zIndex = '2147483645'
        document.getElementById('capture').addEventListener("click", ()=>{
            capture('FW');
        });
        me.disconnect();
        return;
    }
});
ob2.observe(document, { childList: true, subtree: true });

function createButton() {
    const fxdiv = document.createElement('div')
    fxdiv.id = 'fxdiv'
    fxdiv.style = 'position:fixed; bottom:0; right:200px; z-index:2147483646;'
    document.body.appendChild(fxdiv)
    var button = document.createElement('button')
    button.innerHTML = 'CAPTURE SCREENSHOT'
    button.id = 'capture'
    button.style.padding = '10px'
    const theDiv = document.getElementById('fxdiv')
    theDiv.append(button)
}

function capture(type) {
    let screen
    if(type === 'FW') {
        screen = document.querySelector('.proof-factor-fw-box')
        document.querySelector('.proof-factor-fw-button').style.marginTop = '1em';
    } else {
        screen = document.querySelector('.proof-factor-cb-prompt-content')
        screen.style.transform = `scale(${ONE.SB_CB_scale})`;
        document.querySelector('.proof-factor-cb-subscribe-button').style.marginTop = '1em';
    }

    var parent = screen.parentNode;
    var wrapper = document.createElement('div');
    parent.replaceChild(wrapper, screen);
    wrapper.appendChild(screen);
    wrapper.style.display = 'flex'
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';

    if(type === 'FW') {
        domtoimage.toPng(wrapper, { width: ONE.FW_width, height: ONE.FW_height})
            .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = getFormattedTime() + '.png';
            link.href = dataUrl;
            link.click();
        });
    } else {
        domtoimage.toPng(wrapper, { width: ONE.SB_CB_width, height: ONE.SB_CB_height})
            .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = getFormattedTime() + '.png';
            link.href = dataUrl;
            link.click();
        });
    }
}

function getFormattedTime() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var h = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
}