#Tabbed-Accordion plugin written in jquery and typescript
 
##based on jQuery Plugin Boilerplate

https://github.com/vi-plugins/jquery-boilerplate

Thanks to Jan Rembold ( https://github.com/janrembold ) for providing the jquery-boilerplate.

##Usage

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

Default accordion markup

```
<div class="accordion ">
    
    <div class="accordion__panel">
        <h3 class="accordion__title"><a href="#" class="accordion__titleLink">Panel__Name</a></h3>
        <div class="accordion__content">
            <div class="accordion__content__example"></div>
        </div>
    </div>
    
    <div class="accordion__panel">
        <h3 class="accordion__title"><a href="#" class="accordion__titleLink">Panel__Name</a></h3>
        <div class="accordion__content">
            <div class="accordion__content__example"></div>
        </div>
    </div>
    
</div>
```

## Behaviour

### Animation
### Scrolling
If panel content does not have enough vertical space inside viewport animation scrolling is activated.
Without optional parameters topOffsetSelector or topOffsetAdditional it scrolls down until the panel is at the top of the visibile part of the viewport.
### Tabbed

##Options

###Animation

| Option | Type | Description | Default |
| ------ | ---- | ----------- | ------- |
| autoClose | boolean | Opening a new panel closes already opened panels | true |
| closeDuration | number | Time for animation to close panel content | 300 (ms) |
| openDuration | number | Time for animation to open panel content | 300 (ms) |


###Scrolling

| Option | Type | Description | Default |
| ------ | ---- | ----------- | ------- |
| active | boolean | Enabled/Disabled scrolling for the accordion | true |
| duration | number | Scrolling duration | 300ms |
| scrollOnOpen | boolean |  | true |
| scrollOnOpenMaximumScreenWidth? | number |  | not set |
| topOffsetSelector? | string | Top offset element selector. Considers elements placed outside accordion stacking content. E.g. Fixed Header  | not set |
| topOffsetAdditional? | number | Additional value (pixel) considered in scrolling. | not set |

###Tabbed

| Option | Type | Description | Default |
| ------ | ---- | ----------- | ------- |
| active | boolean | Enabled/Disabled tabs view | true |
| minViewportWidth | number | Viewport min-width (pixel) required to display tabbed view | 0 |
| preventOverfulTabHeaders | boolean |  | true |


##Events
| Event | Description | Element  |
| ----- |-------- | ------------ |
| before.init.accordion | Before plugin is initialized | accordion container |
| after.init.accordion | After plugin has been initialized | accordion container |
| before.open.panel.accordion | After a click on a link inside a closed panel. Before content container opens | panel container | 
| after.open.panel.accordion | After a click on a link inside a closed panel. After content container opened | panel container | 
| before.close.panel.accordion | After a click on a link inside a opened panel. Before content container closes | panel container | 
| after.close.panel.accordion | After a click on a link inside a opened panel. After content container closed | panel container | 
