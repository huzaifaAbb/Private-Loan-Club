$(document).ready(function () {
    var totalSteps = ($('.bf_step').length);
    var barWidth = (100 / (totalSteps - 1));
    var customWidth = 0, counter = 0;
    barWidth = barWidth.toFixed(2);
    var currency_code = ["AFA", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYR", "BEF", "BZD", "BMD", "BTN", "BTC", "BOB", "BAM", "BWP", "BRL", "GBP", "BND", "BGN", "BIF", "KHR", "CAD", "CVE", "KYD", "XOF", "XAF", "XPF", "CLP", "CNY", "COP", "KMF", "CDF", "CRC", "HRK", "CUC", "CZK", "DKK", "DJF", "DOP", "XCD", "EGP", "ERN", "EEK", "ETB", "EUR", "FKP", "FJD", "GMD", "GEL", "DEM", "GHS", "GIP", "GRD", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "ITL", "JMD", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LVL", "LBP", "LSL", "LRD", "LYD", "LTL", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "MRO", "MUR", "MXN", "MDL", "MNT", "MAD", "MZM", "MMK", "NAD", "NPR", "ANG", "TWD", "NZD", "NIO", "NGN", "KPW", "NOK", "OMR", "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", "SVC", "WST", "SAR", "RSD", "SCR", "SLL", "SGD", "SKK", "SBD", "SOS", "ZAR", "KRW", "XDR", "LKR", "SHP", "SDG", "SRD", "SZL", "SEK", "CHF", "SYP", "STD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "UYU", "USD", "UZS", "VUV", "VEF", "VND", "YER", "ZMK"];
    for (let i = 0; i < currency_code.length; i++) {
        let customOption = '<option value="' + currency_code[i] + '">' + currency_code[i] + '</option>';
        $('#bf_currency_select').append(customOption);
    }
    var bar = $('.bf_bar');

    function st() {
        var st = $(window).scrollTop();
        if (st > 100) {
            $('html, body').stop().animate({
                'scrollTop': 0
            }, 500, 'swing', function () {
            });
        }
    }

    function increaseBarWidth() {
        if (customWidth < 94) {
            counter++;
            customWidth = counter * barWidth;
            bar.width(customWidth + '%');
        } else {
            customWidth = 0;
            counter = 0;
        }
    }

    function dereaseBarWidth() {
        counter--;
        customWidth = counter * barWidth;
        bar.width(customWidth + '%');
    }

    function nextStep(step) {
        if (step.next().length !== 0) {
            $('.bf_step').not(step.next('.bf_step')).addClass('bf_hidden');
            step.next('.bf_step').removeClass('bf_hidden');
        } else {
            close();
        }
    }

    function prevStep(step) {
        $('.bf_step').not(step.prev('.bf_step')).addClass('bf_hidden');
        step.prev('.bf_step').removeClass('bf_hidden');
    }

    $('.bf_faq_item_btn').click(function (e) {
        e.preventDefault();
        $('.bf_faq_item_btn').not($(this)).removeClass('open');
        $('.bf_faq_item').not($(this).parents('.bf_faq_item')).removeClass('active');
        $('.bf_faq_item_body').not($(this).next('.bf_faq_item_body')).fadeOut();
        $(this).toggleClass('open');
        $(this).parents('.bf_faq_item').toggleClass('active');
        $(this).next('.bf_faq_item_body').fadeToggle();
    });

    $('.bf_header_btn').click(function (e) {
        e.preventDefault();
        $('.bf_hero_sec_inner').addClass('bf_hidden');
        $('.bf_loading-overlay').addClass('active');
        setTimeout(function () {
            $('.bf_steps_inner').addClass('active');
        }, 300);
        setTimeout(function () {
            $('.bf_loading-overlay').removeClass('active');
        }, 1000);
    });

    $('.bf_step_btn').click(function () {
        let step = $(this).parents('.bf_step');
        let buttons = step.find('.bf_step_btn');
        let validation = false;
        buttons.not($(this)).removeClass('active');
        let fields = step.find('.required-filed');
        fields.val('');
        $(this).toggleClass('active');
        $(buttons).each(function () {
            if ($(this).hasClass('active')) {
                validation = true;
                return false
            } else {
                validation = false;
            }
        });
        if (validation) {
            step.find('.bf_next_btn').removeAttr('disabled');
        } else {
            step.find('.bf_next_btn').attr('disabled', '');
        }
        increaseBarWidth();
        st();
        nextStep(step);
    });

    $('.required-filed').on('input propertychange change paste keyup', function (e) {
        e.preventDefault();
        let step = $(this).parents('.bf_step');
        let validation = false;
        let fields = step.find('.required-filed');
        let buttons = step.find('.bf_step_btn');
        buttons.removeClass('active');
        var length;
        $(fields).each(function () {
            length = parseInt($(this).attr('min'));
            if ($(this).hasClass('bf_phone_number')) {
                length = 11;
                // if ($(this).val().length === 11) {
                //     viewOffers();
                // }
            } else if ($(this).hasClass('bf_email')) {
                const $result = $('#result');
                const mail = $(this);
                const email = $(this).val();
                $result.text('');
                if (validateEmail(email)) {
                    // $result.text(email + ' is valid');
                    mail.css('color', '#517664');
                    validation = true;
                } else {
                    // $result.text(email + ' is not valid');
                    mail.css('color', 'red');
                    validation = false;
                }
                return false;
            } else if ($(this).hasClass('bf_mobile_number')) {
                var output, $this = $(this), input = $this.val();
                if (e.keyCode !== 8) {
                    input = input.replace(/[^0-9]/g, '');
                    var area = input.substr(0, 3);
                    var pre = input.substr(3, 3);
                    var tel = input.substr(6, 4);
                    if (area.length < 3) {
                        output = "(" + area;
                    } else if (area.length === 3 && pre.length < 3) {
                        output = "(" + area + ")" + " " + pre;
                    } else if (area.length === 3 && pre.length === 3) {
                        output = "(" + area + ")" + " " + pre + "-" + tel;
                    }
                    $this.val(output);
                } else {
                    var str = input;
                    if (input.slice(-1) === '-') {
                        str = str.substring(0, str.length - 1);
                        $this.val(str);
                    } else if (/\s+$/.test($this.val()) && str.length === 6) {
                        $this.val(input.substr(0, 4))
                    } else if (str.length === 1) {
                        $this.val('');
                    }
                }
            } else if ($(this).hasClass('bf_loan_amount')) {
                var output, $this = $(this), input = $this.val();
                if (e.keyCode !== 8) {
                    input = input.replace(/[^0-9]/g, '');
                    var area = input.substr(0, 3);
                    var pre = input.substr(0, 1);
                    var post = input.substr(1, input.length);
                    output = "$" + input;
                    if (input.length > 2 && input.length < 6) {
                        output = "$" + pre + "," + post;
                    } else if (input.length >= 6) {
                        pre = input.substr(0, 2);
                        post = input.substr(2, input.length);
                        var ddpost = parseInt(post);
                        ddpost = ddpost.toLocaleString();
                        output = "$" + pre + "," + ddpost;
                    }
                    $this.val(output);
                } else {
                    var str = input;
                    if (input.slice(-1) === ',') {
                        str = str.substring(0, str.length - 1);
                        $this.val(str);
                    } else if (str.length === 1) {
                        $this.val('');
                    }
                }
            }
            if ($(this).val().trim() !== '' && $(this).val().trim().length >= length) {
                validation = true;
            } else {
                validation = false;
                return false
            }
        })
        if (validation) {
            step.find('.bf_next_btn').removeAttr('disabled');
            if (e.which === 13 || e.which === 1) {
                if ($(this).hasClass('bf_phone_number')) {
                    if ($(this).val().length === 11) {
                        viewOffers();
                    }
                }
                increaseBarWidth();
                nextStep(step);
                st();
            }
        } else {
            step.find('.bf_next_btn').attr('disabled', '');
        }
    });

    var customSelect = $(".bf_custom_select");

    customSelect.each(function () {
        var thisCustomSelect = $(this), options = thisCustomSelect.find("option"),
            firstOptionText = options.first().text();

        var selectedItem = $("<div></div>", {
            class: "bf_selected_item bf_form_control"
        })
            .appendTo(thisCustomSelect)
            .text('Select');

        var allItems = $("<div></div>", {
            class: "bf_all_items bf_all_items_hide"
        }).appendTo(thisCustomSelect);
        options.each(function () {
            var that = $(this), optionText = that.text();
            let step = $(this).parents('.bf_step');
            let validation = false;

            var item = $("<div></div>", {
                class: "bf_item", on: {
                    click: function () {
                        var selectedOptionText = that.text().trim();
                        let selectName = $(this).parents('.bf_custom_select').find('select').attr('name');
                        // selectedOptions(selectName, selectedOptionText);
                        selectedItem.text(selectedOptionText).removeClass("bf_arrowanim");
                        allItems.addClass("bf_all_items_hide");
                        let custom_select_select = $('.bf_selected_item');
                        $(custom_select_select).each(function () {
                            if ($(this).text() === 'Select') {
                                validation = false;
                            } else {
                                validation = true;
                                return false
                            }
                        });
                        if (validation) {
                            step.find('.bf_next_btn').removeAttr('disabled');
                        } else {
                            step.find('.bf_next_btn').attr('disabled', '');
                        }
                        increaseBarWidth();
                        nextStep(step);
                    }
                }
            })
                .appendTo(allItems)
                .text(optionText);
        });
    });

    var selectedItem = $(".bf_selected_item"), allItems = $(".bf_all_items");

    selectedItem.on("click", function (e) {
        var currentSelectedItem = $(this), currentAllItems = currentSelectedItem.next(".bf_all_items");

        allItems.not(currentAllItems).addClass("all-items-hide");
        selectedItem.not(currentSelectedItem).removeClass("bf_arrowanim");

        currentAllItems.toggleClass("bf_all_items_hide");
        currentSelectedItem.toggleClass("bf_arrowanim");

        e.stopPropagation();
    });

    $(document).on("click", function () {
        var opened = $(".bf_all_items:not(.bf_all_items_hide)"), index = opened.parent().index();
        customSelect
            // .eq(index)
            .find(".bf_all_items")
            .addClass("bf_all_items_hide");
        customSelect
            // .eq(index)
            .find(".bf_selected_item")
            .removeClass("bf_arrowanim");
    });

    $('.bf_hero_btn, .bf_header_btn, .bf_start_now').click(function (e) {
        e.preventDefault();
        let steps_inner = $('.bf_steps_inner');
        $('.bf_loading-overlay').addClass('active');
        $('.bf_hero_sec_inner').addClass('bf_hidden');
        $('.bf_header_btn').parents('li').addClass('bf_opacity').prev('li').addClass('bf_opacity');
        steps_inner.addClass('active');
        steps_inner.find('.bf_step').first().removeClass('bf_hidden');
        $('.bf_steps_action').addClass('bf_hidden');
        st();
        setTimeout(function () {
            $('.bf_loading-overlay').removeClass('active');
        }, 600);
    });

    $('.bf_next_btn').click(function (e) {
        e.preventDefault();
        increaseBarWidth();
        st();
        var step = $(this).parents('.bf_step');
        nextStep(step);
    });

    $('.bf_prev_btn').click(function (e) {
        e.preventDefault();
        dereaseBarWidth();
        var step = $(this).parents('.bf_step');
        prevStep(step);
    });

    $('.bf_nav_logo').click(function (e) {
        e.preventDefault();
        close();
    });

    $(".bf_view_offers").click(function (e) {
        e.preventDefault();
        console.log($('.bf_steps_form').serialize())
        viewOffers();
    });

    function close() {
        counter = 0;
        customWidth = 0;
        bar.width('0%');
        // $('.bf_step_btn').removeClass('active');
        // $('.required-filed').val('');
        // $('.bf_next_btn').attr('disabled', '');
        // $('.bf_selected_item').text('Select');
        let steps_inner = $('.bf_steps_inner');
        $('.bf_loading-overlay').addClass('active');
        $('.bf_hero_sec_inner').removeClass('bf_hidden');
        $('.bf_header_btn').parents('li').removeClass('bf_opacity').prev('li').removeClass('bf_opacity');
        steps_inner.removeClass('active');
        steps_inner.find('.bf_step').addClass('bf_hidden');
        $('.bf_steps_action').removeClass('bf_hidden');
        setTimeout(function () {
            $('.bf_loading-overlay').removeClass('active');
        }, 600);
        st();
    }

    function viewOffers() {
        $('.bf_bar').width('0');
        $('.bf_loading-overlay').addClass('active');
        setTimeout(function () {
            $('.bf_loading-overlay').removeClass('active');
        }, 900);
        thankYou();
    }

    setTimeout(function () {
        $('.bf_loading-overlay').removeClass('active');
    }, 600);

    $('.bf_header_overlay, .bf_close_nav').click(function (e) {
        e.preventDefault();
        $('.bf_menu_drawer').removeClass('show');
        setTimeout(function () {
            $('.bf_header_overlay').removeClass('show');
            $('body').removeClass('lock');
        }, 200)
    });

    $('.bf_main_toggle_btn').click(function (e) {
        e.preventDefault();
        $('.bf_header_overlay').addClass('show');
        $('.bf_menu_drawer').addClass('show');
        $('body').addClass('lock');
    });

    const validateEmail = (email) => {
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $('body').addClass('its_safari');
    }

    function thankYou() {
        $('.bf_bar').animate({width: '100%'}, {
            duration: 10000, step: function (now, fx) {
                if (fx.prop === 'width') {
                    $('.bf_counting').html(parseInt(Math.round(now * 100) / 100) + '%');
                }
            }
        })
        setTimeout(function () {
            close();
        }, 11000);
    }

    // function selectedOptions(name, val) {
    //     let options = $('select[name=' + name + ']').find('option');
    //     options.each(function (i, ele) {
    //         if ($(ele).text().trim() === val) {
    //             $(ele).prop('selected', true);
    //             $(ele).attr('selected', 'selected');
    //         } else {
    //             $(ele).prop('selected', false);
    //             $(ele).removeAttr('selected');
    //         }
    //     });
    // }

})