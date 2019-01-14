/**
 * 微信JS接口
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 */

import Wx from './jweixin-1.2.0';

import { AsyncSubject } from 'rxjs';

import JSApis = Wx.JSApis;
import ConfigOptions = Wx.ConfigOptions;
import OnMenuShareAppMessageOptions = Wx.OnMenuShareAppMessageOptions;
import OnMenuShareTimelineOptions = Wx.OnMenuShareTimelineOptions;
import ChooseWXPayOptions = Wx.ChooseWXPayOptions;
import ChooseImageOptions = Wx.ChooseImageOptions;
import UploadImageOptions = Wx.UploadImageOptions;
import GetLocalImgDataOptions = Wx.GetLocalImgDataOptions;
import PreviewImageOptions = Wx.PreviewImageOptions;
import DownloadImageOptions = Wx.DownloadImageOptions;
import ScanQRCodeOptions = Wx.ScanQRCodeOptions;

function getParamsFromUrl(paramStr?) {
  const s = (paramStr || '').split('?');
  if (s.length) {
    paramStr = s[s.length - 1];
    const searchArray = paramStr.split('&');
    const obj: any = {};
    for (const item of searchArray) {
      const keyArray = item.split('=');
      if (keyArray.length > 1 && keyArray[0].length) {
        obj[decodeURIComponent(keyArray[0])] = decodeURIComponent(keyArray[1]);
      }
    }
    return obj;
  }
  return undefined;
}

export const ApiType = {
  CheckJsApi: 'checkJsApi',
  OnMenuShareTimeline: 'onMenuShareTimeline',
  OnMenuShareAppMessage: 'onMenuShareAppMessage',
  OnMenuShareQQ: 'onMenuShareQQ',
  OnMenuShareWeibo: 'onMenuShareWeibo',
  OnMenuShareQZone: 'onMenuShareQZone',
  HideMenuItems: 'hideMenuItems',
  ShowMenuItems: 'showMenuItems',
  HideAllNonBaseMenuItem: 'hideAllNonBaseMenuItem',
  ShowAllNonBaseMenuItem: 'showAllNonBaseMenuItem',
  TranslateVoice: 'translateVoice',
  StartRecord: 'startRecord',
  StopRecord: 'stopRecord',
  OnVoiceRecordEnd: 'onVoiceRecordEnd',
  PlayVoice: 'playVoice',
  OnVoicePlayEnd: 'onVoicePlayEnd',
  PauseVoice: 'pauseVoice',
  StopVoice: 'stopVoice',
  UploadVoice: 'uploadVoice',
  DownloadVoice: 'downloadVoice',
  ChooseImage: 'chooseImage',
  UploadImage: 'uploadImage',
  DownloadImage: 'downloadImage',
  GetNetworkType: 'getNetworkType',
  OpenLocation: 'openLocation',
  GetLocation: 'getLocation',
  HideOptionMenu: 'hideOptionMenu',
  ShowOptionMenu: 'showOptionMenu',
  CloseWindow: 'closeWindow',
  ScanQRCode: 'scanQRCode',
  ChooseWXPay: 'chooseWXPay',
  OpenProductSpecificView: 'openProductSpecificView',
  AddCard: 'addCard',
  ChooseCard: 'chooseCard',
  OpenCard: 'openCard'
};

export const WxJsSdkConfig = {
  appId: '',
  openId: ''
};

export const ConfigObservable = new AsyncSubject();

export function Config(options: ConfigOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    options.jsApiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard',
      'getLocalImgData'
    ];
    Wx.config(options);
    Wx.ready(() => {
      resolve();
      ConfigObservable.next(true);
      ConfigObservable.complete();
    });
    Wx.error((error) => {
      reject(error);
      ConfigObservable.error(error);
    });
  });
}

export function CheckJsApi(jsApiList: JSApis[]) {
  return new Promise((resolve, reject) => {
    if (navigator.userAgent.indexOf('MicroMessenger') < 0) {
      reject(new Error('请在微信中打开'));
    }
    Wx.checkJsApi({
      jsApiList,
      success(res) {
        resolve(res);
      },
      fail(error) {
        reject(error);
      },
      complete(res) {
        // console.log('');
      },
      cancel(res) {
        resolve();
      }
    });
  });
}

export function OnMenuShareAppMessage(options: OnMenuShareAppMessageOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['onMenuShareAppMessage'])
      .then(() => {
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = (res) => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.onMenuShareAppMessage(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function OnMenuShareTimeline(options: OnMenuShareTimelineOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['onMenuShareTimeline'])
      .then(() => {
        options.complete = (res) => {
          resolve(res);
        };
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = (res) => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.onMenuShareTimeline(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function ChooseWXPay(options: ChooseWXPayOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['chooseWXPay'])
      .then(() => {
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = () => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.chooseWXPay(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function ChooseImage(options: ChooseImageOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['chooseImage'])
      .then(() => {
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = () => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.chooseImage(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function UploadImage(options: UploadImageOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['uploadImage'])
      .then(() => {
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = () => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.uploadImage(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function PreviewImage(options: PreviewImageOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['previewImage'])
      .then(() => {
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = () => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.previewImage(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function ScanQRCode(options: ScanQRCodeOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['scanQRCode'])
      .then(() => {
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = () => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.scanQRCode(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function DownloadImage(options: DownloadImageOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    CheckJsApi(['previewImage'])
      .then(() => {
        options.success = (res) => {
          resolve(res);
        };
        options.cancel = () => {
          resolve();
        };
        options.fail = (error) => {
          reject(error);
        };
        Wx.downloadImage(options);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function GetLocalImgData(
  options: GetLocalImgDataOptions
): Promise<{
  localData: string;
}> {
  return new Promise((resolve, reject) => {
    options.success = (res) => {
      // 安卓拿到的localData不是base64编码的字符串，这里需要重新编码 再加上前缀data:image/jpg;base64
      if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
        res.localData = 'data:image/jpeg;base64,' + res.localData;
      } else if (navigator.userAgent.indexOf('like Mac OS X') > -1) {
        res.localData = res.localData.replace('jgp', 'jpeg');
      }
      resolve(res);
    };
    options.cancel = () => {
      resolve();
    };
    options.fail = (error) => {
      reject(error);
    };
    Wx.getLocalImgData(options);
  });
}

export function Oauth2Redirect(params: {
  appid: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state: string;
}) {
  // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + EncodeSearchParams(params);
}

export function Oauth2Redirect2(
  params: {
    appid: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    state: string;
  },
  update = false
): Promise<{
  code: string;
}> {
  return new Promise<{
    code: string;
  }>((resolve) => {
    const orCode = window.localStorage.getItem('wXOauth2Redirect_OrCode');
    const orPath = window.localStorage.getItem('wXOauth2Redirect_OrPath');
    const urlParams: any = getParamsFromUrl();
    if (update || !urlParams.code) {
      if (!orPath) {
        window.localStorage.setItem('wXOauth2Redirect_OrPath', window.location.href);
        // window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?' + EncodeSearchParams(params));
      } else {
        resolve({
          code: orCode
        });
      }
    } else {
      window.location.replace(orPath);
      window.localStorage.setItem('wXOauth2Redirect_CODE', urlParams.code);
      resolve({
        code: urlParams.code
      });
    }
  });
}
