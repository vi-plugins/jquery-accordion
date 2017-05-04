import {AccordionAnimationOptions} from './AnimationOptions';
import {AccordionScrollingOptions} from './ScrollingOptions';
import {AccordionTabedOptions} from './TabedOptions';
/*import { AccordionUrlOptions } from './UrlOptions';*/

export interface AccordionOptions {
	animation: AccordionAnimationOptions,
	scrolling: AccordionScrollingOptions,
	tabed: AccordionTabedOptions
	/*url: AccordionUrlOptions,*/
}
