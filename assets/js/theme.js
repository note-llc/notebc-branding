"use strict";

$(window).on("load", function() {

}), 

$(window).on('load resize', function() {
    
    // Background image holder - Static hero with fullscreen autosize
    if ($('.spotlight').length) {
        $('.spotlight').each(function() {
            
            var $this = $(this);
            var holderHeight;

            if ($this.data('spotlight') == 'fullscreen') {
                if ($this.data('spotlight-offset')) {
                    var offsetHeight = $('body').find($this.data('spotlight-offset')).height();
                    holderHeight = $(window).height() - offsetHeight;
                }
                else {
                    holderHeight = $(window).height();
                }
  

                if ($(window).width() > 991) {
                    $this.find('.spotlight-holder').css({
                        'height': holderHeight + 'px'
                    });
                } 
                else {
                    $this.find('.spotlight-holder').css({
                        'height': 'auto'
                    });
                }
            }
        })
    }
}),

$(document).ready(function() {

    // Plugins init
    $(".scrollbar-inner")[0] && $(".scrollbar-inner").scrollbar().scrollLock();
    $('[data-stick-in-parent="true"]')[0] && $('[data-stick-in-parent="true"]').stick_in_parent();
    $('.selectpicker')[0] && $('.selectpicker').selectpicker();
    $('.textarea-autosize')[0] && autosize($('.textarea-autosize'));
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').each(function() {
        var popoverClass = '';
        if($(this).data('color')) {
            popoverClass = 'popover-'+$(this).data('color');
        }
        $(this).popover({
            trigger: 'focus',
            template: '<div class="popover '+ popoverClass +'" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
    });
    

    // Floating label
    $('.form-control').on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
    

    // Custom input file
    $('.custom-input-file').each(function() {
        var $input = $(this),
            $label = $input.next('label'),
            labelVal = $label.html();

        $input.on('change', function(e) {
            var fileName = '';

            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else if (e.target.value)
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                $label.find('span').html(fileName);
            else
                $label.html(labelVal);
        });


        // Firefox bug fix
        $input.on('focus', function() {
            $input.addClass('has-focus');
        })
        .on('blur', function() {
            $input.removeClass('has-focus');
        });
    });
    
    
    // NoUI Slider
    if ($(".input-slider-container")[0]) {
        $('.input-slider-container').each(function() {

            var slider = $(this).find('.input-slider');
            var sliderId = slider.attr('id');
            var minValue = slider.data('range-value-min');
            var maxValue = slider.data('range-value-max');

            var sliderValue = $(this).find('.range-slider-value');
            var sliderValueId = sliderValue.attr('id');
            var startValue = sliderValue.data('range-value-low');

            var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });

            c.noUiSlider.on('update', function(a, b) {
                d.textContent = a[b];
            });
        })

    }

    if ($("#input-slider-range")[0]) {
        var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function(a, b) {
            f[b].textContent = a[b]
        })
    }

    // Scroll to anchor with animation
    $('.scroll-me, .toc-entry a').on('click', function(event) {
        var hash = $(this).attr('href');
        var offset = $(this).data('scroll-to-offset') ? $(this).data('scroll-to-offset') : 0;

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate({
            scrollTop: $(hash).offset().top - offset
        }, 600);

        event.preventDefault();
    });

}), 

$(document).ready(function() {
    $("body").on("click", "[data-action]", function(e) {

        e.preventDefault();

        var $this = $(this);
        var action = $this.data('action');
        var target = '';

        switch (action) {
            case "offcanvas-open":
                target = $this.data("target"), $(target).addClass("open"), $("body").append('<div class="body-backdrop" data-action="offcanvas-close" data-target=' + target + " />");
                break;
            case "offcanvas-close":
                target = $this.data("target"), $(target).removeClass("open"), $("body").find(".body-backdrop").remove();
                break;

            case 'aside-open':
                target = $this.data('target');
                $this.data('action', 'aside-close');
                $this.addClass('toggled');
                $(target).addClass('toggled');
                $('.content').append('<div class="body-backdrop" data-action="aside-close" data-target='+target+' />');
                break;


            case 'aside-close':
                target = $this.data('target');
                $this.data('action', 'aside-open');
                $('[data-action="aside-open"], '+target).removeClass('toggled');
                $('.content, .header').find('.body-backdrop').remove();
                break;
        }
    })
});

