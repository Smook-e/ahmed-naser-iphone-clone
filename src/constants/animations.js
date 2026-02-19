import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



export const gsapScrollTrigger = (target, animationProps, scrollProps) =>{
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: "restart none restart none",
            start: "top 90%",
            ...scrollProps,
        }
    })

}






export const animateWithGsap = (tl, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
    

    tl.to(firstTarget, {
        ...animationProps,
        ease: 'power2.inOut',
    }, '<')
    tl.to(secondTarget, {
        ...animationProps,
        ease: 'power2.inOut',
    }, '<')
}