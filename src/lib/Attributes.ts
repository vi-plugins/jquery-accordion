export default class AttributeHelper {

	/**
	 * Merge configured attributes from given JQuery element directly to referenced object properties
	 */
    public static mergeDataAttributes($element: JQuery, options: any, config: any): void {

		const traverse = (config: any) => {

			for(let attribute in config) {

				if(config.hasOwnProperty(attribute)) {

					if(typeof(config[attribute]) === 'object') {

						traverse(config[attribute]);
						if(Object.keys(config[attribute]).length === 0) {
							delete config[attribute];
						}
					} else {

						let value = $element.data(config[attribute]);
						if(value !== void 0) {
							config[attribute] = value;
						} else {
							delete config[attribute];
						}
					}
				}
			}

		};

		traverse(config);
		return $.extend(true, {}, options, config);
	}
}
