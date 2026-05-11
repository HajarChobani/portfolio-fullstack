import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/profile';

const categories = ['Tous', 'Web', 'Mobile', 'Desktop', 'Database'];

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState('Tous');

    const filteredProjects =
        activeFilter === 'Tous'
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className="py-32">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-10">
                    <span className="text-primary text-xs font-inter tracking-widest uppercase">
                        Projets
                    </span>

                    <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4">
                        Mes <span className="text-primary">projets</span>
                    </h2>

                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Voici quelques projets realises durant ma formation en Techniques
                        de l'informatique.
                    </p>
                </div>

                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-2 rounded-full border text-sm transition ${
                                activeFilter === cat
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border text-muted-foreground hover:text-primary hover:border-primary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}