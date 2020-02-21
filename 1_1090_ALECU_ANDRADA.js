var canvas;
var ctx;
var savedImageData; 
var strokeColor = 'black';
var fillColor = 'black';
var line_width_ = 7;
var currentTool = 'brush';
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
let img = new Image();
var input;

document.addEventListener('DOMContentLoaded', setupCanvas); //cal my function to set iup my canvas when my page lads

function setupCanvas() {
    canvas = document.getElementById('myCanvas');//get tehh reference of my canvas
    ctx = canvas.getContext('2d'); //context that provides all of the function of working with teh canvas 
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_width_;
    ctx.fillText("Drop an image onto the canvas", 240, 200);
    let img = new Image();
    var input = document.querySelector('#load');
    input.onchange = function (ev) {
        var file = document.querySelector('#load').files[0];
        drawCanvas(file);
        savedImageData = new Image();
        input = document.getElementById("inputt");

    }

    function drawCanvas(file) {
        var reader = new FileReader();
        if (file) {

            reader.readAsDataURL(file);
        }

        console.log('ceva');
        reader.onload = function () {
            img = new Image();
            img.src = reader.result;
            console.log(img.src);
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
            };


        };


    }


}


function Tool(toolClicked) {
    document.getElementById(toolClicked).className = "selected";
}


function SaveCanvasImage() {
    savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}



function RedrawCanvasImage() {
    ctx.putImageData(savedImageData, 0, 0);
}



function changeColor(ev) {
    if (ev.id === 'black') {
        strokeColor = '#000000';
        fillColor = '#000000';
        playSound(ev.id);
        $('#black').fadeIn(100).fadeOut(100).fadeIn(100).animate({
            padding: "+=30"

        }, 1500).animate({
            padding: "-=30"
        });

    } else if (ev.id === 'red') {
        strokeColor = '#ff0000';
        fillColor = '#000000';
        playSound(ev.id);
        $('#red').fadeIn(100).fadeOut(100).fadeIn(100).animate({
            padding: "+=30"

        }, 1500).animate({
            padding: "-=30"
        });

    } else if (ev.id === 'blue') {
        strokeColor = '#0000ff';
        fillColor = '#000000';
        playSound(ev.id);
        $('#blue').fadeIn(100).fadeOut(100).fadeIn(100).animate({
            padding: "+=30"

        }, 1500).animate({
            padding: "-=30"
        });

    } else if (ev.id === 'darkmagenta') {
        strokeColor = '#8b008b';
        fillColor = '#000000';
        playSound(ev.id);
        $('#darkmagenta').fadeIn(100).fadeOut(100).fadeIn(100).animate({
            padding: "+=30"

        }, 1500).animate({
            padding: "-=30"
        });

    } else if (ev.id === 'limegreen') {
        strokeColor = '#32cd32';
        fillColor = '#000000';
        playSound(ev.id);
        $('#limegreen').fadeIn(100).fadeOut(100).fadeIn(100).animate({
            padding: "+=30"

        }, 1500).animate({
            padding: "-=30"
        });

    } else if (ev.id === 'orange') {
        strokeColor = '#ffa500';
        fillColor = '#000000';
        playSound(ev.id);
        $('#orange').fadeIn(100).fadeOut(100).fadeIn(100).animate({
            padding: "+=30"

        }, 1500).animate({
            padding: "-=30"
        });
    }
    ctx.lineWidth = 10;

}

//function ofr applying the slider effects

function changeSlider(ev) {
    //call this fct when the sliders are moved
    Caman("#myCanvas", function renderCaman() {
        this[ev.target.name](ev.target.value).render();//will apply teh efect from the sldiers
        if (document.getElementById("inputt").value) {
            writeText;
        }
    });
};

var filters = document.querySelectorAll('input[type="range"]');

filters.forEach(function (filter) {
    filter.onchange = changeSlider;
});

var btnReset = document.getElementById("reset");

function filterButtonsFunction(ev) {
    Caman("#myCanvas", function () {
        this.revert(false);
        this[ev.target.id]().render();
        if (document.getElementById("inputt").value) {
            writeText;
        }
    });
    animate(ev.id);
};

