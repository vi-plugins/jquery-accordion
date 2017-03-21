import {JQueryModuleBase} from "jquery-base";
import {AccordionAnimationOptions} from "../interfaces/AnimationOptions";

export default class Animation extends JQueryModuleBase {

	constructor(protected $element: JQuery,
				protected options: AccordionAnimationOptions) {
		super();
	}

	init(): void {
		console.log(this.options);

		this.$element.find('.accordion__titleLink').on('click.accordionAnimation', (e) => {
			e.preventDefault();
			this.togglePanel( $(e.currentTarget) );
		});
	}

	togglePanel( $titleLink: JQuery ): void {
		let $panel = $titleLink.closest('.accordion__panel');
		let $content = $panel.find('.accordion__content');

		if($panel.hasClass('accordion__panel--open')) {
			this.hidePanel($content, $panel);
		} else {
			this.showPanel($content, $panel);
		}
	}

	showPanel( $content: JQuery, $panel: JQuery ): void {
		$content.slideDown(this.options.openDuration, () => {
			$panel.addClass('accordion__panel--open');
		});
	}

	hidePanel( $content: JQuery, $panel: JQuery ): void {
		$content.slideUp(this.options.closeDuration, () => {
			$panel.removeClass('accordion__panel--open');
		});
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
