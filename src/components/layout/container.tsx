import Footer from "@components/navigation/footer";

export default function Container(props) {
  return (
    <>
      <main className="flex-1 relative overflow-y-auto focus:outline-none mt-16">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              {props.children ? (
                props.children
              ) : (
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
