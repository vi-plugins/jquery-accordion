import {JQueryModuleBase} from "jquery-base";
import {AccordionTabedOptions} from "../interfaces/TabedOptions";

export default class Animation extends JQueryModuleBase {

	constructor(protected $element: JQuery,
				protected options: AccordionTabedOptions) {
		super();
	}

	init(): void {
		if (this.options.active){
			this.renderTabs();
			this.toggleView();
			this.eventListener();
		}
	}

	protected eventListener():void {
		let resizeTimer: any;
		$(window).on('resize', ()=>{

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(()=>{
				this.toggleView();
			}, 250);
		});

		this.$element.find('.accordion__tabs__titleLink').on('click.panel.tabs.accordion', (e) => {
			e.preventDefault();
			this.toggleTabs($(e.currentTarget));
		});
	}

	protected toggleView():void {
		if (this.fitIntoParent()){
			this.showTabs();
			console.log('fits');
		} else {
			this.hideTabs();
			console.log('does not fit');
		}
	}

	protected renderTabs(): void {
		// variables containing inserted markup
		const insertedParentMarkup: string = '<ul class="accordion__tabs"></ul>';
		const insertedChildMarkup: string = `
			<li class="accordion__tabs__panel">
				<a class="accordion__tabs__titleLink"></a>
			</li>`;

		// create list tab container
		this.$element.prepend(insertedParentMarkup);
		console.log('inserted list');
		// create list item from accordion items
		this.$element.find('.accordion__titleLink').each( (index, elem)=> {

			// append child markup
			this.$element.find('.accordion__tabs').append(insertedChildMarkup);

			// set active tab
			if ( $(elem).parents('.accordion__panel').is('[class*=--open]') ){
				this.$element.find('.accordion__tabs__panel').eq(index).addClass('accordion__tabs__panel--open');
			}

			// fill child markup with text from accordion titleLink
			this.$element.find('.accordion__tabs__titleLink').eq(index).append($(elem).text());
		});
	}

	protected toggleTabs($elem:JQuery): void {

		let activeTabIndex = $elem.parents('.accordion__tabs__panel').index();

		// remove all active tabs
		this.$element.find('.accordion__tabs__panel').removeClass('accordion__tabs__panel--open');

		// set new active tab
		$elem.parents('.accordion__tabs__panel').addClass('accordion__tabs__panel--open');

		// remove all active accordion panels
		this.$element.find('.accordion__panel')
			.removeClass('accordion__panel--open')
			.removeClass('accordion__panel--animation');

		// set new active accordion panel
		this.$element.find('.accordion__panel').eq(activeTabIndex)
			.addClass('accordion__panel--open')
			.addClass('accordion__panel--animation');
	}

	protected fitIntoParent(): boolean {
		let contentWidth: number = this.$element.innerWidth();
		let tabsWidth: number = 0;
		let fits: boolean = true;

		this.$element.find('.accordion__tabs__panel').each( (index, elem)=>{

			tabsWidth = tabsWidth + $(elem).outerWidth();
			if ( tabsWidth >= contentWidth) {
				fits = false;
				return false;
			}
		});
		return fits;
	}

	protected showTabs():void {
		let activePanelIndex: number = this.$element.find('.accordion__panel--open').index()-1 || 0;

		// remove all active tabs panels
		this.$element.find('.accordion__tabs__panel').removeClass('accordion__tabs__panel--open');

		// set new active accordion panel
		this.$element.find('.accordion__tabs__panel').eq(activePanelIndex).addClass('accordion__tabs__panel--open');

		// display tabs element
		this.$element.find('.accordion__tabs').css('position','relative').css('visibility','visible');

		//hide accordion panels titles
		this.$element.find('.accordion__panel').find('.accordion__title').css('display','none');
	}


	protected hideTabs():void {

		// hide tabs element
		this.$element.find('.accordion__tabs').css('position','absolute').css('visibility','hidden');

		//show accordion panels
		this.$element.find('.accordion__panel').find('.accordion__title').css('display','block');
	}

	destroy(): void {
		this.$element.find('.accordion__tabs__titleLink').off('click.panel.tabs.accordion');
	}
}
