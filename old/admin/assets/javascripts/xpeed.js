/*******************************
 * Global Variables
 * ****************************/
window.global = {
    ajaxSend : function () {

    },
    ajaxComplete : function () {

    },
    ajaxSuccess : function () {

    },
    ajaxError : function () {

    },
    ajaxStop : function () {

    },

    ajaxResponseScripts :{}
};
/*******************************
 * Colors
 * ****************************/
window.Color = {
    Success : "#4EB862",
    Error 	: "#FF134A",
    Warn 	: "#FBB13C"
};
/*******************************
 * Element Selector
 * ****************************/
class Selector{
    context = document;
    element = null;
    elements  = null;
    constructor(selector, context=null) {
        if(context!=null){
            this.context = context;
        }
        if (selector) {
            if(typeof (selector) =="object"){
                this.element = selector;
            } else {
                this.elements = this.context.querySelectorAll(selector);
                this.element = this.context.querySelector(selector);
            }
        }
    }
    //Show hide
    hide() {
        __(this.element).style("display", "none");
        return this;
    };
    show (disp="inherit") {
        __(this.element).style("display", disp);
        return this;
    };
    toggle(disp="inherit") {
        let element = this.element;
        if (element.style.display !== 'none') {
            __(element).hide();
        } else {
            __(element).show(disp);
        }
        return this;
    };
    //event listenner
    click(method){
        let element = this.element;
        this.element.onclick = function () {
            method.call(element);
        };
        return this;
    };
    change(method){
        let element = this.element;
        element.onchange =  function () {
            method.call(element);
        };
        return this;
    };
    submit(method){
        let element  = this.element;
        element.onsubmit =  function (e){
            e.preventDefault();
            if(!element.hasAttribute("disabled")){
                method(e);
            }
        };
    };

    addClick(method){
        this.element.addEventListener("click",function () {
            method();
        });
        return this;
    };
    addChange(method){
        this.element.addEventListener("change",function () {
            method();
        });
        return this;
    };
    addSubmit(method){
        let element  = this.element;
        this.element.addEventListener("submit", function (e){
            e.preventDefault();
            if(!element.hasAttribute("disabled")){
                method(e);
            }

        });
    };

    //properties
    style (prop, val= undefined){
        let element = this.element;
        if(val===""){
            element.style.removeProperty(prop);
        } else{
            element.style.setProperty(prop, val);
        }
        return element.style.getPropertyValue(prop);
    };
    val(newval) {
        if(newval){
            this.element.value = newhtml;
        }
        return this.element.value;
    };
    append(element){
        let div = document.createElement('div');
        div.innerHTML = element.trim();
        element = div.firstChild;
        this.element.appendChild(element);
    };
    html(newhtml){
        if(newhtml){
            this.element.innerHTML = newhtml;
        }
        return this.element.innerHTML;
    };
    attr(prop, val){
        if(val){
            this.element.setAttribute(prop);
        }
        return this.element.getAttribute(prop);
    }
    serialize(type="") {
        var object = {};
        let form = this.element;

        let inputs = __("input, select, textarea", form);
        inputs.each(function () {
            let input = this;
            switch (__(input).attr("type")) {
                case "file":
                    object[__(input).attr("name")] = input.files[0];
                    break;
                default:
                    object[__(input).attr("name")] = __(input).val();
                    break;
            }
        });
        let data;
        switch (type) {
            case "fd":
                let fd = new FormData;
                for (let[key, value] of Object.entries(object)) {
                    fd.append(key, value);
                }
                data =  fd;
                break;
            case "json":
                data =  JSON.stringify(object);
                break;
            default:
                data =  object;
                break;
        }

        return data;
    };
    editable(action) {
        let form = this.element;
        switch (action) {
            case false:
                form.setAttribute("editable", "false");
                break;
            case true:
                form.setAttribute("editable", "true");
                break;
        }
        var inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(function (input) {
            switch (action) {
                case false:
                    input.setAttribute("disabled", "disabled");
                    break;
                case true:
                    input.removeAttribute("disabled", "disabled");
                    break;
            }
        });
    };
    checked(val){
        if(val!==undefined){
            this.element.checked = val;
        }
        return this.element.checked;
    };
    //add remove has functions
    addClass(class_name){
        this.element.classList.add(class_name);
    }
    removeClass(class_name){
        this.element.classList.remove(class_name);
    }
    hasClass(class_name){
        return this.element.classList.contains(class_name);
    }
    //extra function
    each(func){
        this.elements.forEach(function (element) {
            func.call(element);
        })
    };
}
/*******************************
 * Ajax
 * ****************************/
