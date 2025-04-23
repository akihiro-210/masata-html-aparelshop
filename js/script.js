
// ヘッダーメニュースクロール時の色変更
  $(window).on("scroll", function () {
    const sliderHeight = $(".fv,.about-fv").height();
    if (sliderHeight - 30 < $(this).scrollTop()) {
      $(".js-header").addClass("headerColorScroll");
    } else {
      $(".js-header").removeClass("headerColorScroll");
    }
  });

// ヘッダー高さを考慮したページスクロール
document.addEventListener("DOMContentLoaded", () => {
  const tempHash = window.location.hash;
  if (tempHash) {
    // ブラウザによる自動スクロールを阻止
    history.replaceState(null, null, window.location.pathname + window.location.search);
    window.scrollTo(0, 0); // Safari用に強制スクロールトップ
  }
  // jQueryが必要な場合
  $(window).on("load", function () {
    if (tempHash) {
      const $target = $(tempHash);
      // DOMが完全に反映されていないケースへの対処
      const tryScroll = () => {
        const headerHeight = $(".js-header").height();
        if ($target.length && $target.offset()) {
          const position = $target.offset().top - headerHeight;
          $("html, body").animate({ scrollTop: position }, 500, "swing");
          // hashを戻す（必要であれば）
          history.replaceState(null, null, tempHash);
        } else {
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 600);
    }
  });

  // ページ内リンクのクリック
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);
    const headerHeight = $(".js-header").height();
    const position = target.offset().top - headerHeight;
    $("html, body").animate({ scrollTop: position }, 500, "swing");
    });
  });

// ハンバーガーメニュー
  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-active");
    $(".js-drawer").fadeToggle();
    $("body").toggleClass("no-scroll");
  });

  $(".drawer-menu__item a,.js-drawer").click(function () {
    closeDrawer();
  });
  function closeDrawer() {
    $(".js-hamburger").removeClass("is-active");
    $(".js-drawer").fadeOut();
    $("body").removeClass("no-scroll");
  }

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