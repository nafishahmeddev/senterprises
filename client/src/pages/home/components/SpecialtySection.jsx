import Each from "@app/components/Each";

export default function SpecialtySection() {
    return (
        <section className="bg-white py-20">
            <div className="container px-3 mx-auto">
                <h3 className="text-center text-3xl font-medium">Our Specialties</h3>

                <div className="flex gap-10 mt-10 flex-col md:flex-row">
                    <Each
                        items={["Air Ticket", "Train Ticket", "Money Receive"]}
                        render={(item, index) => (
                            <div className="flex-1 bg-center bg-cover aspect-video overflow-hidden hover:scale-105 transition-all cursor-pointer" style={{ backgroundImage: `url(https://picsum.photos/1080/720?id=${index})` }}>
                                <div className="p-3 flex gap-5 items-center justify-center flex-col h-full w-full bg-black/30">
                                    <h4 className="text-center text-2xl text-white font-medium">{item}</h4>
                                </div>
                            </div>
                        )} />
                </div>
            </div>
        </section>
    )
}