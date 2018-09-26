var webpage = require('webpage').create(),
    system = require('system'),
    address, output;

if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: render.js key URL filename');
    slimer.exit();
} else {
    webpage.customHeaders = {
        'Authorization': 'Key ' + system.args[1]
    }
    address = system.args[2];
    output = system.args[3];
    webpage.viewportSize = { width: 1600, height: 1200 };
    webpage
    .open(address) // loads a page
    .then(function(){ // executed after loading
        // store a screenshot of the page
        window.setTimeout(function () {
            webpage.render(output, {onlyViewport:true});
            slimer.exit();
        }, 10000);
    })
}
