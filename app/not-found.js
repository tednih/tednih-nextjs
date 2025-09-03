export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center animate-fadeIn">
        <img
          src="https://yemca-services.net/404.png"
          alt="404 Illustration"
          className="mx-auto w-80 animate-[float_3s_infinite]"
        />
        <h1 className="text-7xl font-extrabold text-headline dark:text-darkheadline mt-6">
          Looks Like You're Lost!
        </h1>
        <p className="text-xl text-text dark:text-darktext mt-2">
          We can't seem to find the page you're looking for.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-button text-text dark:text-darktext px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-button/60"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
