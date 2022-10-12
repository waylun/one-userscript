/**
unsafeWindow.ONE = {
  SB_CB_width: 690,
  SB_CB_height: 567,
  SB_CB_scale: 0.9,
  FW_width: 1200,
  FW_height: 976,
  take_screenshot: true,
  fetch_review: false,
};
 */

$(document).ready(function () {
  // global variables
  const pf_ONE = unsafeWindow?.ONE || null;

  if (pf_ONE?.take_screenshot) {
    screenshotScript();
  }

  if (pf_ONE?.fetch_review) {
    fetchReviewScript();
  }

  function fetchReviewScript() {
    const fxdiv_0 = document.createElement("div");
    fxdiv_0.id = "fxdiv_0";
    fxdiv_0.style = "position:fixed; bottom:0; right:0; z-index:9999;";
    document.body.appendChild(fxdiv_0);
    var button_0 = document.createElement("button_0");
    const theDiv = document.getElementById("fxdiv_0");
    theDiv.append(button_0);
    button_0.id = "one+";
    button_0.style =
      "background: black;padding: 15px 20px;color: white; border-radius: 5px;";
    button_0.innerHTML = "One+";

    document.getElementById(button_0.id).addEventListener("click", function () {
      let file_name = document
        .querySelector(".vc-app-listing-hero__heading")
        .innerText.replace(/:/g, "")
        .replace(/ /g, "-")
        .toLowerCase();

      let data = JSON.parse(sessionStorage.getItem("weeee"));
      var tt = arrayToCSV(data);
      // remove emoji
      tt = tt
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ""
        )
        .replace(/[\ud800-\udfff]/g, "");
      let csvContent = "data:text/csv;charset=utf-8," + tt;
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${file_name}_review.csv`);
      document.body.appendChild(link);
      link.click();
    });

    expendText();
    // Main review content
    var el = document.querySelectorAll(
      ".review-listing .review-content[data-truncate-review] .truncate-content-copy p"
    );
    // Developer reply
    var ed = document.querySelectorAll(
      ".review-listing .review-reply .review-content[data-truncate-reply] .truncate-content-copy p"
    );
    // Rating start count
    var ee = document.querySelectorAll(".review-listing .ui-star-rating");
    // Review header title
    var et = document.querySelectorAll(
      ".review-listing .review-listing-header__text"
    );
    // Review date
    var ep = document.querySelectorAll(
      ".review-listing .review-metadata__item-label"
    );
    // Review current page
    var eg = document.querySelector(".search-pagination__tag");
    // This main App title
    var ean = document.querySelector(".vc-app-listing-hero__heading");
    // This main App made by
    var epn = document.querySelector(".vc-app-listing-hero__by-line");
    // Location & Time spent using app
    var elo = document.querySelectorAll(
      ".review-listing .review-merchant-characteristic"
    );

    // always remove session if on the first page
    if (!location.search.includes("?page")) {
      sessionStorage.removeItem("weeee");
    }

    var go;
    try {
      go = JSON.parse(sessionStorage.getItem("weeee")) || [];
    } catch (e) {
      go = [];
    }

    for (let i = 0; i < ee.length; i++) {
      go.push({
        app_name: ean.innerText,
        partner_name: epn.innerText.replace("by ", ""),
        store_name: et[i].innerHTML.trim(),
        location:
          (elo[i] &&
            elo[i].innerText.split("\n")[0] &&
            elo[i].innerText.split("\n")[0].replace("Location ", "")) ||
          "",
        time_spent_using_app:
          (elo[i] &&
            elo[i].innerText.split("\n")[1] &&
            elo[i].innerText
              .split("\n")[1]
              .replace("Time spent using app ", "")) ||
          "",
        review:
          el[i] && el[i].innerHTML.replace(/(?:&nbsp;|<br>|\n)/g, " ").trim(),
        developer_reply:
          (ed[i] &&
            ed[i].innerHTML.replace(/(?:&nbsp;|<br>|\n)/g, " ").trim()) ||
          "",
        rating: ee[i].dataset.rating,
        posted: ep[i].innerHTML.trim(),
        page: eg && eg.innerHTML || "1",
      });
    }

    sessionStorage.setItem("weeee", JSON.stringify(go));
    const pre = document.querySelector(
      ".search-pagination__previous-page-text"
    );
    const next = document.querySelector(".search-pagination__next-page-text");

    if (next) {
      setTimeout(() => {
        next.click();
      });
    }
    if (!pre && !next) {
      setTimeout(() => {
        window.location.reload();
      }, 60000);
    }

    function expendText() {
      var mm = document.querySelectorAll(
        ".review-listing .truncate-content-toggle--show"
      );
      for (let i = 0; i < mm.length; i++) {
        if (
          mm[i].innerText === "Show full review" ||
          mm[i].innerText === "Show full reply"
        ) {
          mm[i].click();
        }
      }
    }

    function arrayToCSV(objArray) {
      const array =
        typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
      let str =
        `${Object.keys(array[0])
          .map((value) => `"${value}"`)
          .join(",")}` + "\r\n";
      return array.reduce((str, next) => {
        str +=
          `${Object.values(next)
            .map((value) =>
              `"${value}"`
                .replace(/,/g, " ")
                .replace(/'/g, " ")
                .replace(/"/g, " ")
                .replace(/#/g, " ")
            )
            .join(",")}` + "\r\n";
        return str;
      }, str);
    }
  } // end of fetchReviewScript()

  function screenshotScript() {
    const SB_CB_width = pf_ONE?.SB_CB_width || 690;
    const SB_CB_height = pf_ONE?.SB_CB_height || 567;
    const SB_CB_scale = pf_ONE?.SB_CB_scale || 0.9;
    const FW_width = pf_ONE?.FW_width || 1200;
    const FW_height = pf_ONE?.FW_height || 976;

    // create button
    const fxdiv_1 = document.createElement("div");
    fxdiv_1.id = "fxdiv_1";
    fxdiv_1.style =
      "position:fixed; bottom:0; right:200px; z-index:2147483646;background:black;color:white;cursor:pointer;padding:5px;";
    document.body.appendChild(fxdiv_1);
    var button_1 = document.createElement("button_1");
    button_1.innerHTML = "CAPTURE SCREENSHOT";
    button_1.id = "capture";
    button_1.style.padding = "10px";
    button_1.style.opacity = "0.8";
    const theDiv = document.getElementById("fxdiv_1");
    theDiv.append(button_1);

    const ob = new MutationObserver((_muta, me) => {
      let el = document.querySelector(".proof-factor-cb-overlay");
      if (el) {
        document.querySelector(".proof-factor-cb-overlay").style.zIndex =
          "2147483645";
        document.getElementById("capture").addEventListener("click", () => {
          capture("BOX");
        });
        me.disconnect();
        return;
      }
    });
    ob.observe(document, {
      childList: true,
      subtree: true,
    });

    const ob2 = new MutationObserver((_muta, me) => {
      let el = document.querySelector(".proof-factor-fw-container");
      if (el) {
        document.querySelector(".proof-factor-fw-container").style.zIndex =
          "2147483645";
        document.getElementById("capture").addEventListener("click", () => {
          capture("FW");
        });
        me.disconnect();
        return;
      }
    });
    ob2.observe(document, {
      childList: true,
      subtree: true,
    });

    function capture(type) {
      let screen;
      if (type === "FW") {
        screen = document.querySelector(".proof-factor-fw-box");
        // fix smushes bug
        document.querySelector(".proof-factor-fw-button").style.marginTop =
          "1em";

        const inputsLength = document.querySelectorAll('.proof-factor-fw-input-field')?.length
        if(inputsLength > 1) {
          document.querySelectorAll('.proof-factor-fw-input-field div')[inputsLength - 1].style.marginTop = '1em'
        }
      } else {
        screen = document.querySelector(".proof-factor-cb-prompt-content");
        screen.style.transform = `scale(${SB_CB_scale})`;
        // fix smushes bug
        document.querySelector(
          ".proof-factor-cb-subscribe-button"
        ).style.marginTop = "1em";

        const inputsLength = document.querySelectorAll('.proof-factor-cb-input-field')?.length
        if(inputsLength > 1) {
          document.querySelectorAll('.proof-factor-cb-input-field div')[inputsLength - 1].style.marginTop = '1em'
        }
      }

      var parent = screen.parentNode;
      var wrapper = document.createElement("div");
      parent.replaceChild(wrapper, screen);
      wrapper.appendChild(screen);
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "center";
      wrapper.style.alignItems = "center";

      // remove branding since it will cause the error for capturing
      const branding = document.querySelector(".proof-factor-cb-prompt-branding")
      branding && branding.remove();

      if (type === "FW") {
        domtoimage
          .toPng(wrapper, {
            width: FW_width,
            height: FW_height,
          })
          .then(function (dataUrl) {
            var link = document.createElement("a");
            link.download = getFormattedTime() + ".png";
            link.href = dataUrl;
            link.click();
          }).catch((e) => {
            console.log("FW error", e);
          });
      } else {
        domtoimage
          .toPng(wrapper, {
            width: SB_CB_width,
            height: SB_CB_height,
          })
          .then(function (dataUrl) {
            var link = document.createElement("a");
            link.download = getFormattedTime() + ".png";
            link.href = dataUrl;
            link.click();
          }).catch(e => {
              console.log('BOX error', e)
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
  } // end of screenshotScript()
}); // end of document.ready() 
