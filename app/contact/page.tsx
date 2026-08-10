"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";



export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert("Message sent! (Demo)");
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="min-h-screen bg-[#CAC6CE] px-6 py-12">
            {/* BACK */}
            <Link
                href="/"
                className="text-[#242038] font-medium hover:text-[#9E5677] transition"
            >
                ← Back to Home
            </Link>

            {/* HEADER */}
            <div className="text-center mt-12 mb-16">
                <h1
                    className="text-6xl text-[#242038] mb-4"
                    style={{
                        fontFamily: "Georgia, serif",
                        fontWeight: "300",
                        letterSpacing: "0.15em",
                    }}
                >
                    CONTACT
                </h1>
                <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-[#B56C8C] to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* INFO */}
                <div className="space-y-6">
                    <h2
                        className="text-2xl text-[#242038]"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Get in Touch
                    </h2>

                    {[
                        {
                            label: "Email",
                            value: "spencerbowden337@gmail.com",
                            href: "mailto:spencerbowden337@gmail.com",
                        },
                        {
                            label: "Phone",
                            value: "(513)503-9631",
                            href: "tel:15135039631",
                        },
                        {
                            label: "GitHub",
                            value: "github.com/bowdensw",
                            href: "https://github.com/bowdensw",
                        },
                        {
                            label: "LinkedIn",
                            value: "linkedin.com/in/spencer-bowden-93b2b8254",
                            href: "https://www.linkedin.com/in/spencer-bowden-93b2b8254/",
                        },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="
        block bg-white rounded-md p-6
        shadow-md hover:shadow-xl
        transition-all duration-300
        border-l-4
        hover:-translate-y-1
      "
                            style={{ borderColor: "#B56C8C" }}
                        >
                            <p className="text-xs uppercase tracking-widest text-[#9E5677] mb-1">
                                {item.label}
                            </p>
                            <p className="text-lg text-[#242038] underline decoration-transparent hover:decoration-[#B56C8C] transition">
                                {item.value}
                            </p>
                        </a>
                    ))}
                </div>


                {/* FORM */}
                <div
                    className="bg-white rounded-md shadow-lg p-8"
                    style={{ borderTop: "4px solid #B56C8C" }}
                >
                    <h2
                        className="text-2xl mb-6 text-[#242038]"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Send a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {["name", "email", "subject"].map((field) => (
                            <input
                                key={field}
                                name={field}
                                placeholder={field.toUpperCase()}
                                value={(formData as any)[field]}
                                onChange={handleChange}
                                required
                                className="
                  w-full px-4 py-3 rounded-md
                  border border-gray-300
                  focus:outline-none
                  focus:border-[#B56C8C]
                  placeholder-gray-400
                "
                            />
                        ))}

                        <textarea
                            name="message"
                            placeholder="MESSAGE"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="
                w-full px-4 py-3 rounded-md
                border border-gray-300
                focus:outline-none
                focus:border-[#B56C8C]
                resize-none placeholder-gray-400
              "
                        />

                        <button
                            type="submit"
                            className="
                w-full py-3 rounded-md font-medium tracking-wide
                text-[#242038]
                bg-[#B56C8C]
                hover:bg-[#9E5677]
                hover:text-white
                transition
              "
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
