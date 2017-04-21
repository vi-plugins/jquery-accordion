export interface AccordionScrollingOptions {
	active: boolean,
	duration?: number,
	dependencySelector?: string,
	scrollTopAdditionalSpace?: number,
	topOffset(): number,
}
