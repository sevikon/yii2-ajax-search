<?php

namespace sevikon\ajaxSearch;

use yii\web\AssetBundle;

class NotificationAsset extends AssetBundle
{
    public $sourcePath = '@vendor/sevikon/yii2-ajax-search/assets/NotificationAsset';
    public $js = [
        'js/notification.js',
    ];
    public function init()
    {
        parent::init();
    }
}
