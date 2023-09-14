document.addEventListener("DOMContentLoaded", () => {
    let navIcon = document.querySelector(".site-name-img.computer");
    let target = document.querySelector("#page-header");

    document.addEventListener("scroll", btf.throttle((e) => {
        console.log(e)

        if (window.scrollY < target.offsetTop + target.offsetHeight) {
            navIcon.src = "/img/icon-text-light.png";
        } else {
            navIcon.src = "/img/icon-text-dark.png"
        }
    }))
})