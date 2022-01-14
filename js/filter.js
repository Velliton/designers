$('.filter-item').click(function(event){
	var i=$(this).data('filter');
	if (i==1) {
		$('.portfolio-column').show();

	}
	else {
		$('.portfolio-column').hide();
		$('.portfolio-column.f_'+i).show();
	}
	$('.filter-item').removeClass('active');
	$(this).addClass('active');
	return false;
})