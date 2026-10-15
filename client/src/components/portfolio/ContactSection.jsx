import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'chobanihajar@gmail.com' },
    { icon: Phone, label: 'Telephone', value: '819 436 2644' },
    { icon: MapPin, label: 'Localisation', value: 'Montreal, Quebec' },
];

export default function ContactSection() {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('success');
    };

    return (
        <section id="contact" className="py-32">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Contact</h2>
                    <p className="text-muted-foreground mt-2">
                        Vous pouvez me contacter pour toute opportunité professionnelle en développement logiciel ou full-stack, ou pour discuter d’une collaboration.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        {contactInfo.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <item.icon className="text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input placeholder="Nom" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border outline-none" />
                        <input placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border outline-none" />
                        <input placeholder="Sujet" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border outline-none" />
                        <textarea placeholder="Message" className="w-full px-4 py-3 rounded-lg bg-secondary border border-border outline-none min-h-[120px]" />

                        <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                            Envoyer
                        </button>

                        {status === 'success' && (
                            <p className="text-green-500 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Message pret a etre envoye.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
