
// ヘッダーメニュースクロール時の色変更
  $(window).on("scroll", function () {
    const sliderHeight = $(".fv,.about-fv").height();
    if (sliderHeight - 30 < $(this).scrollTop()) {
      $(".js-header").addClass("headerColorScroll");
    } else {
      $(".js-header").removeClass("headerColorScroll");
    }
  });

// ページスクロール時にヘッダー高さ分下げる（セクションタイトルとヘッダーの被り防止）
  $(function () {
    // ヘッダーの高さ取得
    const headerHeight = $(".js-header").height();
    $('a[href^="#"]').click(function () {
      const speed = 200;
      let href = $(this).attr("href");
      let target = $(href == "#" || href == "" ? "html" : href);
      // ヘッダーの高さ分下げる
      let position = target.offset().top - headerHeight;
      $("body,html").animate({ scrollTop: position }, speed, "linear");
      return false;
    });
  });
// ヘッダー高さ分を考慮した他ページへのアンカーリンク遷移
  $(window).on('load', function() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const url = $(location).attr('href'),
    headerHeight = $('header').height();
    // urlに「#」が含まれていれば
    if(url.indexOf("#") != -1){
      // urlを#で分割して配列に格納
      const anchor = url.split("#"),
      // 分割した最後の文字列（#◯◯の部分）をtargetに代入
      target = $('#' + anchor[anchor.length - 1]);
      setTimeout(() => {
        position = target.offset().top - headerHeight;
        $("html, body").animate({scrollTop:position}, 200, "linear");
      },200);
    }
  });
  // 
  // $(window).on('load', function () {
  //   // ブラウザの自動スクロールを無効にする
  //   if ('scrollRestoration' in history) {
  //     history.scrollRestoration = 'manual';
  //   }
  //   const url = $(location).attr('href');
  //   const headerHeight = $('header').outerHeight();
  //   if (url.indexOf("#") !== -1) {
  //     const anchor = url.split("#");
  //     const targetId = anchor[anchor.length - 1];
  //     setTimeout(() => {
  //       const target = $('#' + targetId);
  //       if (target.length) {
  //         const position = Math.floor(target.offset().top) - headerHeight;
  //         $("html, body").animate({ scrollTop: position }, 300, "linear");
  //       }
  //     }, 100);
  //   }
  // });

// ハンバーガーメニュー
  $(".js-hamburger,.js-drawer .drawer-menu__item a").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").fadeToggle();
    $("body").toggleClass("no-scroll")
  });


// スライダー
  const swiper = new Swiper(".swiper", {
    loop: true,
    effect: "fade",
    speed: 2000,
    autoplay:{
      delay: 2000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

// タブ
  $(function () {
    const tabButton = $(".js-tab-button"),
      tabContent = $(".js-tab-content");
    tabButton.on("click", function () {
      let index = tabButton.index(this);
      tabButton.removeClass("is-active");
      $(this).addClass("is-active");
      tabContent.removeClass("is-active");
      tabContent.eq(index).addClass("is-active");
    });
  });

// モーダル
  $(function () {
    const open = $(".js-modal-open"),
      close = $(".js-modal__close"),
      modal = $(".js-modal");
    //開くボタンをクリックしたらモーダルを表示する
    open.on("click", function () {
      modal.addClass("is-open"),
      $("body").addClass("no-scroll");
    });
    //閉じるボタンと背景をクリックしたらモーダルを閉じる
    close.on("click", function () {
      modal.removeClass("is-open"),
      $("body").removeClass("no-scroll");
    });
  });