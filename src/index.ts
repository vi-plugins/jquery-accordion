///<reference types="jquery"/>

import {JQueryPluginBase} from 'jquery-base';
import EventHelper from 'jquery-events';

import Animation from "./lib/Animation";
import Scrolling from "./lib/Scrolling";
import Tabbed from "./lib/Tabbed";

import {AccordionOptions} from './interfaces/AccordionOptions';
import './scss/accordion.scss';

(function ($: JQueryStatic, window: any, document: any) {

	class Plugin extends JQueryPluginBase {

		/** The plugins name */
		public static NAME: string = 'accordion';

		/** Set plugins default options */
		public static DEFAULTS: AccordionOptions = {
			animation: {
				autoClose: true,
				openDuration: 300,
				closeDuration: 300
			},
			scrolling: {
				active: true,
				duration: 300,
				scrollOnOpen: false
			},
			tabbed: {
				active: false,
				minViewportWidth: 0
			}
		};

		private animation: Animation;
		private scrolling: Scrolling;
		private tabbed: Tabbed;

		/** The plugins constructor - always load base class (JQueryPluginBase) first */
		constructor(element: Element, options: any) {
			super(Plugin.NAME, element, Plugin.DEFAULTS, options);
		}

		/** Place initialization logic here */
		init(): void {
			// EventHelper wrapEvents demo
			EventHelper.wrapEvents(
				this.$element,
				'init.accordion',
				() => { this.initAccordion(); }
			);
		}

		initAccordion(): void {

			this.animation = new Animation(this.$element, this.options.animation);
			this.animation.init();

			this.scrolling = new Scrolling(this.$element, this.options.scrolling);
			this.scrolling.init();

			this.tabbed = new Tabbed(this.$element, this.options.tabbed);
			this.tabbed.init();
		}

		/** local destroy overwrites JQueryPluginBase destroy method */
		destroy(): void {
			// custom destroy calls
			this.animation.destroy();
			this.scrolling.destroy();
			this.tabbed.destroy();

			// call destroy function of parent class as last call to reset element to initial state
			super.destroy();
		}
	}

	/** Attach plugin to jQuery fn namespace */
	$.fn[Plugin.NAME] = function (options: any) {
		return this.each(function () {
			let $this = $(this);
			if (!$this.data(Plugin.NAME)) {
				$this.data(Plugin.NAME, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
