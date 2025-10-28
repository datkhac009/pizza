import { getMenu } from "../services/apiRestaurant";

export async function MenuLoader() {
  const menu = await getMenu();
  return menu;
}
