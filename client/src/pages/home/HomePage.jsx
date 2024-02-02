import { Helmet } from "react-helmet";
import BottomSection from "./components/BottomSection";
import HeroSection from "./components/HeroSection";
import SpecialtySection from "./components/SpecialtySection";

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Samima Enterprises - Your Gateway to Seamless Travel and International Money Transactions</title>
                <meta name="description" content="Explore the world with ease through Samima Enterprises! We specialize in hassle-free flight and train ticket bookings, ensuring smooth journeys. Additionally, simplify your international money transactions with our reliable services. Discover convenience and reliability in every click with Samima Enterprises." />
                <meta name="keyword" content="Flight ticket booking, train ticket reservation, international money transfers, travel services, online ticketing, Samima Enterprises, seamless journeys, reliable money transactions." />
            </Helmet>
            <HeroSection />
            <SpecialtySection />
            <BottomSection />
        </>
    )
}