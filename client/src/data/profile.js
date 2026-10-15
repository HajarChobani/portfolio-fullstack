const profile = {
    name: "Hajar Chobani",
    role: "Developpeuse Full Stack",
    stack: "React · JavaScript · Java · Python · Flask · SQL",
    availability: "A la recherche d'un stage en developpement full-stack",
    email: "chobanihajar@gmail.com",
    phone: "819-436-2644",
    location: "Montreal, Quebec, Canada",
    links: {
        github: "https://github.com/HajarChobani",
        linkedin: "https://www.linkedin.com/in/hajar-chobani",
        cv: "/images/CV_Hajar_Chobani.pdf",
    },
};

export const projects = [
    {
        id: 1,
        title: "Application Desktop - Gestion Bancaire",
        description: "Application Java permettant de gerer des comptes bancaires, les depots, retraits, transferts et calculs d'interets.",
        impact: "Projet realise avec une approche Agile, POO, connexion base de donnees et tests reguliers.",
        category: "Desktop",
        tags: ["Java", "MySQL", "JDBC", "Eclipse", "POO"],
        github: "https://github.com/HajarChobani/projetJAVA",
        demo: "",
        image: "/images/java-bank.png"
    },
    {
        id: 2,
        title: "Base de Donnees - Gestion Universitaire",
        description: "Conception d'une base de donnees relationnelle pour la gestion universitaire avec requetes SQL et procedures PL/SQL.",
        impact: "Projet centre sur l'analyse des besoins, la modelisation, l'optimisation et les tests SQL.",
        category: "Database",
        tags: ["SQL", "Oracle", "PL/SQL", "Base de donnees"],
        github: "https://github.com/HajarChobani/ProjetSQL",
        demo: "",
        image: "/images/university-database-project.png"
    },
    {
        id: 3,
        title: "Application Web - Gestion des Contacts",
        description: "Application web CRUD pour gerer des contacts et groupes avec Python, Flask et SQLite.",
        impact: "Projet developpe avec backend Flask, interface HTML/CSS et amelioration continue.",
        category: "Web",
        tags: ["Python", "Flask", "SQLite", "HTML", "CSS"],
        github: "https://github.com/HajarChobani/projetScript",
        demo: "",
        image: "/images/flask-contacts.png"
    },
    {
        id: 4,
        title: "Application Mobile - Gestion d'Association",
        description: "Application mobile iOS pour la gestion d'une association, avec interface, navigation et logique backend en Swift.",
        impact: "Projet developpe en iterations avec tests frequents et ajustements.",
        category: "Mobile",
        tags: ["Swift", "iOS", "Xcode", "Mobile"],
        github: "https://github.com/HajarChobani/projetIOS",
        demo: "",
        image: "/images/swift-app.png"
    }
];

export default profile;
