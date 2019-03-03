$(document).ready(function () {
  var clickedValue = 0;
  function resetStar() {
    $('#1_star').attr('src', '/images/star_off.png');
    $('#2_star').attr('src', '/images/star_off.png');
    $('#3_star').attr('src', '/images/star_off.png');
    $('#4_star').attr('src', '/images/star_off.png');
    $('#5_star').attr('src', '/images/star_off.png');
    $('#showTitle').html('Give a review');
  }

  function star_on_1() {
    $('#1_star').attr('src', '/images/star_on.png');
    $('#2_star').attr('src', '/images/star_off.png');
    $('#3_star').attr('src', '/images/star_off.png');
    $('#4_star').attr('src', '/images/star_off.png');
    $('#5_star').attr('src', '/images/star_off.png');
    $('#showTitle').html('Bad');
  }

  function star_on_2() {
    $('#1_star').attr('src', '/images/star_on.png');
    $('#2_star').attr('src', '/images/star_on.png');
    $('#3_star').attr('src', '/images/star_off.png');
    $('#4_star').attr('src', '/images/star_off.png');
    $('#5_star').attr('src', '/images/star_off.png');
    $('#showTitle').text('Poor');
  }

  function star_on_3() {
    $('#1_star').attr('src', '/images/star_on.png');
    $('#2_star').attr('src', '/images/star_on.png');
    $('#3_star').attr('src', '/images/star_on.png');
    $('#4_star').attr('src', '/images/star_off.png');
    $('#5_star').attr('src', '/images/star_off.png');
    $('#showTitle').text('Fair');
  }

  function star_on_4() {
    $('#1_star').attr('src', '/images/star_on.png');
    $('#2_star').attr('src', '/images/star_on.png');
    $('#3_star').attr('src', '/images/star_on.png');
    $('#4_star').attr('src', '/images/star_on.png');
    $('#5_star').attr('src', '/images/star_off.png');
    $('#showTitle').text('Good');
  }

  function star_on_5() {
    $('#1_star').attr('src', '/images/star_on.png');
    $('#2_star').attr('src', '/images/star_on.png');
    $('#3_star').attr('src', '/images/star_on.png');
    $('#4_star').attr('src', '/images/star_on.png');
    $('#5_star').attr('src', '/images/star_on.png');
    $('#showTitle').text('Excellent');
  }

  function chooseStar() {
    if(!clickedValue) {
      resetStar();
    } else if(clickedValue === 1) {
      star_on_1();
    } else if(clickedValue === 2) {
      star_on_2();
    }  else if(clickedValue === 3) {
      star_on_3();
    }  else if(clickedValue === 4) {
      star_on_4();
    }  else {
      star_on_5();
    } 
  }

  // hover star
  $('#1_star').mouseover(function() {
    star_on_1();
  });

  $('#2_star').hover(function() {
    star_on_2();
  });

  $('#3_star').hover(function() {
    star_on_3();
  });

  $('#4_star').hover(function() {
    star_on_4();
  });

  $('#5_star').hover(function() {
    star_on_5();
  });

  // click choose star
  $('#1_star').on('click', function(){
    clickedValue = 1;
  });
  
  $('#2_star').on('click', function(){
    clickedValue = 2;
  });

  $('#3_star').on('click', function(){
    clickedValue = 3;
  });

  $('#4_star').on('click', function(){
    clickedValue = 4;
  });

  $('#5_star').on('click', function(){
    clickedValue = 5;
  });

  // mouse out
  $('body').mouseout(function(e) {
    var is_hover_area = $(e.target).parents('.star-list').length || $(e.target).hasClass('star-list');
    if(!is_hover_area) {
      chooseStar();
    }
  });

  $('#rate').on('click', function() {
    var sender = $('#sender').val();
    var review = $('#review').val();
    var id = $('#id-company').val();
    var valid = true;

    if(!clickedValue) {
      valid = false;
      $('#error').html('<div class="alert alert-danger">Please give a rating and review before you submit </div>')
    } else {
      $('#error').html('');
    }

    if(valid) {
      $.ajax({
        url: '/review/' + id,
        type: 'POST',
        data: {
          clickedValue: clickedValue,
          review: review,
          sender: sender
        },
        success: function(res) {
          sender = $('#sender').val('');
          review = $('#review').val('');
          id = $('#id-company').val('');
        }
      });
    } else {
      return false;
    }
  });
});