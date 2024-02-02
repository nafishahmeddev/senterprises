import { Icon } from "@iconify/react";
export default function BottomSection() {
    return (
        <section className="bg-blue-950 py-14">
            <div className="container px-3 text-center text-white mx-auto">
                <h3>#THEWORLDISWAITING</h3>
                <p>
                    <span className="text-nowrap">Phone: +918942933882,</span> <span className="text-nowrap">Email : enterprisessamima@gmail.com</span>
                </p>
            </div>


            <div className="flex items-center justify-center gap-4 my-5 absolute top-10 right-10 text-white text-xl">
                <a href=""><Icon icon="ri:facebook-fill" /></a>
                <a href=""><Icon icon="teenyicons:instagram-outline" /></a>
            </div>
        </section>
    )
}