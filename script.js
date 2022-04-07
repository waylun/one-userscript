$(document).ready(function() {

    // global variables
    const pf_ONE = unsafeWindow?.ONE || null
    const pf_url = window.location.href

    if (pf_url.includes('.myshopify.com/')) {
        screenshotScript()
    }

    if (pf_url.includes('apps.shopify.com/one/reviews')) {
        fetchReviewScript()
    }

    function fetchReviewScript() {
        // create button
        const ffdiv = document.createElement('div')
        ffdiv.id = 'ffdiv'
        ffdiv.style = 'position:fixed; bottom:0; right:200px; z-index:2147483646;'
        document.body.appendChild(ffdiv)
        var ffbutton = document.createElement('ffbutton')
        ffbutton.innerHTML = 'FETCH REVIEWS'
        ffbutton.id = 'one-fetch-reviews'
        ffbutton.style.padding = '10px'
        ffbutton.style.opacity = '0.8'
        const theDiv = document.getElementById('ffdiv')
        theDiv.append(ffbutton)
        // listening
        document.getElementById('one-fetch-reviews').addEventListener("click", () => {
            ffbutton.style.display = 'none'
            // start fetching
            const fxdiv = document.createElement('div')
            fxdiv.id = 'fxdiv'
            fxdiv.style = 'position:fixed; bottom:0; right:0; z-index:9999;'
            document.body.appendChild(fxdiv)
            var button = document.createElement('button')
            const theDiv = document.getElementById('fxdiv')
            theDiv.append(button)
            button.id = 'one+'
            button.style = 'background: black;padding: 15px 20px;color: white; border-radius: 5px;'
            button.innerHTML = 'One+'

            document.getElementById(button.id).addEventListener("click", function() {
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

        });
    }

    function screenshotScript() {

        const SB_CB_width = pf_ONE?.SB_CB_width || 690
        const SB_CB_height = pf_ONE?.SB_CB_height || 567
        const SB_CB_scale = pf_ONE?.SB_CB_scale || 0.9
        const FW_width = pf_ONE?.FW_width || 1200
        const FW_height = pf_ONE?.FW_height || 976

        // create button
        const fxdiv = document.createElement('div')
        fxdiv.id = 'fxdiv'
        fxdiv.style = 'position:fixed; bottom:0; right:200px; z-index:2147483646;'
        document.body.appendChild(fxdiv)
        var button = document.createElement('button')
        button.innerHTML = 'CAPTURE SCREENSHOT'
        button.id = 'capture'
        button.style.padding = '10px'
        button.style.opacity = '0.8'
        const theDiv = document.getElementById('fxdiv')
        theDiv.append(button)

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