class Ajax {
    url = "";
    formdata = null;
    data_type = "text/html";
    method="GET";
    //callback
    onStartFunction = function (e) {};
    onSuccessFunction = function (e) {};
    onErrorFunction = function () {};
    onEndFunction = function (e) {};
    onProgressFunction = function () {};
    onAbortFunction = function(){};
    //object
    xmlHttp=new XMLHttpRequest();
    constructor(parameters){

        try {
            // Opera 8.0+, Firefox, Safari
            this.xmlHttp = new XMLHttpRequest();
        } catch (e) {

            // Internet Explorer Browsers
            try {
                this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {

                try {
                    this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    // Something went wrong
                    alert("Your browser broke!");
                }
            }
        }
        ///set parameters
        if("url" in parameters){this.url = parameters.url;}
        if("content_type" in parameters){this.data_type = parameters.content_type;}
        if("method" in parameters){this.method = parameters.method;}
        if("data" in parameters){this.formdata  = parameters.data;}
        //EVENTS
        if("start" in parameters){this.onStartFunction = parameters.start;}
        if("success" in parameters){this.onSuccessFunction = parameters.success;}
        if("error" in parameters){this.onErrorFunction = parameters.error;}
        if("end" in parameters){this.onEndFunction = parameters.end;}
        if("progress" in parameters){this.onProgressFunction = parameters.progress;}


        if((this.method==="get" ||this.method==="GET") &&this.formdata!=null){
            this.url+="?";
            for (var field of this.formdata.entries()) {
                this.url+=field[0]+"="+field[1]+"&";
            }
            var lastChar = this.url.slice(-1);
            if(lastChar==="&"||lastChar==="?"){
                this.url = this.url.slice(0, -1);
            }
        }


        this.commit();
    };
    commit() {

        this.onStartFunction();
        this.xmlHttp.addEventListener("loadend", this.onEndFunction);
        this.xmlHttp.upload.addEventListener("progress", this.onProgressFunction, false);
        this.xmlHttp.addEventListener("error", this.onErrorFunction);
        this.xmlHttp.addEventListener("abort", this.onAbortFunction);
        ///Success Function
        var oReq = this.xmlHttp;
        var successFunction = this.onSuccessFunction;
        this.xmlHttp.onreadystatechange = function () {
            if (oReq.readyState === 4) {
                if (oReq.status === 200) {
                    var scripttext = oReq.response;
                    var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
                    var match;
                    while (match = re.exec(scripttext)) {
                        window.eval(match[1]);
                    }
                    successFunction(oReq.response);
                }
            }
        };


        this.xmlHttp.open(this.method, this.url, true);
        this.xmlHttp.setRequestHeader('Accept', this.data_type);

        if (this.formdata != null && (this.method === "post" || this.method === "POST")) {
            this.xmlHttp.send(this.formdata);
        } else {
            this.xmlHttp.send();
        }
    };
}
/*******************************
 * Popup
 * ****************************/
class Popup{
    constructor(parameters) {
        this.content = "This is a sample popup";
        this.title = "New Popup";

        if ("content" in parameters) {
            this.content = parameters.content;
        }

        if ("title" in parameters) {
            this.title = parameters.title;
        }

        __(".xpd-popup .close-button").click(function () {
            window.Popup.prototype.hide();
        });
    }
    show(){
        __("body").style("overflow-y", "hidden");
        __(".main").style("filter", "blur(5px)");

        //set contens
        __(".xpd-popup .content").html(this.content);
        __(".xpd-popup .title").html(this.title);

        __(".xpd-popup ").show();
    };
    hide(){
        __("body").style("overflow-y", "auto");
        __(".main").style("filter", "blur(0px)");
        //remove contens
        __(".xpd-popup .content").html("");
        __(".xpd-popup .title").html("");
        __(".xpd-popup ").hide();
    };
}
/*******************************
 * Toast
 * ****************************/
class Toast  {
    constructor(message){
        this.template = document.createElement("div");
        this.random_class = "progress_alert" + (Math.floor((Math.random() * 10) + 1));

        this.template.classList.add("xpd-alert", "p-l", "p-left-m", "p-right-m", "m-s", "border-radius-xs", "text-m","white", this.random_class);
        this.template.style.backgroundColor = "rgba(37,37,37,1)";
        this.template.style.minWidth = "200px";
        this.template.innerHTML = message;
    }
    show(timeout=null){
        document.querySelector(".alert-containner").appendChild(this.template);
        if(timeout!=null){
            this.destroy(timeout);
        }
        return this;
    };
    destroy(timeout=0){
        var template = this.template;
        setTimeout(function () {
            document.querySelector(".alert-containner").removeChild(template);
        }, timeout);
        return this;
    };
    setMessage(message){
        this.template.innerHTML = message;
        return this;
    };
    setBackground(color){
        this.template.style.backgroundColor = color;
        return this;
    };
}
Toast.Length  = {
    Long 	: 2000,
    Medium	: 1000,
    Short	: 500
};
/*******************************
 * ASK
 ******************************/
class Ask{
    constructor(parameters) {
        let headerText = "Are you sure?";
        let contentText = "Lorem ipsum dolar";
        let allowFunction = null;
        let denyFunction = null;


        if ("allow" in parameters) {
            allowFunction = parameters.allow;
        }

        if ("deny" in parameters) {
            denyFunction = parameters.deny;
        }

        if("title" in parameters){
            headerText = parameters.title;
        }

        if("content" in parameters){
            contentText = parameters.content;
        }

        /****************/


        let header = document.createElement("div");
        header.setAttribute("class", "head p-xxl p-bottom-none text-l left");
        header.innerHTML = headerText;

        //Content

        let content = document.createElement("div");
        content.setAttribute("class", "p-xxl p-top-s p-bottom-m text-l left");
        content.innerHTML = contentText;

        let allow_button = document.createElement("button");
        allow_button.setAttribute("class", "p-s p-left-l p-right-l hover-background-light-green hover-white pointable");
        allow_button.innerHTML = "Confirm";
        let deny_button = document.createElement("button");
        deny_button.setAttribute("class", "p-s p-left-l p-right-l m-left-m hover-background-red hover-white pointable");
        deny_button.innerHTML = "Cancel";
        let footer = document.createElement("div");
        footer.setAttribute("class", "left p-xxl p-top-s");

        footer.appendChild(allow_button);
        footer.appendChild(deny_button);
        /**************/
        //Wrapper
        let wrapper = document.createElement("div");
        wrapper.setAttribute("style", "min-width:250px");
        wrapper.setAttribute("class", " background-white wrapper");
        wrapper.appendChild(header);
        wrapper.appendChild(content);
        wrapper.appendChild(footer);

        //Main content
        let template = document.createElement("div");
        template.setAttribute("class","xpd-ask p-l center");
        //template.setAttribute("style", );
        template.style.cssText ="display:flex; justify-content: center; align-items: center; background-color:rgba(0,0,0,0.3); position: fixed; height: 100%; width: 100%; top: 0; left: 0; ";
        template.appendChild(wrapper);
        document.body.appendChild(template);
        __(allow_button).click(function () {
            document.body.removeChild(template);
            allowFunction?allowFunction():null;
        });
        __(deny_button).click(function () {
            document.body.removeChild(template);
            denyFunction?denyFunction():null;
        });
    }
}
/***************
 * declare
 **************/
window.__ = function(selector, context=null) {
    return new Selector(selector,context);
};
window.__ajax = function(parameters){
    return new Ajax(parameters);
};
window.__popup = function(parameters) {
    return new Popup(parameters);
};
window.__toast = function(message){
    return new Toast(message);
};
window.__ask = function (parameters) {
    return new Ask(parameters);
};