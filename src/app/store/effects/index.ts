import UserEffects from './user.effects';
import AdminEffects from './admin.effects';
import ProductsEffects from './products.effects';
import SelectorsEffects from './selectors.effects';
import TagsEffects from './tags.effects';
import MenuNodesEffects from './menu-nodes.effects';

const rootEffects = [
  UserEffects,
  AdminEffects,
  MenuNodesEffects,
  ProductsEffects,
  SelectorsEffects,
  TagsEffects,
];
export default rootEffects;
