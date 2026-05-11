import React from 'react';
import { motion } from 'framer-motion';
import profile from '../../data/profile';
import { Mail, Phone, MapPin, Download } from 'lucide-react';

export default function ProfileSection() {
    return (
        <section id="profile" className="py-32 relative">
            <div className="max-w-5xl mx-auto px-6">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary text-xs uppercase tracking-widest">
                        Profil
                    </span>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4">
                        Mon <span className="text-primary">profil</span>
                    </h2>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-2xl p-8"
                >

                    {/* Name & Role */}
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold">{profile.name}</h3>
                        <p className="text-muted-foreground">{profile.role}</p>
                        <p className="text-primary mt-2">{profile.stack}</p>
                    </div>

                    {/* Info grid */}
                    <div className="grid md:grid-cols-3 gap-6 text-center">

                        <div className="flex flex-col items-center gap-2">
                            <Mail className="text-primary" />
                            <p className="text-sm">{profile.email}</p>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <Phone className="text-primary" />
                            <p className="text-sm">{profile.phone}</p>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <MapPin className="text-primary" />
                            <p className="text-sm">{profile.location}</p>
                        </div>
                    </div>

                    {/* CV Button */}
                    <div className="mt-10 text-center">
                        <a
                            href={profile.links.cv}
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition"
                        >
                            <Download className="w-4 h-4" />
                            Télécharger mon CV
                        </a>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}