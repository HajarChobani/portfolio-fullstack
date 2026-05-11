import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: 'Langages',
        skills: [
            { name: 'Java', level: 80 },
            { name: 'Python', level: 75 },
            { name: 'JavaScript', level: 75 },
            { name: 'C# / ASP.NET Core', level: 70 },
            { name: 'PHP', level: 65 },
            { name: 'Swift', level: 65 },
        ],
    },
    {
        title: 'Frontend',
        skills: [
            { name: 'React', level: 75 },
            { name: 'HTML / CSS', level: 80 },
            { name: 'Responsive Design', level: 75 },
            { name: 'Tailwind CSS', level: 70 },
        ],
    },
    {
        title: 'Backend & Bases de donnees',
        skills: [
            { name: 'Flask', level: 75 },
            { name: 'MySQL', level: 75 },
            { name: 'SQL Server', level: 70 },
            { name: 'SQLite', level: 75 },
            { name: 'Oracle / PL-SQL', level: 65 },
        ],
    },
    {
        title: 'Outils & Methodes',
        skills: [
            { name: 'Git / GitHub', level: 80 },
            { name: 'Visual Studio', level: 75 },
            { name: 'WebStorm', level: 75 },
            { name: 'Eclipse', level: 70 },
            { name: 'Xcode', level: 65 },
            { name: 'Agile / MVC / POO', level: 75 },
        ],
    },
];

function SkillBar({ name, level, delay }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-inter text-foreground">{name}</span>
                <span className="text-xs font-inter text-muted-foreground">{level}%</span>
            </div>

            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                />
            </div>
        </div>
    );
}

export default function SkillsSection() {
    return (
        <section id="skills" className="py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-xs font-inter tracking-widest uppercase">
                        Competences
                    </span>

                    <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4">
                        Technologies & <span className="text-primary">outils</span>
                    </h2>

                    <p className="mt-4 text-muted-foreground font-inter max-w-xl mx-auto">
                        Mes competences principales en developpement web, programmation,
                        bases de donnees et outils de travail.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                            className="bg-card border border-border rounded-2xl p-8 hover:border-primary/20 transition-all duration-500"
                        >
                            <h3 className="font-playfair text-xl font-semibold text-foreground mb-6">
                                {category.title}
                            </h3>

                            <div className="space-y-5">
                                {category.skills.map((skill, skillIdx) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        level={skill.level}
                                        delay={catIdx + skillIdx}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}