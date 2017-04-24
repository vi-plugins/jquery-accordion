///<reference types="jquery"/>

import {JQueryPluginBase} from 'jquery-base';
import EventHelper from 'jquery-events';

import Animation from "./lib/Animation";
import Scrolling from "./lib/Scrolling";
/*import Url from "./lib/Url";*/

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
				topOffsetElement: '.my-header'
			}
		};


		private animation: Animation;
		private scrolling: Scrolling;

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

		initAccordion(test: boolean = true): void {

			this.animation = new Animation(this.$element, this.options.animation);
			this.animation.init();

			this.scrolling = new Scrolling(this.$element, this.options.scrolling);
			this.scrolling.init();
		}

		/** local destroy overwrites JQueryPluginBase destroy method */
		destroy(): void {
			// custom destroy calls

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
