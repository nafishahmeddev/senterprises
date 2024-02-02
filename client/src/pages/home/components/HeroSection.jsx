import LogoImage from "@app/assets/logo.png";
import BannerImage from "@app/assets/banner.jpg";
export default function HeroSection() {
    return (
        <section className="bg-cover bg-top bg-fixed"
            style={{ backgroundImage: `url(${BannerImage})` }}>
            <div className="flex items-center justify-center flex-col text-center gap-14 bg-black/60 min-h-screen">
                <img src={LogoImage} className="w-28" />
                <h3 className="text-xl text-white font-light tracking-widest">WELCOME TO SAMIMA ENTERPRISES</h3>
                <h1 className="text-6xl md:text-7xl font-bold text-white">THE WORLD IS WAITING</h1>
                <button className="p-2 px-12 bg-yellow-700 text-white tracking-widest">EXPLORE MORE</button>
            </div>

        </section>
    )
}