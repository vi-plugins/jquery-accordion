#Tabbed-Accordion plugin written in jquery and typescript
 
##based on jQuery Plugin Boilerplate

https://github.com/vi-plugins/jquery-boilerplate

Thanks to Jan Rembold ( https://github.com/janrembold ) for providing the boilerplate.

##get started

Go trough steps from jquery-boilerplate README.md

### create HTML markup

```
<div class="accordion tabbed" data-open-duration="800" data-auto-close="true">
    
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
```
$('.accordion').accordion().trigger('init.accordion');
```

## Hook events

### Animation

| Event                           | Element                     | description                                      |
| ------------------------------- |:---------------------------:| ------------------------------------------------:|
| before.open.panel.accordion     | .accordion__panel           | After a click on a link inside a closed panel. Before content container opens  |
| after.open.panel.accordion      | .accordion__panel           | After a click on a link inside a closed panel. After content container opened |
| zebra stripes | are neat      |    $1 |


### scrolling