import {JQueryModuleBase} from "jquery-base";
import {AccordionAnimationOptions} from "../interfaces/AnimationOptions";

export default class Animation extends JQueryModuleBase {

	constructor(protected $element: JQuery,
				protected options: AccordionAnimationOptions) {
		super();
	}

	init(): void {

		/*if ( this.$element.attr('data-auto-close') ){
			console.log('attr found');
			console.log(this.$element.data('auto-close'));
			this.options.autoClose = this.$element.data('auto-close');
		}else {
			console.log('attr not found');
		}
		console.log(this.options.autoClose);*/


		this.options.autoClose = this.$element.attr('data-auto-close') ? this.$element.data('auto-close') != 'true' : this.options.autoClose;

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

			if (this.options.autoClose){
				this.hideAllPannels($panel);
			}

		}
	}

	hideAllPannels ($activePanel: JQuery): void {

		this.$element.find('.accordion__panel--open').each( (index, elem)=>{
			let $elem = $(elem);
			this.hidePanel( $elem.find('.accordion__content'),$elem, $activePanel );
		});

	}

	showPanel( $content: JQuery, $panel: JQuery ): void {

		$panel.trigger('before.open.panel.accordion');
		$content.slideDown(this.options.openDuration, () => {
			$panel.addClass('accordion__panel--open');
			$panel.trigger('after.open.panel.accordion');
		});

	}

	hidePanel( $content: JQuery, $panel: JQuery, $activePanel?: JQuery ): void {

		$panel.trigger('before.close.panel.accordion',[$activePanel || null]);
		$content.slideUp(this.options.closeDuration, () => {
			$panel.removeClass('accordion__panel--open');
			$panel.trigger('after.close.panel.accordion');
		});

	}

	destroy(): void {
		this.$element.find('.accordion__titleLink').off('click.accordionAnimation');
	}

}
