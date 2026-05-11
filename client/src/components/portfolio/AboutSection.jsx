import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Users } from 'lucide-react';

const stats = [
    { icon: Code2, value: '2024-2026', label: "DEC Informatique" },
    { icon: Rocket, value: '4', label: 'Projets academiques' },
    { icon: Users, value: 'Agile', label: 'Travail en equipe' },
    { icon: Palette, value: 'Full Stack', label: 'Objectif de stage' },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-primary text-xs font-inter tracking-widest uppercase">À propos</span>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4 leading-tight">
                            Passionné par le
                            <br />
                            <span className="text-primary">design & le code</span>
                        </h2>
                        <div className="mt-8 space-y-5 text-muted-foreground font-inter leading-relaxed">
                            <p>
                                Étudiante en Techniques de l’informatique au Collège LaSalle,
                                je suis passionnée par le développement web, les applications
                                modernes et les nouvelles technologies. J’aime créer des projets
                                interactifs qui combinent design, performance et expérience utilisateur.
                            </p>

                            <p>
                                J’ai réalisé plusieurs projets en React, Java, Python, SQL et Swift,
                                incluant des applications web, mobiles et des systèmes de gestion.
                                Je suis actuellement à la recherche d’un stage en développement
                                full-stack afin de développer davantage mes compétences et acquérir
                                une expérience professionnelle concrète.
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="inline-block mt-8 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-inter text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300"
                        >
                            Travaillons ensemble
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="grid grid-cols-2 gap-5"
                    >
                        {stats.map(({ icon: Icon, value, label }, idx) => (
                            <div
                                key={label}
                                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="font-playfair text-3xl font-bold text-foreground">{value}</div>
                                <div className="text-muted-foreground text-sm font-inter mt-1">{label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}