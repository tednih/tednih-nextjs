import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "../app/home.css";

export default function Home() {
  return (
    <>
      <div className=" bg-space lg:max-w-[1440px] h-auto m-auto bg-zinc-100 dark:bg-zinc-900 ">
        <Navbar />

        <section>
          <div className="p-8 md:p-12 lg:px-16 lg:py-24 hover:cursor-default">
            <div className="mx-auto max-w-lg text-center mt-20">
              <h2 className="text-2xl text-gray-900 dark:text-white font-bold md:text-3xl">
                Hello, I'm Dhimas{" "}
                <span className="inset-1 hover:-inset-0 hover:bg-transparent bg-violet-600 relative">
                  Ted
                </span>
                dy S
              </h2>

              <p className="text-gray-700 dark:text-gray-100 mt-8 mb-40">
                I'm a software engineer for now focused on frontend developer. I
                have a passion for solving problem and excited to learn new
                things.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
