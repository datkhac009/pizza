import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-stone-800">
          Our Menu
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menu.map((value) => {
            return (
              <div key={value.id} className="group">
                <MenuItem pizza={value} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Menu;
