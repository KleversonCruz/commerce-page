export default function ImageHero() {
    return (
        <div className="relative ">
            <div className="absolute inset-0">
                <img
                    className="h-full w-full object-cover rounded-md"
                    src="https://savoy.nordicmade.com/wp-content/uploads/2015/08/slider-basket-alt.jpg"
                    alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-warmGray-700 to-warmGray-400 mix-blend-multiply rounded-md" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-24 lg:px-8">
                <div className="container mx-auto">
                    <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
                        <h1 className="text-white text-2xl my-4">A coleção verão inverno chegou pra te arrasar, vai ficar de fora dessa puta?</h1>
                        <a className="text-th-accent-medium text-xl inline-block leading-relaxed hover:text-th-accent-dark" href="#">Ver coleção</a>
                    </div>
                </div>
            </div>
        </div>
    )
}