<?php
namespace sevikon\ajaxSearch;

use yii\base\Widget;

class NotificationsWidget extends Widget
{
    public $type='post';
    public $url='/site/notifications';
    public $extra=null;
    public $height=250;
    public $id='notification-widget';
    public $urlFresh = '/site/notifications/fresh';
    public $urlSeenAll = '/site/notifications/seen-all';
    public $fresh=0;

    public function run()
    {
        $this->registerAssetBundle();
        return $this->render('@vendor/sevikon/yii2-ajax-search/views/notification',[
            'urlFresh'=>$this->urlFresh,
            'urlSeenAll'=>$this->urlSeenAll,
            'id'=>$this->id,
            'url'=>$this->url,
            'type'=>$this->type,
            'height'=>$this->height,
            'extra'=>$this->extra,
            'fresh'=>$this->fresh
        ]);
    }

    private function registerAssetBundle(){
        $view = $this->getView();
        NotificationAsset::register($view);
        SlimScrollAsset::register($view);
    }
}