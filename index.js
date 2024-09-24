$(function() {

    $('.han').click(function() {
        $(this).toggleClass('active');
        $('.nav').slideToggle();
    });

    $('.nav a').click(function() {
        $('.han').removeClass('active');
        $('.nav').slideUp();
        let iti = $(this).attr('href');
        let posi = $(iti).offset().top;
        $('html,body').animate({
            'scrollTop':posi
        },300);
    });

    $('.gazou-btn').click(function() {
        $('.active').removeClass('active');
        $('.hid').removeClass('hid');
        let index = $(this).index();
        $('.gazou').eq(index).addClass('active');
        if(index == 0) {
            $('.mae').addClass('hid');
        }else if(index == $('.gazou').length-1) {
            $('.tugi').addClass('hid');
        }
    });

    $('.zengo').click(function() {
        let before = $('.gazou').index($('.active'));
        $('.active').removeClass('active');
        $('.hid').removeClass('hid');
        if($(this).hasClass('mae')) {
            $('.gazou').eq(before).prev().addClass('active');
        }else{
            $('.gazou').eq(before).next().addClass('active');
        }
        let after = $('.gazou').index($('.active'));
        if(after == 0) {
            $('.mae').addClass('hid');
        }else if(after == $('.gazou').length-1) {
            $('.tugi').addClass('hid');
        }
    });

    $('.ako').click(function() {
        if($(this).hasClass('open')) {
            $(this).find('.ans').slideUp();
            $(this).find('span').text('↓');
            $(this).removeClass('open');
        }else{
            $(this).find('.ans').slideDown();
            $(this).find('span').text('↑');
            $(this).addClass('open');
        }
    });

    const tyumon = ['none',60,70,70,80,100,50,60,60,120,110,200];

    $('.form').submit(function() {
        $('.error').text("");
        let kosukei = 0;
        let kinkei = 0;
        for(let i=0;i<$('.select').length;i++) {
            let kin = $('.select').eq(i).find('option:selected').index();
            if($('.select').eq(i).val() == "注文なし") {
                $('.sousin-tr').eq(i).find('.name,.kosuu,.kingaku').text("");
            }else if($('.input').eq(i).val().match(/^[0-9]+$/)) {
                $('.sousin-tr').eq(i).find('.name').text($('.select').eq(i).val());
                $('.sousin-tr').eq(i).find('.kosuu').text($('.input').eq(i).val() + "個").css("color","black");
                $('.sousin-tr').eq(i).find('.kingaku').text($('.input').eq(i).val() * tyumon[kin] + "円").css("color","black");
                kosukei = kosukei + $('.input').eq(i).val() * 1;
                kinkei = kinkei + $('.input').eq(i).val() * tyumon[kin];
                $('.kakunin').addClass('be');
            }else{
                $('.sousin-tr').eq(i).find('.name').text($('.select').eq(i).val());
                $('.sousin-tr').eq(i).find('.kosuu').text('エラー').css("color","red");
                $('.sousin-tr').eq(i).find('.kingaku').text('エラー').css("color","red");
                $('.error').text('半角数字で入力してください。');
                $('.kakunin').addClass('ero');
            }
        }
        if(!$('.kakunin').hasClass('be') || $('.kakunin').hasClass('ero')) {
            $('.kakunin').removeClass('kakunin-active');
            $('.kakunin').removeClass('be ero');
        }else{
            $('.kakunin').addClass('kakunin-active');
        }
        $('.kosukei').text(kosukei + "個");
        $('.kinkei').text(kinkei + "円");
        kosukei = 0;
        kinkei = 0;
        return false;
    });

    $('.kesu').click(function() {
        $('.kakunin').removeClass('kakunin-active');
        $('td').text("");
        return false;
    });

});
