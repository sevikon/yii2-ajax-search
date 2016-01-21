<?php
/**
 * Created by PhpStorm.
 * User: sevikon
 * Date: 10.07.15
 * Time: 23:08
 */

namespace sevikon\ajaxSearch;

use yii\web\AssetBundle;

class SlimScrollAsset extends AssetBundle
{
    public $sourcePath = '@vendor/sevikon/yii2-ajax-search/assets/SlimScrollAsset';
    public $basePath = '@vendor/sevikon/yii2-ajax-search/assets/SlimScrollAsset';
    public $js = [
        'js/jquery.slimscroll.min.js',
    ];
    public function init()
    {
        if (!YII_DEBUG){
            $this->js = ['https://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.6/jquery.slimscroll.min.js'];
        }
        parent::init();
    }
}