function downloadImg() {
    // Clear error message
    var element = document.getElementById("errMsg");
    element.classList.remove("show");
    // check if the values are selected
    var assetsize = document.forms["frmCust"]["txtSize"].value;
    if (assetsize != parseInt(assetsize, 10) || assetsize == '') {
        document.getElementById("errText").innerHTML = "<strong>Warning!<strong> Image width must be an integer."
        element.classList.add("show");
        return false;
    }
    var selector = document.querySelector('input[name="assetSel"]:checked');
    if (selector) {
        var assetname = selector.value;
    }
    else {
        document.getElementById("errText").innerHTML = "<strong>Warning!<strong> No image selected to process"
        element.classList.add("show");
        return false;
    }
    var scaleFactor = assetsize / 4500;

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var img = document.getElementById(assetname);
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    canvas.width = iw * scaleFactor;
    canvas.height = ih * scaleFactor;
    ctx.drawImage(img,0,0,iw * scaleFactor,ih * scaleFactor);
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'ntbc-logo-resized.png');
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();


};

function downloadImgold() {
    // Clear error message
    var element = document.getElementById("errMsg");
    element.classList.remove("show");
    // check if the values are selected
    var assetsize = document.forms["frmCust"]["txtSize"].value;
    if (assetsize != parseInt(assetsize, 10) || assetsize == '') {
        document.getElementById("errText").innerHTML = "<strong>Warning!<strong> Image width must be an integer."
        element.classList.add("show");
        return false;
    }
    var selector = document.querySelector('input[name="assetSel"]:checked');
    if (selector) {
        var assetname = selector.value;
    }
    else {
        document.getElementById("errText").innerHTML = "<strong>Warning!<strong> No image selected to process"
        element.classList.add("show");
        return false;
    }
    assetname = "http://localhost/ntbc/notebc-branding/assets/logo/" + assetname;
    alert('Processing ' + assetname + ' to size ' + assetsize);
    var scaleFactor = assetsize / 4500;
    var img = new Image();
    img.crossOrigin = 'anonymous';
    //img.onload = resizeImg(img, scaleFactor);
    img.src= assetname;
    img.onload = doresize(scaleFactor);
    function doresize(scaleFactor) {
        var canvas = document.createElement("canvas");
        //new thumbnailer(canvas, img, 188, 3); //this produces lanczos3
        // but feel free to raise it up to 8. Your client will appreciate
        // that the program makes full use of his machine.
        var ctx = canvas.getContext('2d');
        var iw = 4500;
        var ih = 4500;
        canvas.width = iw * scaleFactor;
        canvas.height = ih * scaleFactor;
        ctx.drawImage(img,0,0,iw*scaleFactor,ih*scaleFactor);
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'ntbc-logo-resized.png');
        let dataURL = canvas.toDataURL('image/png');
        let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    };


};

function resizeImg(img,scaleFactor){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'ntbc-logo-resized.png');
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var iw = 4500;
    var ih = 4500;
    c.width = iw * scaleFactor;
    c.height = ih * scaleFactor;
    ctx.drawImage(img,0,0,iw*scaleFactor,ih*scaleFactor);

    //var scaledImg=new Image();
    //scaledImg.onload=function(){
        // scaledImg is a scaled imageObject for upload/download
        // For testing, just append it to the DOM
    //    document.body.appendChild(scaledImg);
    //}
    //scaledImg.src=c.toDataURL();

    let dataURL = c.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();

}

// Begin Thumbnailer from https://stackoverflow.com/questions/2303690/resizing-an-image-in-an-html5-canvas

// returns a function that calculates lanczos weight
function lanczosCreate(lobes) {
    return function(x) {
        if (x > lobes)
            return 0;
        x *= Math.PI;
        if (Math.abs(x) < 1e-16)
            return 1;
        var xx = x / lobes;
        return Math.sin(x) * Math.sin(xx) / x / xx;
    };
}

