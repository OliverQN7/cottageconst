$(document).ready(function () {
  new WOW({
    animateClass: "animate__animated",
  }).init();
  const loader = $(".loader");
  const input = document.querySelectorAll("input[type='tel']");
  const checkbox = document.getElementById("checkbox");
  const checkbox2 = document.getElementById("form-checkbox");
  const inputMask = new Inputmask("+7 (999) 999 99 99");
  inputMask.mask(input);
  new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    shadowPerProgress: false,
    coverflowEffect: {
      rotate: 0,
      stretch: 1,
      depth: 500,
      modifier: 1,
      scale: 1,
      slideShadows: false,
    },
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 40,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  $(".order__info-thanks").hide();
  $(".excursion__order").hide();
  $(".block-thanks").hide();

  // Проверка ширины экрана
  function checkBreakpoint() {
    if (window.innerWidth >= 1259) {
      $(".list__block-ellipse").off("click", handleListClick); // Убираем обработчик события
    } else {
      $(".list__description").hide();
      $(".list__block-ellipse").on("click", handleListClick); // Добавляем обработчик события
    }
  }
  checkBreakpoint();
  function handleListClick() {
    let descriptionID = $(this).data("description");
    let description = $("#" + descriptionID);

    $(".list__description").not(description).slideUp();
    description.slideToggle();
  }

  $(window).on("resize", checkBreakpoint);

  $(
    "#order-call, #learn-more, .description-buttons-give, .call-order, .home__scrollBlock"
  ).click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".order__info").offset().top,
      },
      1000
    );
  });

  $(".big-image, .image-2, .image-3, .image-4").magnificPopup({
    type: "image",
  });

  $("#showMore").click(function () {
    $(".hidden-block").css("display", "flex");
    $(".portfolio__open-arrow").toggleClass("open");
    $("#showMore, #hideMore").toggle();
  });

  $("#hideMore").click(function () {
    $(".hidden-block").css("display", "none");
    $(".portfolio__open-arrow").toggleClass("open");
    $("#showMore, #hideMore").toggle();
  });

  $("#submit").click(function (e) {
    if (!checkbox.checked) {
      e.preventDefault();
      alert("Нужно согласие на обработку персональных данных!");
    }
  });
  new window.JustValidate(".order__info-inputs", {
    rules: {
      name: {
        required: true,
        minLength: 2,
      },
      tel: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Введите ваше имя",
        minLength: "Имя должно содержать не менее 2 символов",
      },
      tel: {
        required: "Введите ваш телефон",
      },
    },
    submitHandler: function (form, values, ajax) {
      let name = document.getElementById("name").value;
      let tel = document.getElementById("tel").value;

      const input = $(".order-input");
      input.css("border-color", "$border-error");
      loader.css("display", "flex");

      $.ajax({
        method: "POST",
        url: "https://testologia.site/checkout",
        data: { name: name, tel: tel },
        success: function (success) {
          if (success.success === 1 && name === "itlogia") {
            $(".order__info-inputs").hide();
            $(".order__info-thanks").show();
            loader.css("display", "none");
          }
          if (success.success === 0 && name !== "itlogia") {
            alert(
              "Возникла ошибка при оформлении заказ! Позвоните нам и заполните заявку через менеджера."
            );
            loader.css("display", "none");
          }
          $(".order__info-checkbox").hide();
        },
      });
    },
  });
  $(".thanks-btn").click(function () {
    window.location.reload();
  });
  $(".registration__block-btn").click(function () {
    $(".excursion__order").show();
  });
  $("#submit2").click(function (e) {
    if (!checkbox2.checked) {
      e.preventDefault();
      alert("Нужно согласие на обработку персональных данных!");
    }
  });

  new window.JustValidate(".block-form", {
    rules: {
      name: {
        required: true,
        minLength: 2,
      },
      tel: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Введите ваше имя",
        minLength: "Имя должно содержать не менее 2 символов",
      },
      tel: {
        required: "Введите ваш телефон",
      },
    },
    submitHandler: function (form, values, ajax) {
      let name = document.getElementById("name2").value; // в эти места нельзя const ставить ибо значение переменной меняется, верно?
      let tel = document.getElementById("tel2").value; // в эти места нельзя const ставить ибо значение переменной меняется, верно?

      const input = $(".block-input");
      input.css("border-color", "$border-error");
      loader.css("display", "flex");

      $.ajax({
        method: "POST",
        url: "https://testologia.site/checkout",
        data: { name: name, tel: tel },
        success: function (success) {
          if (success.success === 1 && name === "itlogia") {
            $(".block-form").hide();
            $(".block-thanks").show();
            loader.css("display", "none");
          }
          if (success.success === 0 && name != "itlogia") {
            alert(
              "Возникла ошибка при оформлении заказ! Позвоните нам и заполните заявку через менеджера."
            );
            loader.css("display", "none");
          }
          $(".block-checkbox").hide();
        },
        error: function (xhr, status, error) {
          loader.css("display", "none");
          input.css("border-color", "red");
          alert("Пожалуйста, заполните все поля корректно.");
        },
      });
    },
  });
});
