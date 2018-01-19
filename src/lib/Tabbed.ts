import {JQueryModuleBase} from "jquery-base";
import {AccordionTabbedOptions} from "../interfaces/TabbedOptions";
import EventHelper from 'jquery-events';

export default class Animation extends JQueryModuleBase {

	private tabsActive: boolean = false;

	constructor(protected $element: JQuery,
				protected options: AccordionTabbedOptions) {
		super();
	}

	init(): void {

		if (this.$element.hasClass('tabbed')) {
			this.options.active = true;
		}

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

		this.$element.find('.viAccordion__tabsTitleLink').on('click.panel.tabs.accordion', (e) => {
			e.preventDefault();
			this.toggleTabs($(e.currentTarget));
		});
	}

	protected toggleView(): void {

		let tabsFitCheck: boolean = false;

		if (this.options.preventOverfulTabHeaders === true ){
			tabsFitCheck = this.fitIntoParent();
		}else {
			tabsFitCheck = true;
		}

		if (tabsFitCheck && $(window).outerWidth() >= this.options.minViewportWidth) {

			// only if tabs view status changes
			if (this.tabsActive === false ) {
				EventHelper.wrapEvents(
					this.$element,
					'show.tabs.accordion',
					() => {
						this.showTabs();
						this.tabsActive = true;
					}
				);
			}
		} else {

			// only if tabs view status changes
			if (this.tabsActive === true ) {
				EventHelper.wrapEvents(
					this.$element,
					'hide.tabs.accordion',
					() => {
						this.hideTabs();
						this.tabsActive = false;
					}
				);
			}
		}
	}

	protected renderTabs(): void {
		// inserted markup
		const insertedTabMarkup = {
			parent: '<ul class="viAccordion__tabs"></ul>',
			child: `
				<li class="viAccordion__tabsPanel">
					<a class="viAccordion__tabsTitleLink"></a>
				</li>`
		};

		// create list container
		this.$element.prepend(insertedTabMarkup.parent);

		// create list item from accordion items
		this.$element.find('.viAccordion__titleLink').each((index, elem) => {

			// append child markup
			this.$element.find('.viAccordion__tabs').append(insertedTabMarkup.child);

			// set active tab
			if ($(elem).parents('.viAccordion__panel').is('[class*=--open]')) {
				this.$element.find('.viAccordion__tabsPanel').eq(index).addClass('viAccordion__tabsPanel--open');
			}

			// fill child markup with text from accordion titleLink
			this.$element.find('.viAccordion__tabsTitleLink').eq(index).append($(elem).html());
		});
	}

	protected toggleTabs($elem: JQuery): void {
		let activeTabIndex = $elem.parents('.viAccordion__tabsPanel').index();

		// remove all active tabs
		this.$element.find('.viAccordion__tabsPanel').removeClass('viAccordion__tabsPanel--open');

		this.$element.find('.accordion__panel').each((index, elem)=> {

			let opened: boolean = false;

			if ( $(elem).hasClass('accordion__panel--open') ){
				opened = true;
				$(elem).removeClass('accordion__panel--open');
			}

			if ( opened ){
				$(elem).trigger('after.close.panel.accordion',{panel: $(event.target).parent(), position: index});
			}
		});

		// remove all active accordion panels
		this.$element.find('.viAccordion__panel').removeClass('viAccordion__panel--open');

		// set new active tab
		$elem.parents('.viAccordion__tabsPanel').addClass('viAccordion__tabsPanel--open');

		// set new active accordion panel and trigger event
		this.$element.find('.viAccordion__panel').eq(activeTabIndex)
			.addClass('viAccordion__panel--open')
			.trigger('after.open.panel.accordion',{panel: $(event.target).parent() ,position: activeTabIndex});
	}

	protected fitIntoParent(): boolean {

			let contentWidth: number = this.$element.innerWidth();
			let tabsWidth: number = 0;
			let fits: boolean = true;

			this.$element.find('.viAccordion__tabsPanel').each((index, elem) => {

				tabsWidth = tabsWidth + $(elem).outerWidth();
				if (tabsWidth >= contentWidth) {
					fits = false;
					return false;
				}
			});
			return fits;
	}

	protected showTabs(): void {
		let $accordionOpenedPanels: JQuery = this.$element.find('.viAccordion__panel--open');
		let activePanelIndex: number = $accordionOpenedPanels.index() - 1;

		if ($accordionOpenedPanels.length > 1) {
			// accordion has more than one panel opened. Remove open classes from every opened panels except first found
			$accordionOpenedPanels.slice(1).removeClass('viAccordion__panel--open');

		} else if ($accordionOpenedPanels.length < 1) {

			// accordion has no opened panels. set first tab as opened
			activePanelIndex = 0;

			this.$element.find('.viAccordion__panel').eq(activePanelIndex)
				.addClass('viAccordion__panel--open');
		}

		// remove all active tabs panels
		this.$element.find('.viAccordion__tabsPanel').removeClass('viAccordion__tabsPanel--open');

		// set new active tab panel
		this.$element.find('.viAccordion__tabsPanel').eq(activePanelIndex).addClass('viAccordion__tabsPanel--open');

		// display tabs element
		this.$element.addClass('tabs');

		//hide accordion panels titles
		this.$element.find('.viAccordion__panel').find('.viAccordion__title').css('display', 'none');
	}

	protected hideTabs(): void {
		// hide tabs element
		this.$element.removeClass('tabs');

		//show accordion panels
		this.$element.find('.viAccordion__panel').find('.viAccordion__title').css('display', 'block');
	}

	destroy(): void {
		this.$element.find('.viAccordion__tabsTitleLink').off('click.panel.tabs.accordion');
	}
}
