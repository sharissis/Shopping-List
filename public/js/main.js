$(function(){

	$('#js-add-item-toggle').on('click', function(event) {
		event.preventDefault();
		$('#js-add-item-container').toggleClass('open');
		$('#js-item-list').toggleClass('add-item-form-open');
		var form = $('#js-add-item-form');
		form.toggleClass('visible');
		$(this).toggleClass('fa-minus-circle').toggleClass('fa-plus-circle');
	});
	
});