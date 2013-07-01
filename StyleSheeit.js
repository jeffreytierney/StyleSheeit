(function(scope) {
  var doc = window.document,
      tdoc = top.document;
      
  function getAppendEl() {
    var heads = document.getElementsByTagName("head");
    if(heads.length) { return heads[0]; }
    else { return document.body; }
  }
      
  function setStyles(styles, id, d){
    d = d || doc;
    var style_el = document.createElement("style");
    style_el.className = "for_"+id;
    getAppendEl().appendChild(style_el);
    var style_obj = style_el.sheet;
    
    if (!style_obj) {
        style_obj = d.styleSheets[d.styleSheets.length - 1];
    }
    
    var keys;
    for (var key in styles) {
      keys = key.split(",");
      for(var i=0, len=keys.length; i<len; i++) {
        if (style_obj.insertRule) {
            style_obj.insertRule(keys[i] + ' {' + styles[key] + '}', style_obj.cssRules.length);
        } else if (style_obj.addRule) {
            style_obj.addRule(keys[i], styles[key], -1);
        }
      }
    }
  }
  
  function importStyles(style_tag, id, d) {
    d = d || doc;
    var sheet = style_tag.sheet || style_tag.styleSheet,
        rules = sheet.rules || sheet.cssRules,
        styles = {}, selector, rule;
        
    for(var i=0, len=rules.length; i<len; i++) {
      selector = rules[i].selectorText;
      rule = rules[i].cssText || (rules[i].style && rules[i].style.cssText);
      if(rule && selector) {
        styles[selector] = rule.replace(/[^\{]+\{/, "").replace(/\}/,"");
      }
    }
    setStyles(styles, id, d);
  }
  
  function checkTags(tag, id) {
    var tags = tdoc.getElementsByTagName(tag),
      the_tag, cur_tag;

    for(var i=0, len=tags.length; i<len; i++) {
      cur_tag = tags[i];
      if (cur_tag.className === ("for_"+id)) {
        the_tag = cur_tag;
        return the_tag;
      }
    }
    return null;
  }
  function checkForStyles(id, d) {
    id = id || document.body.getAttribute("id");
    d = d || doc;
    var the_tag = checkTags("style", id) || checkTags("link", id)

    if(the_tag) {
      importStyles(the_tag, id, d);
    }
  }
  
  function log() {
    if(window.console && window.console.log) { console.log.apply(console,arguments);}
  }
  
  scope.StyleSheeit = {
    check: checkForStyles
  };
  
})(this);