$(function(){
	/* Сортировка контента */
	$(document).on('keyup', 'input[name="sort"]', function(){
		var t = $(this),
			value = (t.val() == undefined || t.val() == '') ? 0 : t.val();
		$('.loading').addClass('d-lg-block');
		$.post('/esup/sorting', { table: t.attr('data-sort-table'), field: t.attr('data-sort-field'), id: t.attr('data-item-id'), value: value }, function(data){
			$('.loading').removeClass('d-lg-block');
			if (data.status == 'error') {
				notification(data.status, data.message);
			}
		}, 'JSON');
	});

	/* Удаление файла */
	$('.file').on('click', '.file-delete', function(){
		var t = $(this);
		if (confirm('Удалить эту запись? (Space - да; Esc - нет)') == false) return false;
		$('.loading').addClass('d-lg-block');
		$.post(t.attr('href'), function(data){
			$('.loading').removeClass('d-lg-block');
			if (data.status == 'ok') {
				t.parents('.flex_item').remove();
			}
			if (data.status == 'error') {
				notification(data.status, data.message);
			}
		}, 'JSON');
		return false;
	});

	/* Отметить файл как основной */
	$('.file').on('change', 'input[name^="file_main_"]', function(){
		var t = $(this);
		$('.loading').addClass('d-lg-block');
		$.post('/esup/files/set_main', { id: t.attr('data-file-id'), item_id: t.attr('data-item-id'), group_name: t.attr('data-item-group-name') }, function(data){
			$('.loading').removeClass('d-lg-block');
			if (data.status == 'error') {
				notification(data.status, data.message);
			}
		}, 'JSON');
	});

	/* Повернуть файл */
	$('.file').on('click', '.rotate', function(){
		var t = $(this);
		$('.loading').addClass('d-lg-block');
		$.post(t.attr('href'), { degrees: t.attr('data-degrees') }, function(data){
			$('.loading').removeClass('d-lg-block');
			t.parents('.flex_item').find('.rounded').attr('src', t.parents('.flex_item').find('.rounded').attr('src') + '?' + new Date().getTime())
			if (data.status == 'error') {
				notification(data.status, data.message);
			}
		}, 'JSON');
		return false;
	});

	/* Выбор всех дочерних чекбоксов */
	$(document).on('click', '.recursive_checkbox label', function(e) {
	    if (e.shiftKey) {
	    	var checked = $(this).children('input').prop('checked');
	        $(this).parent().find('input').prop('checked', checked);
	    } 
	});

	/* Подтверждение удаления */
	$('.main-list').on('click', 'table a.red-link', function(){
		if ($(this).children('span').is('.octicon-trashcan')) {
			return confirm('Удалить эту запись? (Space - да; Esc - нет)');
		};
	});

	/* Множественный выбор элементов */
	$('.main-list').on('change', '.multiple-select-all', function(){
		var t = $(this);
		if (t.prop('checked')) {
			t.parents('table').find('.multiple-item').prop('checked', true);
			$('.multiple-delete').prop('disabled', false);
		} else {
			t.parents('table').find('.multiple-item').prop('checked', false);
			$('.multiple-delete').prop('disabled', true);
		}
	});

	$('.main-list').on('change', '.multiple-item', function(){
		var t = $(this);
		if (t.parents('table').find('.multiple-item:checked').length > 0) {
			$('.multiple-delete').prop('disabled', false);
		} else {
			$('.multiple-select-all').prop('checked', false);
			$('.multiple-delete').prop('disabled', true);
		}
	});

	$('.main-list').on('submit', '.multiple-form', function(){
		if (confirm('Подтвердите действие. (Space - да; Esc - нет)') == false) return false;
		var t = $(this),
			ids = '';
		t.parents('.main-list').find('input.multiple-item:checked').each(function(key, item){
			ids = ids + $(item).val() + ',';
		})
		t.find('input[name="items"]').val(ids);
	});

	/* Tooltip */
	$('[data-toggle="tooltip"]').tooltip();

	/* Select2 init */
	$('.filter-select2, .form-select2').select2({
		allowClear: true,
		theme: 'bootstrap',
		width: '100%',
		templateResult: function(data){
			var element = $(data.element),
				wrapper = $('<span></span>');
			if (element == false) {
				return data.text;
			}
			wrapper.css('padding', element.css('padding'));
			wrapper.text(data.text);
			return wrapper;
		}
	}).on('select2:select', function (e) {
		if (e.params.data.element.value == '') {
			return false;
		}
  		//console.log(e.params.data.element.value)
	});

	/* Toggle filters */
	$(document).on('click', '.filter-list .card-header', function(){
		var t = $(this);
		t.next().slideToggle(200);
	});

	/* Copy to clipboard */
	$('table').on('click', '.copy-to-clipboard', function(){
		var t = $(this),
			tmp = $('<input>');
		$('body').append(tmp);
		tmp.val(t.prev().text()).select();
		document.execCommand('copy');
		tmp.remove();
		return false;
	});
});

function notification(status, message) {
	noty({
		text: message,
		type: (status == 'ok') ? 'success' : 'error',
		theme: 'bootstrapTheme',
		layout: 'topCenter',
		timeout: 2000,
		progressBar: false,
		animation: {
			open: 'animated fadeIn',
			close: 'animated fadeOut'
		}
	});
	if (status == 'error') {
		console.error(message);
	} else {
		console.log(message);
	}
}