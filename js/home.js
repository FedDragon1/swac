document.addEventListener('DOMContentLoaded',() => {
    /**
     * 播放按钮hover
     */
    const firstPageHeight = document.getElementById('page-header').offsetTop + document.getElementById('page-header').offsetHeight;
    const body = document.getElementsByTagName("body")[0]
    const playButtonTriangle = document.getElementById("play-btn-triangle")
    const playButton = document.getElementById("play-btn")
    const playButtonHover = () => {
        playButtonTriangle.classList.add("hover")
    }
    const playButtonUnhover = () => {
        playButtonTriangle.classList.remove("hover")
    }
    playButton.addEventListener("mouseover", btf.throttle(playButtonHover, 200))
    playButton.addEventListener("mouseout", btf.throttle(playButtonUnhover, 200))

    const videoPlayerWrapper = document.getElementById("promo-wrapper")
    const cross = document.getElementById('promo-close')
    const playButtonClick = () => {
        videoPlayerWrapper.style.zIndex = '3000';
        videoPlayerWrapper.style.opacity = '1';
        body.style.overflowY = "hidden"
    }
    const crossClickCallback = () => {
        videoPlayerWrapper.style.zIndex = '-1'
        body.style.overflowY = "scroll"
    }
    const crossClick = () => {
        videoPlayerWrapper.style.opacity = '0'
        setTimeout(crossClickCallback, 500)
    }

    playButton.addEventListener('click', playButtonClick)
    cross.addEventListener('click', crossClick)

    /**
     * 首页滑动检测
     */

        // find the scroll direction

    const scrollDetect = (e) => {
        if (videoPlayerWrapper.style.zIndex === '3000') {
            return
        }

        //test if first page
        const isDown = e.deltaY > 0
        if (window.scrollY < firstPageHeight && isDown) {
            e.preventDefault()
            btf.scrollToDest(firstPageHeight, 300)
            // disable self and disable scroll for 1 second
            window.removeEventListener('DOMMouseScroll', scrollDetect, false);
            window.removeEventListener(wheelEvent, scrollDetect, wheelOpt);
            disableScroll()
            setTimeout(enableScroll, 500, scrollDetect)
        } else if (window.scrollY + e.deltaY < firstPageHeight && !isDown) {
            e.preventDefault()
            btf.scrollToDest(0, 300)
            window.removeEventListener('DOMMouseScroll', scrollDetect, false);
            window.removeEventListener(wheelEvent, scrollDetect, wheelOpt);
            disableScroll()
            setTimeout(enableScroll, 500, scrollDetect)
        }
    }

    btf.filterWheelAndMouse(btf.throttle(scrollDetect, 500))
    document.getElementById("current-year-last-two").innerText = new Date().getFullYear().toString().substr(-2);

    gsap.registerPlugin(CustomEase);

    ScrollTrigger.create({
        trigger: '#screen1',
        start: 'top top',
        end: '+=3000',
        scrub: true,
        animation: gsap.timeline()
            .fromTo('.text-headline', {top: 0}, {top: 2600, ease: "none"}, "<")
            .fromTo('.text-headline', {opacity: 0}, {opacity:1, ease: CustomEase.create("custom", "M0,0.2,C0,0.2,0,1,0.2,1,0.33,1,0.8,1,0.8,1,1,1,1,0,1,0")}, "<")
    })
})