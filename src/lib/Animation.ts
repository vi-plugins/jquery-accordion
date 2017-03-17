import {JQueryModuleBase} from "jquery-base";
import {AccordionAnimationOptions} from "../interfaces/AnimationOptions";

export default class Demo extends JQueryModuleBase {

	constructor(private $element: JQuery,
				private options: AccordionAnimationOptions) {
		super();
	}

	init(): void {
		this.$element.find('.accordion__titleLink').on('click.accordionAnimation', (e) => {
			console.log('click');

			e.preventDefault();
			this.togglePanel( $(e.currentTarget) );
		});
	}

	togglePanel( $titleLink: JQuery ): void {
		let $panel = $titleLink.closest('accordion__panel');
		let $content = $panel.find('accordion__content');

		if($panel.hasClass('accordion__panel--open')) {
			$content.slideUp(this.options.closeDuration, () => {
				$panel.removeClass('accordion__panel--open');
			});
		} else {
			$content.slideDown(this.options.openDuration, () => {
				$panel.addClass('accordion__panel--open');
			});
		}
	}

	destroy(): void {
		this.$element.find('.accordion__titleLink').off('click.accordionAnimation');
	}

	test($element: JQuery): void {
		$element
			.html('TypeScript Plugin loaded')
			.css('backgroundColor', 'lightcoral')
			.on('click', () => {
				console.log('clicked element');
				$element.css('backgroundColor', 'green');
			});
	}

	add(x: number, y: number): number {
		return x + y;
	}
}
