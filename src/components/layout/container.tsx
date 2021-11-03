export default function Container(props) {
  return (
    <>
      <main className="overflow-y-auto focus:outline-none">
        <div className=" pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {props.children ? (
              props.children
            ) : (
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
