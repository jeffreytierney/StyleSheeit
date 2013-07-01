StyleSheeit
===========

Need to move a stylesheet from a parent doc into an iframe? Sheeeeeeeit... no problem.

This is a fairly niche use case, but if you run into it (as I did) then this should hopefully solve that need for you.

##Use case:

Lets say you are developing a third party widget that is intended to be included on websites that you don't control, and your code will be running sandboxed in an iframe.
And lets say that you want to allow the people who will be including your widget on their page to be able to control the styles of your control just by writing regular css in their own page.


This simple little tool will allow you to target specific style sheets in the parent doc (either a style or link tag), and create a new stylesheet in the iframe document that contains all of the same style rules.


##Usage:
In the parent document, make sure that the style or link tag that you are looking to import is given a class of "for_[some_id_that_you_create]" (It is recommended that you give the body tag of the document in the iframe an ID, and then use this as the id referenced in the tag)

Then, once you include StyleSheeit in your document, its as simple as calling:

```
StyleSheeit.check(id);
```


if the id you are using is the id on the body of the iframe document as recommended, then you can leave out that param

```
StyleSheeit.check();
```

##Recommendations
* Add an id to the body tag of the document that is generated inside of the iframe and use that as the value to be added to the class name on the limk or style tag that contains the styles to be imported
* Have the style rules that are defined in that stylesheet be scoped to that body tag by id
** For example: 

In your document:

```html
<body id="three_sheets_to_the_wind">
  <!-- your awesome widget stuffs go here (and they at some point call StyleSheeit.check(); ) -->
</body>
```

In the parent document:

```html
<style type="text/css" class="for_three_sheets_to_the_wind">
  body#three_sheets_to_the_wind { background-color: #000; }
  body#three_sheets_to_the_wind a { color: #123456; font-size: 24px; };
</style>
```

##Limitations:

This will only work if the iframe document has access to the parent document (i.e. not loaded from the a different origin via the src attribute on the iframe).
In the case that I specifically developed this for, I followed the pattern outlined by meebo in this great Velocity presentation from 2010 on how to load third party widgets in a non-blocking manner -> http://www.youtube.com/watch?v=b7SUFLFu3HI



![sheeit](http://i3.kym-cdn.com/photos/images/newsfeed/000/077/680/davis_sheeeit.jpg)

