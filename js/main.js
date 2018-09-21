
var axonl = {

  keyup : function(obj){    
    $('.list li').addClass('disabled').removeClass('active');
    $('#content span').show();
    $('#content p').hide();
    let val = obj.val().toLowerCase();
    val ? obj.next().show() : obj.next().hide()
    $('.list a').each(function(){
      let page = $(this).text().toLowerCase();
      if(page.match(val)){
        $(this).parent().removeClass('disabled');
      }
    })

  },

  showPageContent : function(page){

    $('#content p').hide();
    $('.list li').removeClass('active');
    $('#content span').hide();
    page.parent().addClass('active');
    $('.right-pane ul').attr('id', page.attr('rel'));
    let activeTabPosition = $('.right-pane li.active').index('.right-pane li') + 1;
    if($('#'+page.attr('rel')+'_detail').length==0){
      $('#content').append('<p id="'+page.attr('rel')+'_detail">'+page.data('detail')+'</p>');
    }
    if($('#'+page.attr('rel')+'_content').length==0){
      $('#content').append('<p id="'+page.attr('rel')+'_content">'+page.data('content')+'</p>');
    }
    if(activeTabPosition===1){
      $('#'+page.attr('rel')+'_detail').show();
      $('#'+page.attr('rel')+'_content').hide();
    }else{
      $('#'+page.attr('rel')+'_content').show();
      $('#'+page.attr('rel')+'_detail').hide();
    }

  },

  tabClick : function(tab){

    $('#content p').hide();
    $('.right-pane li').removeClass('active');
    if(!tab.hasClass('active')){
      let pageID = tab.parent().attr('id');
      let activeTabPosition = tab.index('.right-pane li') + 1;
      activeTabPosition === 1 ? $('#'+pageID+'_detail').show() : $('#'+pageID+'_content').show() ;
      tab.addClass('active');
    }

  },

  remove : function(page){

    if(confirm('Are you sure?')){
      page.parent().remove();
      $('#content p#'+page.prev().attr('rel')+'_content').remove();
      $('#content p#'+page.prev().attr('rel')+'_detail').remove();
    }
  }

}

//page click event
$('.list li a').click(function(e){
  e.preventDefault();
  axonl.showPageContent($(this));
})

//tab click event
$('.right-pane li').click(function(){
  axonl.tabClick($(this));
})

//remove page event
$('.list li img').click(function(){
  axonl.remove($(this));
})





