import Container from "./container";
import Navbar from '@components/navigation/navbar'
import Loader from "./loader";
import PageHead from "./pageHead";

export default function Shell(props) {
    return (
        <>
            <PageHead title={props.title} />
            <Loader>
                <div className="flex overflow-hidden 
                bg-gray-50 dark:bg-warmGray-900 text-gray-900 dark:text-gray-100"
                >
                    <div className="flex flex-col w-0 flex-1 overflow-hidden">
                        <Navbar />
                        <Container title={props.title}>
                            {props.children}
                        </Container>
                    </div>

                </div>
            </Loader>
        </>
    )
}
