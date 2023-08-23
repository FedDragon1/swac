document.addEventListener('DOMContentLoaded', () => {
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

    (function screen1anims() {

        gsap.registerPlugin(CustomEase);

        ScrollTrigger.create({
            trigger: '#screen1',
            start: 'top top',
            end: '+=3800',
            scrub: true,
            animation: gsap.timeline()
                .fromTo('#screen1-fs-wrapper', {top: 0}, {top: 3400, ease: "none"}, "<")
                .fromTo('.layout.homepage', {background: '#ffffffff'}, {background: '#222222ff'}, '<')
                .fromTo('#nav', {background: '#ffffffff'}, {background: '#aaaaaaff'}, '<')
                .fromTo('#text-hl-1', {opacity: 0}, {
                    opacity: 1,
                    ease: CustomEase.create("custom", "M0,0.2,C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")
                }, "<"),
        })
    })()

    particlesJS.load("particle-js")
    document.querySelector(".text-headline").style.opacity = '0.3';

    (function screen2anims() {
        const canvas = document.querySelector("#mlp-canvas")
        canvas.width = window.innerWidth * 0.8
        canvas.height = window.innerWidth * 0.8 * 9 / 16
        const ctx = canvas.getContext("2d")
        ctx.globalCompositeOperation = 'destination-over';
        const totalImages = 293;    // 293 frames

        const images = []
        for (let i = 0; i < totalImages; i++) {
            const img = new Image()
            img.src = `./img/mlp/${i}.webp`
            images.push(img)
        }

        function getImgAddress(index) {
            return `./img/mlp/${index}.webp`
        }

        ScrollTrigger.create({
            trigger: "#screen2",
            start: 'top 35%',
            end: '+=6000',
            scrub: true,
            markers: true,
            animation: gsap.timeline()
                .fromTo("#screen2-fs-wrapper", {top: 0}, {
                    top: 6200,
                    ease: CustomEase.create("custom", "M0,0,C0,0,0.088,0.036,0.2,0.148,0.2,0.148,0.9,0.84,0.9,0.84,0.952,0.892,1,1,1,1", "<")
                })
                .fromTo("#text-hl-2", {opacity: 0}, {opacity:1, ease: CustomEase.create("custom", "M0,0.2,C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")}, "<")
                //
                ,
            onUpdate: btf.throttle(self => {
                let index = Math.floor(self.progress * totalImages)
                requestAnimationFrame(() => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height)
                })
            }, 20)
        })

        // ScrollTrigger.create({
        //     trigger: "#screen2",
        //     start: "top top",
        //     end: "+=800",
        //     scrub: true,
        //     markers: true,
        //     animation: gsap.fromTo("#text-hl-2", {opacity: 0}, {opacity:1, ease: CustomEase.create("custom", "M0,0.2,C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")})
        // })

        // ScrollTrigger.create({
        //     trigger: "#screen2",
        //     start: "top top",
        //     end: "+=6300",
        //     scrub: true,
        //     markers: true,
        //     animation: gsap.to("#text-hl-2", {opacity: 0}, "+=6000")
        // })

    })()

})
