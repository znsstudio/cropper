$(function() {

  var console = window.console || {log: function () {}};

  // Overview
  // -------------------------------------------------------------------------

  (function() {
    var $image = $(".img-container img"),
        $dataX = $("#data-x"),
        $dataY = $("#data-y"),
        $dataHeight = $("#data-height"),
        $dataWidth = $("#data-width"),
        options = {
          aspectRatio: 16 / 9,
          data: {
            x: 480,
            y: 60,
            width: 640,
            height: 360
          },
          preview: ".img-preview",
          done: function(data) {
            $dataX.val(data.x);
            $dataY.val(data.y);
            $dataHeight.val(data.height);
            $dataWidth.val(data.width);
          }
        };

    $image.cropper(options).on({
      "build.cropper": function(e) {
        console.log(e.type);
      },
      "built.cropper": function(e) {
        console.log(e.type);
      },
      "render.cropper": function(e) {
        console.log(e.type);
      }
    });

    $("#reset").click(function() {
      $image.cropper("reset");
    });

    $("#reset-deep").click(function() {
      $image.cropper("reset", true);
    });

    $("#release").click(function() {
      $image.cropper("release");
    });

    $("#destroy").click(function() {
      $image.cropper("destroy");
    });

    $("#free-ratio").click(function() {
      $image.cropper("setAspectRatio", "auto");
    });

    $("#get-data").click(function() {
      var data = $image.cropper("getData"),
          val = "";

      try {
        val = JSON.stringify(data);
      } catch (e) {
        console.log(data);
      }

      $("#get-data-input").val(val);
    });

    var $setDataX = $("#set-data-x"),
        $setDataY = $("#set-data-y"),
        $setDataWidth = $("#set-data-width"),
        $setDataHeight = $("#set-data-height");

    $("#set-data").click(function() {
      var data = {
            x: $setDataX.val(),
            y: $setDataY.val(),
            width: $setDataWidth.val(),
            height: $setDataHeight.val()
          };

      $image.cropper("setData", data);
    });

    $("#set-aspect-ratio").click(function() {
      var aspectRatio = $("#set-aspect-ratio-input").val();

      $image.cropper("setAspectRatio", aspectRatio);
    });

    $("#set-img-src").click(function() {
      var cropper = $image.data("cropper"),
          val = $("#set-img-src-input").val();

      $image.cropper("setImgSrc", val);
    });

    $("#get-img-info").click(function() {
      var data = $image.cropper("getImgInfo"),
          val = "";

      try {
        val = JSON.stringify(data);
      } catch (e) {
        console.log(data);
      }

      $("#get-img-info-input").val(val);
    });

    $(".docs-options :radio").on("change", function (e) {
      var $this = $(this);

      if ($this.is(":checked")) {
        options[$this.attr("name")] = $this.val() === "true" ? true : false;
        $image.cropper("destroy").cropper(options);
      }
    });
  }());

  // Sidebar
  // -------------------------------------------------------------------------

  (function() {
    var $sidebar = $(".docs-sidebar"),
        offset = $sidebar.offset();
        offsetTop = offset.top;
        mainHeight = $sidebar.parents(".row").height() - $sidebar.height();

    $(window).bind("scroll", function() {
      var st = $(this).scrollTop();

      if (st > offsetTop && (st - offsetTop) < mainHeight) {
        $sidebar.addClass("fixed");
      } else {
        $sidebar.removeClass("fixed");
      }
    });
  }());

  // Examples
  // -------------------------------------------------------------------------

  (function() {
    var $modal = $("#bootstrap-modal"),
        $image = $modal.find(".bootstrap-modal-cropper img"),
        originalData = {};

    $modal.on("shown.bs.modal", function() {
      $image.cropper({
        multiple: true,
        data: originalData,
        done: function(data) {
          console.log(data);
        }
      });
    }).on("hidden.bs.modal", function() {
      originalData = $image.cropper("getData"); // Save the data on hide
      $image.cropper("destroy");
    });
  }());
});
