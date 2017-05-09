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

		this.$element.find('.accordion__tabsTitleLink').on('click.panel.tabs.accordion', (e) => {
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
				<li class="accordion__tabsPanel">
					<a class="accordion__tabsTitleLink"></a>
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
				this.$element.find('.accordion__tabsPanel').eq(index).addClass('accordion__tabsPanel--open');
			}

			// fill child markup with text from accordion titleLink
			this.$element.find('.accordion__tabsTitleLink').eq(index).append($(elem).text());
		});
	}

	protected toggleTabs($elem: JQuery): void {
		let activeTabIndex = $elem.parents('.accordion__tabsPanel').index();

		// remove all active tabs
		this.$element.find('.accordion__tabsPanel').removeClass('accordion__tabsPanel--open');

		// remove all active accordion panels
		this.$element.find('.accordion__panel').removeClass('accordion__panel--open accordion__panel--animation');

		// set new active tab
		$elem.parents('.accordion__tabsPanel').addClass('accordion__tabsPanel--open');

		// set new active accordion panel and trigger event
		this.$element.find('.accordion__panel').eq(activeTabIndex)
			.addClass('accordion__panel--open accordion__panel--animation')
			.trigger('after.open.panel.accordion');
	}

	protected fitIntoParent(): boolean {
		let contentWidth: number = this.$element.innerWidth();
		let tabsWidth: number = 0;
		let fits: boolean = true;

		this.$element.find('.accordion__tabsPanel').each((index, elem) => {

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
			// accordion has more than one panel opened. Remove open classes from every opened panels except first found
			$accordionOpenedPanels.slice(1).removeClass('accordion__panel--open accordion__panel--animation');

		} else if ($accordionOpenedPanels.length < 1) {

			// accordion has no opened panels. set first tab as opened
			activePanelIndex = 0;

			this.$element.find('.accordion__panel').eq(activePanelIndex)
				.addClass('accordion__panel--open accordion__panel--animation')
				.trigger('after.open.panel.accordion');
		}

		// remove all active tabs panels
		this.$element.find('.accordion__tabsPanel').removeClass('accordion__tabsPanel--open');

		// set new active tab panel
		this.$element.find('.accordion__tabsPanel').eq(activePanelIndex).addClass('accordion__tabsPanel--open');

		// display tabs element
		this.$element.find('.accordion__tabs').addClass('accordion__tabs--visible');

		//hide accordion panels titles
		this.$element.find('.accordion__panel').find('.accordion__title').css('display', 'none');
	}

	protected hideTabs(): void {
		// hide tabs element
		this.$element.find('.accordion__tabs').removeClass('accordion__tabs--visible');

		//show accordion panels
		this.$element.find('.accordion__panel').find('.accordion__title').css('display', 'block');
	}

	destroy(): void {
		this.$element.find('.accordion__tabsTitleLink').off('click.panel.tabs.accordion');
	}
}
