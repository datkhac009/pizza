import { useLoaderData } from "react-router-dom";
import { getMenu } from "../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <>
      <div className="mx-auto mb-8 grid w-[40%] max-w-5xl  grid-cols-1 gap-x-9 gap-y-4 p-10 max-sm:w-[80%] sm:w-[70%] md:w-[60%] md:grid-cols-2 lg:w-[50%]">
        {menu.map((value, index) => {
          return (
            <div key={index} className="mb-4 rounded-md shadow-lg">
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
