/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require("prismjs/themes/prism-solarizedlight.css")

const addJS = (jsCode, defer = false) =>{
    const script = document.createElement(`script`)

    script.type = `text/javascript`
    script.innerText = jsCode
    script.defer = defer;
    const head = document.getElementsByTagName(`head`)[0]
    head.appendChild(script);
}

const injectMailerLiteScript = () => {
    
    addJS(`
    (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
        var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
        f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
        var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
        _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

        window.ml_account = window.ml('accounts', '2669557', 'd1b7k0h4n3', 'load');
    `)
  }

const embedClasses = [
    `.ml-form-embed`,
].join(`,`)

exports.onRouteUpdate = () => {
    if (document.querySelector(embedClasses) !== null) {
        injectMailerLiteScript()
    }

    if(window.FB){
        window.FB.XFBML.parse();
    }
  }