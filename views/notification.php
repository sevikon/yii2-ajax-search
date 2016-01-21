<div class="search_box sevikon_notification" id="<?=$id?>">
    <div class="notification-button" data-url="<?=$url?>" data-type="<?=$type?>" data-height="<?=$height?>" data-extra="<?=$extra?>" data-url-fresh="<?=$urlFresh?>" data-url-seen-all="<?=$urlSeenAll?>">
        <span class="bell-count  <?=$fresh>0?'active':''?>"><?=$fresh?></span><i class="fa fa-bell"></i><span><?=Yii::t('frontend', 'Notifications')?></span>
    </div>
    <div class="results animated">
        <div class="inner small-list">
            <ul>

            </ul>
        </div>
    </div>
</div>