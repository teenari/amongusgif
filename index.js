const Timeout = async (time) => {
    return await new Promise((resolve) => setTimeout(resolve, time));
}

const createGif = async (callback, download=true) => {
    const element = document.body;
    // const encoder = new GIFEncoder();
    // encoder.setRepeat(0);
    // encoder.setDelay(500);
    // encoder.start();
    // await Timeout(1000);
    var gif = new GIF({
        workers: 2,
        quality: 10,
        width: element.scrollWidth,
        height: element.scrollHeight
    });
    let IntervalTime = 0;
    const Interval = setInterval(async () => {
        const element = document.body;
        IntervalTime += 1;
        if(IntervalTime > 100) {
            clearInterval(Interval);
            gif.on('finished', function(blob) {
                window.open(URL.createObjectURL(blob));
              });
              
              gif.render();
            // return callback(`data:image/gif;base64,${encode64(encoder.stream().getData())}`);
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
                gif.addFrame(context, {copy: false});
                // try {
                //     encoder.addFrame(context);
                // } catch(err) {
                //     console.log(err)
                // }
            }
        });
    }, 1);
}