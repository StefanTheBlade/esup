<h3 class="main_header">
	<?php echo $model->options['render']['title'] ?> — добавление
	<a href="/esup/<?php echo $model->options['render']['link'].$url_query ?>">Назад к списку</a>
</h3>
<form role="form" action="/esup/<?php echo $model->options['render']['link'] ?>/add" enctype="multipart/form-data" method="post" id="main_form">
	<ul class="nav nav-tabs">
		<li class="nav-item"><a class="nav-link active" href="#main" data-toggle="tab">Описание</a></li>
	</ul>
	<div class="tab-content">
		<div class="tab-pane active" id="main">
			<div class="form-group row">
				<label for="form_key" class="col-sm-2 control-label">Ключ</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" id="form_key" placeholder="Ключ" name="key">
				</div>
			</div>
			<div class="form-group row">
				<label for="form_title" class="col-sm-2 control-label">Заголовок</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" id="form_title" placeholder="Заголовок" name="title">
				</div>
			</div>
			<div class="form-group row">
				<label for="form_visible_name" class="col-sm-2 control-label">Видимый на сайте заголовок</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" id="form_visible_name" placeholder="Видимый на сайте заголовок" name="visible_name">
				</div>
			</div>
			<div class="form-group row">
				<label for="form_active" class="col-sm-2 control-label">Активен</label>
				<div class="col-sm-10">
					<input type="checkbox" id="form_active" name="active">
				</div>
			</div>
		</div>
	</div>
	<div class="form-group row">
		<div class="offset-sm-2 col-sm-10">
			<?php if (Request::$initial->action() == 'add'): ?>
				<input type="submit" class="btn btn-primary" name="add" value="Добавить">
			<?php else: ?>
				<input type="submit" class="btn btn-primary" name="edit" value="Сохранить">
			<?php endif ?>
			<a href="/esup/<?php echo $model->options['render']['link'].$url_query ?>">
				<input type="button" class="btn" value="Отмена">
			</a>
		</div>
	</div>
</form>