import {JQueryModuleBase} from "jquery-base";
import {AccordionAnimationOptions} from "../interfaces/AnimationOptions";

export default class Animation extends JQueryModuleBase {

	constructor(protected $element: JQuery,
				protected options: AccordionAnimationOptions) {
		super();
	}

	init(): void {
		if (this.$element.attr('data-auto-close')) {
			this.options.autoClose = this.$element.data('auto-close');
		}

		this.$element.find('.accordion__titleLink').on('click.panel.accordion', (e) => {
			e.preventDefault();
			this.togglePanel($(e.currentTarget));
		});
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
		$panel.trigger('before.open.panel.accordion');
		$panel.addClass('accordion__panel--open');
		$content.slideDown(this.options.openDuration, () => {
			$panel.trigger('after.open.panel.accordion');
		});
	}

	protected hidePanel($content: JQuery, $panel: JQuery, $activePanel?: JQuery): void {
		$panel.trigger('before.close.panel.accordion', [$activePanel || null]);
		$content.slideUp(this.options.closeDuration, () => {
			$panel.removeClass('accordion__panel--open');
			$panel.trigger('after.close.panel.accordion');
		});
	}

	destroy(): void {
		this.$element.find('.accordion__titleLink').off('click.panel.accordion');
	}
}
