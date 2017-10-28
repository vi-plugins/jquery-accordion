#Tabbed-Accordion plugin written in jquery and typescript
 
##based on jQuery Plugin Boilerplate

https://github.com/vi-plugins/jquery-boilerplate

Thanks to Jan Rembold ( https://github.com/janrembold ) for providing the boilerplate.

##get started

Go trough steps from jquery-boilerplate README.md

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




### create HTML markup

```
<div class="accordion " data-open-duration="800" data-auto-close="true">
    
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
### include jquery
```
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
```

### init plugin
```$('.accordion').accordion().trigger('init.accordion');

```

## Events

| Event | Description | Element  |
| ----- |-------- | ------------ |
| before.init.accordion | Before plugin is initialized | accordion container |
| after.init.accordion | After plugin has been initialized | accordion container |
| before.open.panel.accordion | After a click on a link inside a closed panel. Before content container opens | panel container | 
| after.open.panel.accordion | After a click on a link inside a closed panel. After content container opened | panel container | 
| before.close.panel.accordion | After a click on a link inside a opened panel. Before content container closes | panel container | 
| after.close.panel.accordion | After a click on a link inside a opened panel. After content container closed | panel container | 
