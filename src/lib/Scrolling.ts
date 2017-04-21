import {JQueryModuleBase} from "jquery-base";
import {AccordionScrollingOptions} from "../interfaces/ScrollingOptions";

export default class Scrolling extends JQueryModuleBase {

	constructor(protected $element: JQuery,
				protected options: AccordionScrollingOptions) {
		super();
	}

	init(): void {

		this.$element.children().on('before.close.panel.accordion', (e, $param) =>{
			e.preventDefault();
			if ($param) {
				this.calcScroll($param);
			}
		});

	}

	calcScroll ($activePanel: JQuery): void {

		let scrollTopPosition: number;
		let openedContentHeight: number = 0;
		let elementsBeforeHeight: number = 0;

		if ( $activePanel.prevAll('.accordion__panel--open').length > 0){

			$activePanel.prevUntil('.accordion__panel--open').each( (index, elem)=>{
				elementsBeforeHeight = elementsBeforeHeight+ $(elem).outerHeight(true);
			});

			openedContentHeight = $activePanel.prevAll('.accordion__panel--open').find('.accordion__content').outerHeight();
		}

		if ( this.options.dependencySelector ){
			scrollTopPosition = this.getScrollTopPosition($activePanel, $(this.options.dependencySelector));
		} else {
			scrollTopPosition = this.getScrollTopPosition($activePanel);
		}

		if ( !this.isPanelInViewport(scrollTopPosition - openedContentHeight) || !this.isElementInViewport($activePanel)){
			this.animateScrolling(scrollTopPosition - openedContentHeight);
		}

	}

	getScrollTopPosition ($elem: JQuery, $dependency? : JQuery): number  {
		let dependencyHeight = $dependency ? $dependency.outerHeight() : 0;
		let additionalTopSpace = this.options.scrollTopAdditionalSpace ?  this.options.scrollTopAdditionalSpace : 0;

		return $elem.offset().top - ( dependencyHeight + additionalTopSpace);
	}

	isPanelInViewport (scrollTopPosition: number): boolean {
		return $(window).scrollTop() <= scrollTopPosition;
	}

	isElementInViewport($elem: JQuery): boolean {
		return $elem.offset().top - $(window).scrollTop() <= $(window).height();
	}

	animateScrolling (scrollTo: number): void {

		$('html, body').animate({
			scrollTop: scrollTo
		}, this.options.duration || 500);
	}

	destroy(): void {
		this.$element.find('.accordion__titleLink').off('click.accordionScrolling');
	}

}
