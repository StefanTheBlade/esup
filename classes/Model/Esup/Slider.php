<?php defined('SYSPATH') or die('No direct script access.');
 
class Model_Esup_Slider extends Model_Esup {

	protected $_table_name = 'slider';
	protected $_belongs_to = array(
		'page' => array(
			'model' => 'Esup_Page',
			'foreign_key' => 'page_id',
		)
	);
	protected $_has_many = array(
		'files' => array(
			'model'  => 'Esup_Common_File',
			'foreign_key' => 'item_id'
		),
	);

	public $options = array(
		'fields' => array(
            'active' => array(
                'label' => 'Активен',
                'type' => 'checkbox',
                'default' => TRUE
            ),
			'title' => array(
				'label' => 'Заголовок',
				'type' => 'text',
				'translate' => TRUE
			),
			'text' => array(
				'label' => 'Текст',
				'type' => 'textarea',
				'translate' => TRUE
			),
			'page_id' => array(
				'type' => 'select2',
				'model' => 'Esup_Page',
				'render' => array(
					'title' => 'Привязать к странице',
					'title_field' => 'title',
					'value_field' => 'id',
					'order_field' => 'sort',
					'order_direction' => 'ASC'
				)
			),
			'link' => array(
				'type' => 'text',
				'label' => 'Ссылка',
				'transliterate' => array(
					'from_field' => 'title'
				)
			)
		),
		'files' => array(
			'slider_image' => array(
				'label' => 'Изображение',
				'thumbnails' => array(
					'1366x768' => array(
						'w' => 1366,
						'h' => 768,
						'background' => array(
							'color' => '#F1F1F1'
						)
					),
				),
				'esup_thumbnail' => '1366x768',
				/*'multiple' => TRUE,*/
				/* Aspect ratio example options */
				'ar_width' => '16',
				'ar_height' => '9'
			)
		),
		'filters' => array(
			'search_query' => array(
				'type' => 'text',
				'fields' => array('title', 'link'), // Может быть массивом, например: array('title', 'text')
				'render' => array(
					'title' => 'Поиск'
				)
			)
		),
		'render' => array(
			'list' => array(
				'marker_header' => 'Заголовок',
				'marker_field' => 'title',
				'sort' => array(
					'field' => 'sort',
					'order' => 'ASC'
				)
			),
			'form' => TRUE,
			'title' => 'Слайдер',
			'link' => 'slider'
		)
	);

}