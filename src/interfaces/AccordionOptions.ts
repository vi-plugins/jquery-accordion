import {AccordionAnimationOptions} from './AnimationOptions';
import {AccordionScrollingOptions} from './ScrollingOptions';
import {AccordionTabbedOptions} from './TabbedOptions';
/*import { AccordionUrlOptions } from './UrlOptions';*/

export interface AccordionOptions {
	animation: AccordionAnimationOptions,
	scrolling: AccordionScrollingOptions,
	tabbed: AccordionTabbedOptions
	/*url: AccordionUrlOptions,*/
}
