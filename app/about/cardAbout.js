import Image from "next/image";
import React from "react";

const cardAbout = () => {
  return (
    <div className="lg:flex block justify-between m-auto sm:m-5 space-y-5 lg:space-y-0 xl:space-y-0">
      <div className="animate__animated animate__backInUp bg-zinc-200 mt-0 dark:bg-zinc-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm lg:max-w-[800px] md:max-w-[500px] max-w-[430px] m-auto rounded-xl items-center gap-4 p-10">
        <Image
          alt=""
          src="/3dimage.png"
          width={300}
          height={300}
          className="w-full h-full object-cover sm:h-full "
        />
      </div>
      <div className="m-auto mb-5">
        <div className="animate__animated animate__backInRight bg-zinc-200 dark:bg-zinc-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm xl:max-w-[750px] lg:max-w-[380px] md:max-w-[500px] max-w-[430px] m-auto rounded-xl items-center gap-4 p-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            About Me
          </h2>

          <p className="text-gray-500 dark:text-gray-300 md:mt-4 md:block">
            Hello! I'm Freshgraduate Bachelor System Information. My skill is
            web Development, especially front-end . I also graduated from VHS
            with a major in software engineering, attended a bootcamp, and
            online classes about web developers. With this, I am quite familiar
            with coding or other things in the IT world.
          </p>
        </div>
        <div className="mt-5 animate__animated animate__backInRight bg-zinc-200 dark:bg-zinc-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm xl:max-w-[750px] lg:max-w-[380px] md:max-w-[500px] max-w-[430px] m-auto rounded-xl items-center gap-4 p-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Skills
          </h2>
          <div className="block">
            <h4 className="text-xl text-gray-900 dark:text-white">
              Programming language
            </h4>
            <div className="flex flex-wrap items-center gap-5">
              <div className="mr-5">
                <Image
                  alt="HTML"
                  src="/html.png"
                  width={50}
                  height={50}
                  className=" h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="CSS"
                  src="/css.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="JavaScript"
                  src="/js.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="C#"
                  src="/c.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="PHP"
                  src="/php.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="SQL"
                  src="/sql.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="block my-5">
            <h4 className="text-xl text-gray-900 dark:text-white">Framework</h4>
            <div className="flex flex-wrap items-center gap-5">
              <div className="mr-5">
                <Image
                  alt="React"
                  src="/react.png"
                  width={50}
                  height={50}
                  className="h-15 w-15 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="Net MVC"
                  src="/net-mvc.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="Codeigniter"
                  src="/codeigniter.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="Next JS"
                  src="/nextjs.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="Tailwind"
                  src="/tailwind.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="Bootstrap"
                  src="/bootstrap.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>

              <div className="mr-5">
                <Image
                  alt="MYSQL"
                  src="/mysql.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
              <div className="mr-5">
                <Image
                  alt="MYSQL"
                  src="/sqlserver.png"
                  width={50}
                  height={50}
                  className="h-15 w-20 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cardAbout;
