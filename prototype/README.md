# Prototype — SaaS Anatomy

Espace de travail pour structurer la vision produit et prototyper les futures fonctionnalités.

## Structure

```
prototype/
├── docs/               # Réflexion & vision produit (Markdown)
│   ├── 00-etat-des-lieux.md    # Où on en est aujourd'hui
│   ├── 01-vision.md            # Vision produit & direction
│   ├── 02-idees-outils.md      # Brainstorm des outils possibles
│   └── 03-decisions.md         # Décisions prises
│
├── maquettes/          # Prototypes visuels (HTML/CSS brut)
│   ├── dashboard/      # Maquettes du dashboard
│   └── shared/         # Styles partagés entre maquettes
│
└── README.md           # Ce fichier
```

## Principes

- **Rien ici n'impacte le projet principal** — c'est un bac à sable
- **Les .md documentent notre réflexion** — chaque décision est tracée
- **Les maquettes sont jetables** — HTML/CSS brut, pas de framework, juste pour visualiser
- Pour ouvrir une maquette : ouvrir le fichier .html directement dans le navigateur
