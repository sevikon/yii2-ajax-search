<?php

namespace sevikon\ajaxSearch;

use yii\web\AssetBundle;

class SearchAsset extends AssetBundle
{
    public $sourcePath = '@vendor/sevikon/yii2-ajax-search/assets/SearchAsset';
    public $js = [
        'js/search.js',
    ];
    public function init()
    {
        parent::init();
    }
}
