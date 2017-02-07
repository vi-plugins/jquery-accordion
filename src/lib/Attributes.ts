export default class AttributeHelper {
    public static loadOptions($element: JQuery, config: any): void {
        for(let attribute in config) {
            console.log(attribute + ' => ' + config[attribute]);
        }
    }
}
