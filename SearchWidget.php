<?php
namespace sevikon\ajaxSearch;

use yii\base\Widget;

class SearchWidget extends Widget
{
    public $placeholder='Search';
    public $type='post';
    public $url='/site/search';
    public $extra=null;
    public $height=250;
    public $id='search-widget';

    public function run()
    {
        $this->registerAssetBundle();
        return $this->render('@vendor/sevikon/yii2-ajax-search/views/search',['id'=>$this->id,'placeholder'=>$this->placeholder,'url'=>$this->url,'type'=>$this->type,'height'=>$this->height,'extra'=>$this->extra]);
    }

    private function registerAssetBundle(){
        $view = $this->getView();
        SearchAsset::register($view);
        SlimScrollAsset::register($view);
    }
}