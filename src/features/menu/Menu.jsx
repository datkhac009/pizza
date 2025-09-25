import { useLoaderData } from "react-router-dom";
import { getMenu } from "../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto p-4">

      {menu.map((value, index) => {
        return (
          <div key={index} className="mb-4 shadow-lg rounded-md">
            <MenuItem pizza={value} />
          </div>
        );
      })}
    </div>
     
    </>
  );
}

export async function Loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
