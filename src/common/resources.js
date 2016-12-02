/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-13
 */
import genResource, { setApiPrefix } from 'angular-es-utils/rs-generator';

setApiPrefix(process.env.API_DOMAIN);

export const MenuResource = genResource('/menus');
export const ShopResource = genResource('/shops');
export const GridResource = genResource('/pages/1');
