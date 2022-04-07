$(document).ready(function() {

    // global variables
    const pf_ONE = unsafeWindow?.ONE || null
    const pf_url = window.location.href

    if (pf_url.includes('.myshopify.com/')) {
        screenshotScript()
    }

    if (pf_url.includes('apps.shopify.com/one/reviews')) {
        if (pf_ONE?.fetch_review) {
            fetchReviewScript()
        }
    }

    function fetchReviewScript() {
        const fxdiv_0 = document.createElement('div')
        fxdiv_0.id = 'fxdiv_0'
        fxdiv_0.style = 'position:fixed; bottom:0; right:0; z-index:9999;'
        document.body.appendChild(fxdiv_0)
        var button_0 = document.createElement('button_0')
        const theDiv = document.getElementById('fxdiv_0')
        theDiv.append(button_0)
        button_0.id = 'one+'
        button_0.style = 'background: black;padding: 15px 20px;color: white; border-radius: 5px;'
        button_0.innerHTML = 'One+'

        document.getElementById(button_0.id).addEventListener("click", function() {
            let data = JSON.parse(sessionStorage.getItem("weeee"))
            var tt = arrayToCSV(data)
            let csvContent = "data:text/csv;charset=utf-8," + tt
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "one_review.csv");
            document.body.appendChild(link);
            link.click();
        });

        expendText();
        var el = document.querySelectorAll(".review-listing .review-content .truncate-content-copy p")
        var ee = document.querySelectorAll(".review-listing .ui-star-rating")
        var et = document.querySelectorAll(".review-listing .review-listing-header__text")
        var ep = document.querySelectorAll(".review-listing .review-metadata__item:nth-child(2) .review-metadata__item-value")
        var eg = document.querySelector('.search-pagination__tag')

        var go
        try {
            go = JSON.parse(sessionStorage.getItem("weeee")) || []
        } catch (e) {
            go = []
        }

        for (let i = 0; i < ee.length; i++) {
            go.push({
                review: el[i].innerHTML.replace(/(?:&nbsp;|<br>|\n)/g, ' ').trim(),
                rating: ee[i].dataset.rating,
                title: et[i].innerHTML.trim(),
                posted: ep[i].innerHTML.trim(),
                page: eg.innerHTML
            })
        }

        sessionStorage.setItem("weeee", JSON.stringify(go));
        const pre = document.querySelector('.search-pagination__previous-page-text')
        const next = document.querySelector('.search-pagination__next-page-text')

        if (next) {
            setTimeout(() => {
                next.click()
            }, 1000)
        }
        if (!pre && !next) {
            setTimeout(() => {
                window.location.reload();
            }, 60000)
        }

        function expendText() {
            var mm = document.querySelectorAll(".review-listing .truncate-content-toggle--show")
            for (let i = 0; i < mm.length; i++) {
                if (mm[i].innerText === 'Show full review') {
                    mm[i].click()
                }
            }
        }

        function arrayToCSV(objArray) {
            const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
            return array.reduce((str, next) => {
                str += `${Object.values(next).map(value => `"${value}"`.replace(/,/g, ' ').replace(/'/g, ' ').replace(/"/g, ' ')).join(",")}` + '\r\n';
                return str;
            }, str);
        }
    }

    function screenshotScript() {

        const SB_CB_width = pf_ONE?.SB_CB_width || 690
        const SB_CB_height = pf_ONE?.SB_CB_height || 567
        const SB_CB_scale = pf_ONE?.SB_CB_scale || 0.9
        const FW_width = pf_ONE?.FW_width || 1200
        const FW_height = pf_ONE?.FW_height || 976

        // create button
        const fxdiv_1 = document.createElement('div')
        fxdiv_1.id = 'fxdiv_1'
        fxdiv_1.style = 'position:fixed; bottom:0; right:200px; z-index:2147483646;'
        document.body.appendChild(fxdiv_1)
        var button_1 = document.createElement('button_1')
        button_1.innerHTML = 'CAPTURE SCREENSHOT'
        button_1.id = 'capture'
        button_1.style.padding = '10px'
        button_1.style.opacity = '0.8'
        const theDiv = document.getElementById('fxdiv_1')
        theDiv.append(button_1)

        const ob = new MutationObserver((_muta, me) => {
            let el = document.querySelector('.proof-factor-cb-overlay')
            if (el) {
                document.querySelector('.proof-factor-cb-overlay').style.zIndex = '2147483645'
                document.getElementById('capture').addEventListener("click", () => {
                    capture('BOX');
                });
                me.disconnect();
                return;
            }
        });
        ob.observe(document, {
            childList: true,
            subtree: true
        });

        const ob2 = new MutationObserver((_muta, me) => {
            let el = document.querySelector('.proof-factor-fw-container')
            if (el) {
                document.querySelector('.proof-factor-fw-container').style.zIndex = '2147483645'
                document.getElementById('capture').addEventListener("click", () => {
                    capture('FW');
                });
                me.disconnect();
                return;
            }
        });
        ob2.observe(document, {
            childList: true,
            subtree: true
        });


        function capture(type) {
            let screen
            if (type === 'FW') {
                screen = document.querySelector('.proof-factor-fw-box')
                document.querySelector('.proof-factor-fw-button').style.marginTop = '1em';
            } else {
                screen = document.querySelector('.proof-factor-cb-prompt-content')
                screen.style.transform = `scale(${SB_CB_scale})`;
                document.querySelector('.proof-factor-cb-subscribe-button').style.marginTop = '1em';
            }

            var parent = screen.parentNode;
            var wrapper = document.createElement('div');
            parent.replaceChild(wrapper, screen);
            wrapper.appendChild(screen);
            wrapper.style.display = 'flex'
            wrapper.style.justifyContent = 'center';
            wrapper.style.alignItems = 'center';

            if (type === 'FW') {
                domtoimage.toPng(wrapper, {
                        width: FW_width,
                        height: FW_height
                    })
                    .then(function(dataUrl) {
                        var link = document.createElement('a');
                        link.download = getFormattedTime() + '.png';
                        link.href = dataUrl;
                        link.click();
                    });
            } else {
                domtoimage.toPng(wrapper, {
                        width: SB_CB_width,
                        height: SB_CB_height
                    })
                    .then(function(dataUrl) {
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
    } // end screenshotScript()


}); //end ready