class Carousel {
    constructor(el) {
        this.el = el;
        this.currentIndex = 0;
        this.slidesMargin = 0;
        this.initElements();
        this.initCarousel();
        this.listenEvents();
    }

    initElements() {
        this.elements = {
            prev: this.el.querySelector('[data-prev]'),
            next: this.el.querySelector('[data-next]'),
            slides: this.el.querySelector('.slides'),
        };
    }

    initCarousel() {
        this.initSlides();
    }

    initSlides() {
        this.slides = this.el.querySelectorAll('.slide');
    }

    listenEvents() {
        this.elements.next.addEventListener('click', () => {
            if (this.currentIndex >= this.slides.length -3) {
                this.createImg();
            }
            if(this.currentIndex < this.slides.length){
                this.elements.slides.style.transition = 'all 300ms linear 0s'
                this.slidesMargin -= this.getSlideWidth(this.currentIndex);
                this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
                this.currentIndex++;
            }
            this.elements.slides.addEventListener('transitionend', () => {
                if (this.currentIndex >= this.slides.length) {
                    this.getJumpNext();
                }
            })
        });

        this.elements.prev.addEventListener('click', () => {
            if (this.currentIndex <= 0) {
                this.createImg()
                this.getJumpPrev();
            }
            this.slidesMargin += this.getSlideWidth(this.currentIndex - 1);
            this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
            this.currentIndex--;
            this.elements.slides.style.transition = 'all 300ms linear 0s'
        });
    }

    createImg() {
        const first = this.slides[0].cloneNode(true);
        const second = this.slides[1].cloneNode(true);
        const three= this.slides[2].cloneNode(true);
        if(this.slides[this.slides.length-1].id === "last"){
            this.elements.slides.appendChild(first);
            this.elements.slides.appendChild(second);
            this.elements.slides.appendChild(three);
        }
    }
    getJumpNext() {
        this.elements.slides.style.transition = "none";
        this.slidesMargin = 0;
        this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
        this.currentIndex = 0;
    }

    getJumpPrev() {
        this.elements.slides.style.transition = "none";
        // 60 its (margen between slides (10) * (this.slides.length-1))
        this.slidesMargin = -(this.getSlideWidth(this.currentIndex)*(this.slides.length)+60);
        this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
        this.currentIndex = this.slides.length;
    }

    getSlideWidth(index) {
        const slide = this.slides[index];
        const style = window.getComputedStyle(slide);
        const slideInnerSize = slide.getBoundingClientRect();
        return slideInnerSize.width
            + parseInt(style.marginLeft, 10)
            + parseInt(style.marginRight, 10);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel(document.querySelector('.carousel'));
    console.dir(carousel);
});
