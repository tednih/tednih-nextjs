export const metadata = {
  title: "Home | Tednih",
};

export default function Home() {
  return (
    <>
      <div className="flex justify-center h-screen items-center bg-zinc-100 dark:bg-zinc-900">
        <section>
          <div className="mx-auto lg:max-w-lg max-w-sm text-center hover:cursor-default">
            <h2 className="text-2xl text-gray-900 dark:text-white font-bold md:text-3xl">
              Hello, I'm Dhimas <span className="underline">Ted</span>
              dy S
            </h2>

            <p className="text-gray-700 dark:text-gray-100 mt-8">
              I'm a software engineer for now focused on frontend developer. I
              have a passion for solving problem and excited to learn new
              things.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
