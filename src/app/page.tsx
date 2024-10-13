import { ContactForm } from "@/components/custom/ContactFrom";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center items-center">
        <h2 className="text-center font-bold text-4xl text-[#9333ea] scroll-m-20 border-b pb-2  tracking-tight first:mt-0">
          Contact From Next.js
        </h2>
      </div>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image
                alt=""
                fill
                src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className=" inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
