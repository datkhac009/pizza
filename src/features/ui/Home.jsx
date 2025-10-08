import CreateUser from "../user/CreateUser";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold  max-sm:text-yellow-500 leading-[2.75rem]
       max-md:text-2xl max-sm:text-lg max-[430px]:text-sm">
        The best pizza.
        <br />
        <span className="text-yellow-500 max-sm:text-black 
        max-sm:font-bold max-md:text-2xl max-sm:text-lg max-[430px]:text-sm">

        Straight out of the oven, straight to you.
        </span>
        <div>
          <CreateUser />
        </div>
      </h1>
    </div>
  );
}

export default Home;
