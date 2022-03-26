export default function DashboardHeader() {
  return (
    <div className="p-5 text-white bg-blue-500">
      <div className="text-4xl font-bold tracking-wider text-center">
        <a href="#">
          <h1 className="font-bitlyTitle text-6xl p-5 text-center hover:animate-bounce">
            ⚽ Bitly Ball
          </h1>
        </a>
      </div>

      <p className="font-normal text-justify text-gray-100">
        Verse your friends and get points for finding a{" "}
        <a href="https://bit.ly" className="underline">
          bit.ly/
        </a>{" "}
        url that does not 404!
      </p>

      <p className="my-2 font-normal text-justify text-gray-100">
        Earn points per character in your bitly phrase. If you 404 then those
        points get deducted.
      </p>
    </div>
  );
}