// elem: canvas element, img: image element, sx: scaled width, lobes: kernel radius
function thumbnailer(elem, img, sx, lobes) {
    this.canvas = elem;
    elem.width = img.width;
    elem.height = img.height;
    elem.style.display = "none";
    this.ctx = elem.getContext("2d");
    this.ctx.drawImage(img, 0, 0);
    this.img = img;
    this.src = this.ctx.getImageData(0, 0, img.width, img.height);
    this.dest = {
        width : sx,
        height : Math.round(img.height * sx / img.width),
    };
    this.dest.data = new Array(this.dest.width * this.dest.height * 3);
    this.lanczos = lanczosCreate(lobes);
    this.ratio = img.width / sx;
    this.rcp_ratio = 2 / this.ratio;
    this.range2 = Math.ceil(this.ratio * lobes / 2);
    this.cacheLanc = {};
    this.center = {};
    this.icenter = {};
    setTimeout(this.process1, 0, this, 0);
}

thumbnailer.prototype.process1 = function(self, u) {
    self.center.x = (u + 0.5) * self.ratio;
    self.icenter.x = Math.floor(self.center.x);
    for (var v = 0; v < self.dest.height; v++) {
        self.center.y = (v + 0.5) * self.ratio;
        self.icenter.y = Math.floor(self.center.y);
        var a, r, g, b;
        a = r = g = b = 0;
        for (var i = self.icenter.x - self.range2; i <= self.icenter.x + self.range2; i++) {
            if (i < 0 || i >= self.src.width)
                continue;
            var f_x = Math.floor(1000 * Math.abs(i - self.center.x));
            if (!self.cacheLanc[f_x])
                self.cacheLanc[f_x] = {};
            for (var j = self.icenter.y - self.range2; j <= self.icenter.y + self.range2; j++) {
                if (j < 0 || j >= self.src.height)
                    continue;
                var f_y = Math.floor(1000 * Math.abs(j - self.center.y));
                if (self.cacheLanc[f_x][f_y] == undefined)
                    self.cacheLanc[f_x][f_y] = self.lanczos(Math.sqrt(Math.pow(f_x * self.rcp_ratio, 2)
                        + Math.pow(f_y * self.rcp_ratio, 2)) / 1000);
                var weight = self.cacheLanc[f_x][f_y];
                if (weight > 0) {
                    var idx = (j * self.src.width + i) * 4;
                    a += weight;
                    r += weight * self.src.data[idx];
                    g += weight * self.src.data[idx + 1];
                    b += weight * self.src.data[idx + 2];
                }
            }
        }
        var idx = (v * self.dest.width + u) * 3;
        self.dest.data[idx] = r / a;
        self.dest.data[idx + 1] = g / a;
        self.dest.data[idx + 2] = b / a;
    }

    if (++u < self.dest.width)
        setTimeout(self.process1, 0, self, u);
    else
        setTimeout(self.process2, 0, self);
};
thumbnailer.prototype.process2 = function(self) {
    self.canvas.width = self.dest.width;
    self.canvas.height = self.dest.height;
    self.ctx.drawImage(self.img, 0, 0, self.dest.width, self.dest.height);
    self.src = self.ctx.getImageData(0, 0, self.dest.width, self.dest.height);
    var idx, idx2;
    for (var i = 0; i < self.dest.width; i++) {
        for (var j = 0; j < self.dest.height; j++) {
            idx = (j * self.dest.width + i) * 3;
            idx2 = (j * self.dest.width + i) * 4;
            self.src.data[idx2] = self.dest.data[idx];
            self.src.data[idx2 + 1] = self.dest.data[idx + 1];
            self.src.data[idx2 + 2] = self.dest.data[idx + 2];
        }
    }
    self.ctx.putImageData(self.src, 0, 0);
    self.canvas.style.display = "block";
};
// End Resize from https://stackoverflow.com/questions/2303690/resizing-an-image-in-an-html5-canvas