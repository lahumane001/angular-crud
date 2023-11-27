import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[userDir]'
})

export class userDirective {

    constructor(private render: Renderer2,private el: ElementRef ) { }

    @HostListener('mouseover') onMouseOver() {
        this.render.setStyle(this.el.nativeElement , 'backgroundColor' , '#c2c8cd')
        
    }
    @HostListener('mouseout') onMouseOut() {
        this.render.setStyle(this.el.nativeElement , 'backgroundColor' , 'white')
        
    }
    
}