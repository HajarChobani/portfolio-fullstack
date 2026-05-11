import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import profile from '../../data/profile';

const socialLinks = [
    { icon: Github, href: profile.links.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
];

export default function Footer() {
    return (
        <footer className="border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-inter text-center">
                        <span>
                            © {new Date().getFullYear()} {profile.name}. Fait avec
                        </span>

                        <Heart className="w-3.5 h-3.5 text-primary fill-primary" />

                        <span>
                            React, Node.js et Socket.IO.
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target={label === 'Email' ? undefined : '_blank'}
                                rel={label === 'Email' ? undefined : 'noreferrer'}
                                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                                aria-label={label}
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}