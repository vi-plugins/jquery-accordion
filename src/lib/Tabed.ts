import {JQueryModuleBase} from "jquery-base";
import {AccordionTabedOptions} from "../interfaces/TabedOptions";

export default class Animation extends JQueryModuleBase {

	constructor(protected $element: JQuery,
				protected options: AccordionTabedOptions) {
		super();
	}

	init(): void {
		if (this.options.active) {
			this.renderTabs();
			this.toggleView();
			this.eventListener();
		}
	}

	protected eventListener(): void {
		let resizeTimer: any;
		$(window).on('resize.window.tabs.accordion', () => {

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				this.toggleView();
			}, 250);
		});

		this.$element.find('.accordion__tabs__titleLink').on('click.panel.tabs.accordion', (e) => {
			e.preventDefault();
			this.toggleTabs($(e.currentTarget));
		});
	}

	protected toggleView(): void {
		if (this.fitIntoParent() && $(window).width() > this.options.startAt) {
			this.showTabs();
		} else {
			this.hideTabs();
		}
	}

	protected renderTabs(): void {
		// inserted markup
		const insertedTabMarkup = {
			parent: '<ul class="accordion__tabs"></ul>',
			child: `
				<li class="accordion__tabs__panel">
					<a class="accordion__tabs__titleLink"></a>
				</li>`
		};

		// create list container
		this.$element.prepend(insertedTabMarkup.parent);

		// create list item from accordion items
		this.$element.find('.accordion__titleLink').each((index, elem) => {

			// append child markup
			this.$element.find('.accordion__tabs').append(insertedTabMarkup.child);

			// set active tab
			if ($(elem).parents('.accordion__panel').is('[class*=--open]')) {
				this.$element.find('.accordion__tabs__panel').eq(index).addClass('accordion__tabs__panel--open');
			}

			// fill child markup with text from accordion titleLink
			this.$element.find('.accordion__tabs__titleLink').eq(index).append($(elem).text());
		});
	}

	protected toggleTabs($elem: JQuery): void {
		let activeTabIndex = $elem.parents('.accordion__tabs__panel').index();

		// remove all active tabs
		this.$element.find('.accordion__tabs__panel').removeClass('accordion__tabs__panel--open');

		// remove all active accordion panels
		this.$element.find('.accordion__panel').removeClass('accordion__panel--open accordion__panel--animation');

		// set new active tab
		$elem.parents('.accordion__tabs__panel').addClass('accordion__tabs__panel--open');

		// set new active accordion panel
		this.$element.find('.accordion__panel').eq(activeTabIndex).addClass('accordion__panel--open accordion__panel--animation');
	}

	protected fitIntoParent(): boolean {
		let contentWidth: number = this.$element.innerWidth();
		let tabsWidth: number = 0;
		let fits: boolean = true;

		this.$element.find('.accordion__tabs__panel').each((index, elem) => {

			tabsWidth = tabsWidth + $(elem).outerWidth();
			if (tabsWidth >= contentWidth) {
				fits = false;
				return false;
			}
		});
		return fits;
	}

	protected showTabs(): void {
		let $accordionOpenedPanels: JQuery = this.$element.find('.accordion__panel--open');
		let activePanelIndex: number = $accordionOpenedPanels.index() - 1;

		if ($accordionOpenedPanels.length > 1) {
			// accordion has more than one panel opened. use only first
			$accordionOpenedPanels.not(':first-child').removeClass('accordion__panel--open accordion__panel--animation');
			this.$element.find('.accordion__panel').eq(activePanelIndex).addClass('accordion__panel--open accordion__panel--animation');

		} else if ($accordionOpenedPanels.length < 1) {

			// accordion has no opened panels. set first tab as opened
			activePanelIndex = 0;
			this.$element.find('.accordion__panel').eq(activePanelIndex).addClass('accordion__panel--open accordion__panel--animation');
		}

		// remove all active tabs panels
		this.$element.find('.accordion__tabs__panel').removeClass('accordion__tabs__panel--open');

		// set new active tab panel
		this.$element.find('.accordion__tabs__panel').eq(activePanelIndex).addClass('accordion__tabs__panel--open');

		// display tabs element
		this.$element.find('.accordion__tabs').css({'position': 'relative', 'visibility': 'visible'});

		//hide accordion panels titles
		this.$element.find('.accordion__panel').find('.accordion__title').css('display', 'none');
	}

	protected hideTabs(): void {

		// hide tabs element
		this.$element.find('.accordion__tabs').css({'position': 'absolute', 'visibility': 'hidden'});

		//show accordion panels
		this.$element.find('.accordion__panel').find('.accordion__title').css('display', 'block');
	}

	destroy(): void {
		this.$element.find('.accordion__tabs__titleLink').off('click.panel.tabs.accordion');
	}
}
