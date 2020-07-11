import UserEffects from './user.effects';
import AdminEffects from './admin.effects';
import ProductsEffects from './products.effects';
import ProductNodesEffects from './product-nodes.effects';
import ProductAssetsEffects from './product-assets.effects';
import SelectorsEffects from './selectors.effects';
import TagsEffects from './tags.effects';
import MenuNodesEffects from './menu-nodes.effects';
import AssetsEffects from './assets.effects';

const rootEffects = [
  UserEffects,
  AdminEffects,
  MenuNodesEffects,
  ProductNodesEffects,
  ProductsEffects,
  SelectorsEffects,
  TagsEffects,
  AssetsEffects,
  ProductAssetsEffects,
];
export default rootEffects;