var btnFilters = document.querySelectorAll('.filter');


btnFilters.forEach(function (btn) {
    btn.onclick = filterButtonsFunction;
});


function resetButton(ev) {

    filters.forEach(function (filter) {
        filter.value = 0;
    });
    Caman("#myCanvas", function () {
        this.revert(true);
    });
    //animate(ev.id);
    SaveCanvasImage();
    RedrawCanvasImage();

};


function rotate(ev) {
    Caman("#myCanvas", function () {
        this.rotate(90);
        this.render();
    });
    animate(ev.id);
    SaveCanvasImage();
    RedrawCanvasImage();
}


//text message

function writeText(name) {
    ctx.fillStyle = "rbga(0,0,0,0.7)";
    ctx.fillRect(0, (canvas.height / 2) - 30, canvas.width, 65);
    ctx.font = "50px Baskervville";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(document.getElementById("inputt").value, canvas.width / 2, (canvas.height / 2) + 20);
    animate(name.id);
  //  SaveCanvasImage();
  //  RedrawCanvasImage();
};


function resize(ev) {
    Caman("#myCanvas", function () {
        this.crop(400, 350);
        this.render();
    });
    animate(ev.id);
    SaveCanvasImage();
    RedrawCanvasImage();
    console.log("teh iamge is resized" + canvas.width + " " + canvas.height);
}


function preview(ev) {
    var width = Number(document.querySelector('#width').value);
    var height = Number(document.querySelector('#height').value);
    var x = Number(document.querySelector('#x').value);
    var y = Number(document.querySelector('#y').value);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(x, y, width, height);
    setTimeout(function () {
        resetButton();
    }, 3000);

    animate(ev.id);
};



function crop(ev) {
    var width = Number(document.querySelector('#width').value);
    var height = Number(document.querySelector('#height').value);
    var x = Number(document.querySelector('#x').value);
    var y = Number(document.querySelector('#y').value);
    Caman('#myCanvas', function () {
        this.crop(width, height, x, y);
        this.render();
    });
    animate(ev.id);
    SaveCanvasImage();
    RedrawCanvasImage();

};



function playSound(name) {
    var audio = new Audio("media/sounds/" + name + ".mp3");
    audio.play();
}

function animate(name) {
    $("#" + name).addClass('pressed');
    setTimeout(function () {
        $("#" + name).removeClass('pressed');
    }, 1000);
}


var lastX = 0;
var lastY = 0
var currentX = 0
var currentY = 0;
var x = false
var y = false;

var tool = document.getElementById('tool');
tool.addEventListener('click', function () {
    console.log('am intrat in buton draw');
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    canvas.addEventListener('mousemove', function (e) {
        fct('move', e)
    })
    canvas.addEventListener('mousedown', function (e) {
        lastX = currentX;
        lastY = currentY;
        currentX = e.clientX - canvas.offsetLeft;
        currentY = e.clientY - canvas.offsetTop;
    })
    canvas.addEventListener('mouseup', function (e) {
        fct('up', e)
    })
    canvas.addEventListener('mouseout', function (e) {
        fct('out', e)
    })
})



function fct(res, e) {
    x = true;
    y = true;
    if (res == 'move') {
        if (x) {
            lastX = currentX;
            lastY = currentY;
            currentX = e.clientX - canvas.offsetLeft;
            currentY = e.clientY - canvas.offsetTop;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = line_width_;
            ctx.stroke();
            ctx.closePath();
        }
    }
    if (y) {
        ctx.beginPath();
        ctx.fillStyle = strokeColor;
        ctx.fillRect(currentX, currentY, 2, 2);
        ctx.closePath();
        y = false;
    }
    if (res == 'up' || res == 'out') {
        x = false;

    }

}


function SaveImage() {
    RedrawCanvasImage();
    SaveCanvasImage();
    var img = document.getElementById('imgSave');
    img.setAttribute('download', 'image.png');
    img.setAttribute('href', canvas.toDataURL());
}