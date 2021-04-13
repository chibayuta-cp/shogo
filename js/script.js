$(function() {
  //ブログ画像のhoverの設定

  $("#img-blog1").hover(
    function(){
      $("#img-blog1").css("opacity",0.5);
    },
    function() {
      $("#img-blog1").css("opacity",1);
  });
  $("#img-blog2").hover(
    function(){
      $("#img-blog2").css("opacity",0.5);
    },
    function() {
      $("#img-blog2").css("opacity",1);
  });
  $("#img-blog3").hover(
    function(){
      $("#img-blog3").css("opacity",0.5);
    },
    function() {
      $("#img-blog3").css("opacity",1);
  });

    //質問のアコーディオンの設定
    $(".question-list").click(function() {
    var $answer = $(this).find('.question-body');
    if ($answer.hasClass('open')) {
      $answer.removeClass('open');
      $answer.slideUp();
      $(this).find("span").text("+");
    } else {
      $answer.addClass('open');
      $answer.slideDown();
      $(this).find("span").text("-");
    }
    });
   
    //Swipeの作成
    var mySwiper = new Swiper('.swiper-container', {
      	loop: true,
        slidesPerView: 5,
        centeredSlides : true,
        autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        },
        swipe: true,
    });

    //AOS.jsの設定
     AOS.init()

    //ページ内リンク調整
    var headerHeight = 105;//固定ヘッダーの高さを入れる
    $('[href^="#"]').click(function(){
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top-headerHeight; 
      $("html, body").animate({scrollTop:position}, 1000, "swing");//200はスクロールの移動スピードです
      return false;
    });

    //お問い合わせのヴァリデーション（全入力させる）
    var $submitBtn = $('#js-submit')
      $('#form input,#form textarea').on('change', function () {
        if (
          $('#form input[type="text"]').val() !== "" &&
          $('#form input[type="email"]').val() !== "" &&
          $('#form input[type="contents"]').val() !== "" &&
          $('#form #privacyCheck').prop('checked') === true
        ) {
          $submitBtn.prop('disabled', false);
        } else {
          $submitBtn.prop('disabled', true);
        }
    });

    //お問い合わせの送信後の表示
    $('#form').submit(function (event) {
        var formData = $('#form').serialize();
        $.ajax({
          url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuD9e410l5AuhYdbxco-9mf-R7N_g7QmqI-92B4ZeZlTcc-Q/formResponse",
          data: formData,
          type: "POST",
          dataType: "xml",
          statusCode: {
            0: function () {
              $(".end-message").slideDown();
              $(".submit-btn").fadeOut();
              $(".checkbox-wrapper").fadeOut();
              //window.location.href = "thanks.html";
            },
            200: function () {
              $(".false-message").slideDown();
            }
          }
        });
        event.preventDefault();
    });

   //ハンバーガーメニュー設定
       $(".hanberger-nav").hide();
       $(".hanberger-btn").click(function(){//メニューボタンをクリックしたとき
        $(".hanberger-nav").toggle(300);//0.3秒で表示したり非表示にしたりする
    });



});
