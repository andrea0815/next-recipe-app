export default function LoaderDots() {
    return (
        <span
            className="
        relative block w-6 h-6 my-3.75 mx-auto box-border rounded-full animate-spin

        before:content-[''] before:absolute before:top-0 before:right-0
        before:w-3 before:h-3 before:box-border before:rounded-full
        before:bg-gray-400 before:translate-x-1/2 before:translate-y-full

        after:content-[''] after:absolute after:top-0 after:left-0
        after:w-3 after:h-3 after:box-border after:rounded-full
        after:bg-gray-500 after:-translate-x-1/2 after:translate-y-1/2
      "
        />
    );
}