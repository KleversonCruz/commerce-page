import Container from "./container";
import Navbar from '@components/navigation/navbar'
import Loader from "./loader";
import PageHead from "./pageHead";
import Footer from "@components/navigation/footer";
import ShoppingCartModal from "@components/Overlays/shoppingCartModal";

export default function Shell(props) {
    return (
        <>
            <PageHead title={props.title} />
            <Loader>
                <div className="flex flex-col min-h-screen
                bg-gray-50 dark:bg-warmGray-900 text-gray-900 dark:text-gray-100"
                >
                    <Navbar />
                    <div className="flex-grow">
                        <Container title={props.title}>
                            {props.children}
                        </Container>
                    </div>
                    <Footer />
                </div>

                <ShoppingCartModal />
            </Loader>
        </>
    )
}
