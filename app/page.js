export const metadata = {
  title: "Home | Tednih.",
};

export default function Home() {
  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <section>
          <div className="mx-auto lg:max-w-lg max-w-sm text-center hover:cursor-default">
            <h2 className="animate__animated animate__backInLeft text-2xl text-headline dark:text-darkheadline font-bold md:text-3xl">
              Hello, I'm Dhimas <span className="underline">Ted</span>
              dy S
            </h2>

            <p className="animate__animated animate__backInRight text-text dark:text-darktext mt-8">
              I'm a IT Developer for now focused on SAP S/4HANA ABAPER. I have a
              passion for solving problem and excited to learn new things. I
              also have experience in Fullstack Developer.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
