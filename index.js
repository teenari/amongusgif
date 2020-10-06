const Timeout = async (time) => {
    return await new Promise((resolve) => setTimeout(resolve, time));
}

const createGif = async (callback) => {
    const element = document.body;
    var gif = new GIF({
        workers: 5000,
        quality: 1,
        width: element.scrollWidth,
        height: element.scrollHeight
    });
    let IntervalTime = 0;
    const Interval = setInterval(async () => {
        const element = document.body;
        IntervalTime += 1;
        if(IntervalTime > 80) {
            clearInterval(Interval);
            gif.on('finished', (blob) => {
                const objectURL = URL.createObjectURL(blob);
                if(callback) callback(objectURL);
                else {
                    window.open(objectURL);
                }
            });
            gif.render();
        }
        html2canvas(element, {
            allowTaint: true,
            logging: true,
            taintTest: false,
            logging: false,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            onrendered: (canvas) => {
                const context = canvas.getContext("2d");
                gif.addFrame(context, {copy: false, delay: 1});
            }
        });
    }, 50);
}

$(document).ready(() => {
    particlesJS("particles-js", {"particles":{"number":{"value":63,"density":{"enable":true,"value_area":1122.388442605866}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":12},"image":{"src":"","width":100,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":4.008530152163807,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":2000,"color":"#ffffff","opacity":1,"width":7.375695479981404},"move":{"enable":true,"speed":1.603412060865523,"direction":"right","random":false,"straight":true,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":10000,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
    $('.save').click(() => {
        createGif()
    })
});