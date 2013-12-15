BeaconEgg
=========

beaconegg.jsは、専用のiOSアプリ「BeaconEgg」と連携して、iBeaconをWebから利用するためのjavascriptライブラリです。

# Download

* [beaconegg.js version 0.1](https://raw.github.com/adhr/BeaconEgg/master/beaconegg.js)
* [beaconegg.min.js version 0.1](https://raw.github.com/adhr/BeaconEgg/master/beaconegg.min.js)

# Usage

```html
<script src="beaconegg.min.js"></script>
```
# Example

```javascript
 var be     = new adhr.BeaconEgg,
     region = new adhr.Region('id', 'uuid');

 /**
  * iBeaconと接続が完了した時のイベント
  */
 be.addEventListener(adhr.BeaconEgg.EVENT_ENTER_REGION, function(region) {
     alert('Enter Region!!')
 });

 /**
  * iBeaconと接続が終了した時のイベント
  */
 be.addEventListener(adhr.BeaconEgg.EVENT_EXIT_REGION, function(region) {
     alert('Exit Region!!')
 });

 /**
  * iBeaconから定期的に送信されるデータの受信イベント
  */
 be.addEventListener(adhr.BeaconEgg.EVENT_RENGE, function(beacons) {
     var beacon = beacons[0];
     switch(true) {
     case beacon.isImmediate():
         alert('immediate');
         break;
     case beacon.isNear():
         alert('near');
         break;
     case beacon.isFar():
         alert('far');
         break;
     case beacon.isUnKnown():
         alert('un known');
         break;
     default:
     }
 });

 /**
  * モニタリングスタート
  */
 be.startMonitoring(region);
```
