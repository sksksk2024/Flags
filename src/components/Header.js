import Toggle from "./Toggle"

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between fixed w-full bg-white shadow p-5 dark:bg-gray-800">
        <div>
          <h1 className="font-bold text-gray-900 dark:text-white text-4xl">
            Where in the world?
          </h1>
        </div>

        <div>
          <Toggle />
        </div>
      </header>
    </>
  )
}