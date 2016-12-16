/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-13
 */
import genResource, { setApiPrefix } from 'angular-es-utils/rs-generator';

// 根据 bundler 中配置的参数设置请求域名前缀
setApiPrefix(process.env.API_DOMAIN);

export const MenuResource = genResource('/menus');
export const ShopResource = genResource('/shops');
export const GridResource = genResource('/pages/1');
