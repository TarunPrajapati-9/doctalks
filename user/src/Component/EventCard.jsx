

export default function EventCard() {
    return (
        <div className=''>

            <div className="px-4 md:px-8 py-12 bg-gray-100 rounded-lg shadow-2xl max-w-xl">

                <h1 className="text-lg mb-4">
                   1 Am to 2 Am  22/3/2024
                    <br></br>
                    <span className="text-4xl font-semibold">  cold disscusion </span>
                    <span className="text-4xl font-semibold text-blue-700">Book?</span>
                    <br></br>
                 
                </h1>

                <div className="flex flex-col justify-center w-full text-center mt-8 gap-6 sm:flex-row text-lg font-semibold">
                    <a href="https://tailwindflex.com/@amit"
                        className="py-4 w-full sm:w-40 border border-blue-700 rounded-lg hover:shadow-2xl hover:text-blue-700 shadow-lg">
                        99
                    </a>
                    <a href="https://tailwindflex.com"
                        className="bg-blue-600 w-full sm:w-40 py-4 rounded-lg text-white hover:bg-blue-700 shadow-lg">
                        Book Now
                    </a>
                </div>
                
                

            </div>
        </div>
    )
}
