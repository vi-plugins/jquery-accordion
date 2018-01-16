# jQuery Responsive Tabbed-Accordion Plugin 

Written in typescript. By default it implements a simple accordion.

Optional: vertical scrolling and an alternative Tabs-View.  
 
## Based on jQuery Plugin Boilerplate

https://github.com/vi-plugins/jquery-boilerplate

Thanks to Jan Rembold ( https://github.com/janrembold ) for providing the jquery-plugin-boilerplate.

## Behaviour

### Animation
After init all panels are closed. 
It can be modified by adding ```accordion__panel--open``` class to the panel container.

Click on a panel toggles, using slide animation, the visibilty of content belonging to this panel. 
This animation also manipulates the class attribute on the panel container:

#### Opening:
1. While openning : adds ``` accordion__panel--openning```
2. Animation ended : adds ``` accordion__panel--open```, removes ``` accordion__panel--openning```,

#### Closing:
1. While closing: adds ``` .accordion__panel--closing```
2. Animation ended: removes ``` accordion__panel--open```, removes ``` accordion__panel--closing```,

By default click on a panel also closes all other panels using above described closing behaviour. 
``` accordion__panel--closing``` and ``` accordion__panel--openning``` have been added for css transform animations while animation is running.

### Scrolling
By default scrolling option is activated.

If a panel content does not have enough vertical space inside viewport animation scrolling is activated.
Without optional parameters topOffsetSelector or topOffsetAdditional it scrolls down until the panel is at the top of the visibile part of the viewport.

### Tab-View
By default the Tab-View option is activated.

When the min-width requirements are matched (default set to 0) 
and all tabs have enough horizontal space to fit inside one line, the Accordion-View changes to Tab-View.

Toggle between Tab-View and Accordion-View happens when the tabs have enough space or not and also considers already opened panels.
1. If there is more than one panel opened inside the Accordion-View, the switch to Tab-View will close all panels but the first opened.
2. If none is opened the first tab will be opened. 
3. The tab opened in Tab-View defines the opened accordion panel when switched from Tab-View to Accordion-View  


Tab-View injects additional markup and hides the panel title container.

## Usage

Load scripts and initialize accordion.

```
<script src="js/jquery.min.js"></script>
<script src="../dist/accordion.min.js"></script>
<script>
    $(document).ready(function () {
        $('.accordion').accordion().trigger('init.accordion');
    });
</script>
```

#### Markup

Default accordion markup.

```
<div class="accordion">
    <div class="accordion__panel">
        <h3 class="accordion__title">
            <a href="#" class="accordion__titleLink">PanelName</a>
        </h3>
        <div class="accordion__content"></div>
    </div>
    <div class="accordion__panel accordion__panel--open">
        <h3 class="accordion__title">
            <a href="#" class="accordion__titleLink">PanelName</a>
        </h3>
        <div class="accordion__content"></div>
    </div>
</div>
```

Tab-View javascript inserted markup. Only if Tab-View is activated.

```
<ul class="accordion__tabs">
    <li class="accordion__tabsPanel">
        <a class="accordion__tabsTitleLink"></a>
    </li>
</ul> 
```


## Options

#### Example for init with options:
```
    $('.accordion').accordion({ 
        animation: {
            autoClose: false
        },
        tabbed: {
            minViewportWidth: 700
        }, 
        scrolling: {
            topOffsetSelector: '.my-header', 
            scrollOnOpen: true, 
            scrollOnOpenMaximumScreenWidth: 480
        }
    }).trigger('init.accordion');
```

#### animation

| Option | Type | Description | Default |
| ------ | ---- | ----------- | ------- |
| autoClose | boolean | Opening a new panel closes already opened panels | true |
| closeDuration | number | Time, in milliseconds, for animation to close panel content | 300 |
| openDuration | number | Time, in milliseconds, for animation to open panel content | 300  |

#### scrolling

| Option | Type | Description | Default |
| ------ | ---- | ----------- | ------- |
| active | boolean | Enabled/Disabled scrolling for the accordion | true |
| duration | number | Scrolling duration, in milliseconds | 300 |
| scrollOnOpen | boolean | Activates scroll on opening ( default closing ) a panel | false |
| scrollOnOpenMaximumScreenWidth? | number | In combination with scrollOnOpen. If Viewport width is heigher than parameter scrollOnOpen is deactivated | false |
| topOffsetSelector? | string | Top offset element selector. Considers elements placed outside accordion stacking content. E.g. Fixed Header  | false |
| topOffsetAdditional? | number | Additional value (pixel) considered in scrolling. | false |

#### tabbed

| Option | Type | Description | Default |
| ------ | ---- | ----------- | ------- |
| active | boolean | Enabled/Disabled tabs view | true |
| minViewportWidth | number | Viewport min-width (pixel) required to display tabbed view | 0 |
| preventOverfulTabHeaders | boolean | Enabled/Disabled check if all tabs fit in one line  | true |


## Events
#### animation

| Event | Description | Element  | Return |
| ----- |-------- | ------------ | ----- |
| before.init.accordion | Before plugin is initialized | accordion container |
| after.init.accordion | After plugin has been initialized | accordion container |
| before.open.panel.accordion | After a click on a link inside a closed panel. Before content container opens | panel container | 
| after.open.panel.accordion | After a click on a link inside a closed panel. After content container opened | panel container | {panel, position } |
| before.close.panel.accordion | After a click on a link inside a opened panel. Before content container closes | panel container | 
| after.close.panel.accordion | After a click on a link inside a opened panel. After content container closed | panel container | 

#### scrolling
| Event | Description | Element  |
| ----- |-------- | ------------ |
| before.scroll.panel.accordion | Before scrolling animations beginns | accordion container |
| after.scroll.panel.accordion | After scrolling animations ended | accordion container |
 
#### tabbed
| Event | Description | Element  |
| ----- |-------- | ------------ |
| before.show.tabs.accordion | Before switching to Tab-View | accordion container |
| after.show.tabs.accordion | After switched to Tab-View | accordion container |
| before.hide.tabs.accordion | Before switching to Accordion-View | accordion container |
| after.hide.tabs.accordion | After switched to Accordion-View | accordion container |
