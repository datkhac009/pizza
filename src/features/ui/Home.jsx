import CreateUser from "../user/CreateUser";

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold  max-sm:text-yellow-500">
        The best pizza.
        <br />
        <span className="text-yellow-500 max-sm:text-black max-sm:font-bold sm:text-lg">

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
