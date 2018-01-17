import {JQueryModuleBase} from "jquery-base";
import {AccordionAnimationOptions} from "../interfaces/AnimationOptions";

export default class Animation extends JQueryModuleBase {

	constructor(protected $element: JQuery,
				protected options: AccordionAnimationOptions) {
		super();
	}

	init(): void {

		this.checkDataAttributes();
		this.$element.find('.accordion__titleLink').on('click.panel.accordion', (e) => {
			e.preventDefault();
			this.togglePanel($(e.currentTarget));
		});
	}

	protected setActivePanel(index: number):void {
		this.$element.find('.accordion__panel').eq(index).addClass('accordion__panel--open');
	}

	protected checkDataAttributes(): void {

		if ( this.$element.attr('data-auto-close') ) {
			this.options.autoClose = this.$element.data('auto-close');
		}

		if (this.$element.attr('data-open-duration')) {
			this.options.openDuration = this.$element.data('open-duration');
		}

		if (this.$element.attr('data-close-duration')) {
			this.options.closeDuration = this.$element.data('close-duration');
		}

		if (this.options.openedPanelIndex !== undefined){
			this.setActivePanel(this.options.openedPanelIndex);
		}
	}

	protected togglePanel($titleLink: JQuery): void {
		let $panel = $titleLink.closest('.accordion__panel');
		let $content = $panel.find('.accordion__content');

		if ($panel.hasClass('accordion__panel--open')) {
			this.hidePanel($content, $panel);
		} else {
			if (this.options.autoClose) {
				this.hideAllPannels($panel);
			}
			this.showPanel($content, $panel);
		}
	}

	protected hideAllPannels($activePanel: JQuery): void {
		this.$element.find('.accordion__panel--open').each((index, elem) => {
			let $elem = $(elem);
			this.hidePanel($elem.find('.accordion__content'), $elem, $activePanel);
		});
	}

	protected showPanel($content: JQuery, $panel: JQuery): void {
		$panel
			.trigger('before.open.panel.accordion')
			.addClass('accordion__panel--opening');
		$content.slideDown(this.options.openDuration, () => {
			$panel
				.addClass('accordion__panel--open')
				.removeClass('accordion__panel--opening')
				.trigger('after.open.panel.accordion', {panel: $panel, position: this.getPanelPosition()});
				$content.removeAttr('style');
		});
	}

	protected getPanelPosition(): number{
		let opened: number = null;
		this.$element.find('.accordion__panel').each( (index, elem) => {
			if ( $(elem).hasClass('accordion__panel--open') ) {
				opened = index;
				return
			}
		});
		return opened;
	}

	protected hidePanel($content: JQuery, $panel: JQuery, $activePanel?: JQuery): void {
		$panel
			.trigger('before.close.panel.accordion', [$activePanel || null])
			.addClass('accordion__panel--closing');

		if( this.$element.data())


		$content.slideUp(this.options.closeDuration, () => {
			$panel
				.removeClass('accordion__panel--open')
				.removeClass('accordion__panel--closing')
				.trigger('after.close.panel.accordion');
			$content.removeAttr('style');
		});
	}

	destroy(): void {
		this.$element.find('.accordion__titleLink').off('click.panel.accordion');
	}
}
