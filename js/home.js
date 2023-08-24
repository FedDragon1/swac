document.addEventListener('DOMContentLoaded', () => {
    /**
     * 播放按钮hover
     */
    const firstPageHeight = document.getElementById('page-header').offsetTop + document.getElementById('page-header').offsetHeight + 5;
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
                .fromTo('#screen1-fs-wrapper', {top: 0}, {top: 3000, ease: "none"}, "<")
                .fromTo('.layout.homepage', {background: '#ffffffff'}, {background: '#222222ff'}, '<')
                .fromTo('#nav', {background: '#ffffffff'}, {background: '#aaaaaaff'}, '<')
                .fromTo('#text-hl-1', {opacity: 0}, {
                    opacity: 1,
                    ease: CustomEase.create("custom", "M0,0.2,C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")
                }, "<"),
        })
    })()

    particlesJS.load("particle-js")
    document.querySelector("#text-hl-1").style.opacity = '0.3';

    (function screen2anims() {
        ScrollTrigger.create({
            trigger: "#so-vits-project",
            start: "top 40%",
            end: "+=1500",
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#so-vits-text", {opacity: 0}, {opacity: 1, ease: CustomEase.create("custom", "M0,0 C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")})
                .fromTo("#so-vits-text", {top: 0}, {top: 1500, ease: "none"}, "<")
        })

        const vitsVideo = document.getElementById("so-vits-video").children[0];
        const loraVideo = document.getElementById("sd-lora-video").children[0];
        const aiVtbVideo = document.getElementById("ai-vtb-video").children[0];

        ScrollTrigger.create({
            trigger: "#so-vits-project",
            start: "top 10%",
            end: "+=1500",
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#so-vits-video", {opacity: 0}, {opacity: 1, ease: CustomEase.create("custom", "M0,0,C0,0.204,0.052,1,0.2,1,0.284,1,0.624,1,0.7,1,0.82,1,0.916,0,0.916,0,0.95,0,1,0,1,0")})
                .fromTo("#so-vits-video", {top: 400}, {top: 1600, ease: "none"}, "<"),
            onEnter() {
                vitsVideo.play();
            },
            onLeave() {
                vitsVideo.pause();
                vitsVideo.currentTime = 0;
            },
            onEnterBack() {
                vitsVideo.play();
            },
            onLeaveBack() {
                vitsVideo.pause();
                vitsVideo.currentTime = 0;
            }
        })

        ScrollTrigger.create({
            trigger: "#sd-lora-project",
            start: "top 40%",
            end: "+=1500",
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#sd-lora-text", {opacity: 0}, {opacity: 1, ease: CustomEase.create("custom", "M0,0 C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")})
                .fromTo("#sd-lora-text", {top: 0}, {top: 1500, ease: "none"}, "<")
        })

        ScrollTrigger.create({
            trigger: "#sd-lora-project",
            start: "top 10%",
            end: "+=1500",
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#sd-lora-video", {opacity: 0}, {opacity: 1, ease: CustomEase.create("custom", "M0,0,C0,0.204,0.052,1,0.2,1,0.284,1,0.624,1,0.7,1,0.82,1,0.916,0,0.916,0,0.95,0,1,0,1,0")})
                .fromTo("#sd-lora-video", {top: 400}, {top: 1600, ease: "none"}, "<"),
            onEnter() {
                loraVideo.play();
            },
            onLeave() {
                loraVideo.pause();
                loraVideo.currentTime = 0;
            },
            onEnterBack() {
                loraVideo.play();
            },
            onLeaveBack() {
                loraVideo.pause();
                loraVideo.currentTime = 0;
            }
        })

        ScrollTrigger.create({
            trigger: "#ai-vtb-project",
            start: "top 40%",
            end: "+=1500",
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#ai-vtb-text", {opacity: 0}, {opacity: 1, ease: CustomEase.create("custom", "M0,0 C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")})
                .fromTo("#ai-vtb-text", {top: 0}, {top: 1500, ease: "none"}, "<")
        })

        ScrollTrigger.create({
            trigger: "#ai-vtb-project",
            start: "top 10%",
            end: "+=1500",
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#ai-vtb-video", {opacity: 0}, {opacity: 1, ease: CustomEase.create("custom", "M0,0,C0,0.204,0.052,1,0.2,1,0.284,1,0.624,1,0.7,1,0.82,1,0.916,0,0.916,0,0.95,0,1,0,1,0")})
                .fromTo("#ai-vtb-video", {top: 400}, {top: 1600, ease: "none"}, "<"),
            onEnter() {
                aiVtbVideo.play();
            },
            onLeave() {
                aiVtbVideo.pause();
                aiVtbVideo.currentTime = 0;
            },
            onEnterBack() {
                aiVtbVideo.play();
            },
            onLeaveBack() {
                aiVtbVideo.pause();
                aiVtbVideo.currentTime = 0;
            }
        })
    })();

    (function screen3anims() {
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

        ScrollTrigger.create({
            trigger: "#screen3",
            start: 'top 35%',
            end: '+=6000',
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#screen3-fs-wrapper", {top: 0}, {
                    top: 6200,
                    ease: CustomEase.create("custom", "M0,0,C0,0,0.088,0.036,0.2,0.148,0.2,0.148,0.9,0.84,0.9,0.84,0.952,0.892,1,1,1,1", "<")
                })
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

        ScrollTrigger.create({
            trigger: "#screen3",
            start: 'top -=600',
            end: '+=5000',
            scrub: true,
            // markers: true,
            animation: gsap.timeline()
                .fromTo("#text-hl-3", {opacity: 0}, {
                    opacity: 1,
                    ease: CustomEase.create("custom", "M0,0 C0,0,0.016,1,0.2,1,0.304,1,0.734,1,0.8,1,0.988,1,1,0,1,0")
                }, "<")
        })
    })()

})
