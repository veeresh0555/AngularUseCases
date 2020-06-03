import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  @Input() styleObj:any;
  @Input() defaultStyleObj:any;

  constructor(private element:ElementRef) { 
    this.highlight(this.defaultStyleObj||{backgroundColor:'#091D5B'});
  }

  /**
  * @description This method will be called on mouseEnter
  */
  @HostListener('mouseenter') mouseEnter()
  {
    
    this.highlight(this.styleObj);
   
  }

  /**
  * @description This method will be called on mouseLeave
  */
  @HostListener('mouseleave') mouseLeave()
  {
    this.highlight(this.defaultStyleObj);
  }

   /**
  * @description This method applies style to html element
  * @param obj
  */
  highlight(obj:any) {
    console.log(this.styleObj,this.defaultStyleObj);
    this.element.nativeElement.style.backgroundColor=obj?.backgroundColor;
    this.element.nativeElement.style.color=obj?.color;
  }


}
