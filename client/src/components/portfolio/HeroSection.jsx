import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import profile from '../../data/profile';

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-inter tracking-widest uppercase mb-8">
                        {profile.role}
                    </span>
                </motion.div>
                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src="/images/profile.jpg"
                    alt="Profile"
                    className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover mx-auto mb-8 border-4 border-primary shadow-2xl"
                />
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
                >
                    {profile.name}
                    <br />
                    <span className="text-primary">Développeur</span>
                    <br />
                    Full Stack
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-inter font-light leading-relaxed"
                >
                    {profile.stack} <br />
                    {profile.availability}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                >
                    <a
                        href="/CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition"
                    >
                        Télécharger mon CV
                    </a>
                </motion.div>

                {/* Social links dynamiques */}
                <motion.div className="mt-12 flex items-center justify-center gap-6">

                    <a href={profile.links.github} target="_blank">
                        <Github />
                    </a>

                    <a href={profile.links.linkedin} target="_blank">
                        <Linkedin />
                    </a>

                    <a href={`mailto:${profile.email}`}>
                        <Mail />
                    </a>

                </motion.div>

                <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                        <span className="text-xs uppercase">Scroll</span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}