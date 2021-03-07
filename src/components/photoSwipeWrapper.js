import React, {useRef, useEffect} from "react"
import '../../node_modules/photoswipe/dist/photoswipe.css'
import '../../node_modules/photoswipe/dist/default-skin/default-skin.css'
import PhotoSwipe from '../../node_modules/photoswipe/dist/photoswipe.js'
import PhotoSwipeUI_Default from '../../node_modules/photoswipe/dist/photoswipe-ui-default.js'

export default function PhotoSwipeWrapper({index, items, onClose}){
    let pswpElement = useRef(null);
    const options = {
        index: index === -1 ? 0 : index,
        closeOnScroll: false,
        history: false
    };


    useEffect(() => {
        const photoSwipe = new PhotoSwipe(pswpElement.current, PhotoSwipeUI_Default, items, options);
        var currentResolution = 2;
        var firstResize = true;
        var imageSrcWillChange;
        if(photoSwipe) {
            if(index !== -1){
                photoSwipe.listen('destroy', () => {
                    onClose();
                });
                photoSwipe.listen('close', () => {
                    onClose();
                });
                photoSwipe.listen('beforeResize', function() {
                    let resolution = photoSwipe.viewportSize.x * window.devicePixelRatio;
                    if(currentResolution !== 1 && resolution < 320){
                        currentResolution = 1;
                        imageSrcWillChange = true;
                    }
                    else if(currentResolution !== 2 && resolution < 760 && resolution > 320){
                        currentResolution = 2;
                        imageSrcWillChange = true;
                    }
                    else if(currentResolution !== 3 && resolution < 1720 && resolution > 760){
                        currentResolution = 3;
                        imageSrcWillChange = true;
                    }
                    else if(currentResolution !== 4 && resolution > 1720){
                        currentResolution = 4;
                        imageSrcWillChange = true;
                    }

                    if(imageSrcWillChange && !firstResize){
                        photoSwipe.invalidateCurrItems();
                    }
                    if(firstResize){
                        firstResize = false;
                    }
                    imageSrcWillChange = false;
                })
                photoSwipe.listen('gettingData', function(index,item){
                    let found = -1;
                    if(currentResolution === 1){
                        found = item.fluidImages.findIndex(elt => elt.width > 320);
                    }
                    else if(currentResolution === 2){
                        found = item.fluidImages.findIndex(elt => elt.width > 760);
                    }
                    else if(currentResolution === 3){
                        found = item.fluidImages.findIndex(elt => elt.width > 1720);
                    }
                    if(currentResolution === 4 || found === -1){
                        found = item.fluidImages.length-1;
                    }
                    item.src = item.fluidImages[found].src;
                    item.w = item.fluidImages[found].width;
                    item.h = item.fluidImages[found].height;
                });
                photoSwipe.init();
            }
            if(index === -1){
                onClose();
            }
        }
    },[onClose,options,items,index])

    return(
        <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={pswpElement}>
            <div className="pswp__bg"></div>
            <div className="pswp__scroll-wrap">
                <div className="pswp__container">
                    <div className="pswp__item"></div>
                    <div className="pswp__item"></div>
                    <div className="pswp__item"></div>
                </div>
                <div className="pswp__ui pswp__ui--hidden">
                    <div className="pswp__top-bar">
                        <div className="pswp__counter"></div>
                        {/* eslint-disable-next-line no-use-before-define */}
                        <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div className="pswp__preloader">
                            <div className="pswp__preloader__icn">
                                <div className="pswp__preloader__cut">
                                    <div className="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                    <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                    <div className="pswp__caption">
                        <div className="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}