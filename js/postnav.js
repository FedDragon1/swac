document.addEventListener("DOMContentLoaded", () => {
    let navIcon = document.querySelector(".site-name-img.computer");
    let target = document.querySelector("#page-header");
    let anchors = document.querySelectorAll("#menus .site-page:not(.child)");

    navIcon.src = "/img/icon-text-light.png";
    anchors.forEach(anchor => anchor.style.color = "white")

    document.addEventListener("scroll", btf.throttle((e) => {
        if (window.scrollY < target.offsetTop + target.offsetHeight) {
            navIcon.src = "/img/icon-text-light.png";
            anchors.forEach(anchor => anchor.style.color = "white")
        } else {
            navIcon.src = "/img/icon-text-dark.png"
            anchors.forEach(anchor => anchor.style.color = "")
        }
    }), 50)
})
