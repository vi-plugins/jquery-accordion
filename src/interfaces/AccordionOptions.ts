import {AccordionAnimationOptions} from './AnimationOptions';
import {AccordionScrollingOptions} from './ScrollingOptions';
import {AccordionTabbedOptions} from './TabbedOptions';

export interface AccordionOptions {
	animation: AccordionAnimationOptions,
	scrolling: AccordionScrollingOptions,
	tabbed: AccordionTabbedOptions
}
