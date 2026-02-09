export const LEVEL_CONFIGS = [
  // NIVEAU 1 : Faute de frappe HTML
  {
    id: 1,
    name: 'navbar.component.html',
    description: "Le lien 'Home' ne fonctionne pas. Peux-tu trouver la faute de frappe ?",
    target: 'hre', 
    code: `<nav class="navbar">
  <a hre="/home" class="nav-link">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/contact" class="nav-link">Contact</a>
</nav>`
  },

  // NIVEAU 2 : Logique JavaScript (Assignation vs Égalité)
  {
    id: 2,
    name: 'auth.guard.ts',
    description: "Tout le monde est connecté en tant qu'admin ! Trouve le bug.",
    target: '=',
    code: `function checkAccess(user) {
  if (user.role = 'admin') {
    return true;
  }
  return false;
}`
  },

  // NIVEAU 3 : Erreur d'unité CSS
  {
    id: 3,
    name: 'styles.css',
    description: "La largeur du header est cassée. Quelque chose cloche ici.",
    target: '100pxl',
    code: `.header {
  background-color: #333;
  color: white;
  width: 100pxl;
  height: 50px;
  display: flex;
}`
  },

  // NIVEAU 5 : Faute de frappe dans une propriété
  {
    id: 4,
    name: 'array.utils.js',
    description: "Pourquoi la longueur du tableau est-elle 'undefined' ?",
    target: 'lenght',
    code: `const fruits = ['apple', 'banana', 'orange'];

for (let i = 0; i < fruits.lenght; i++) {
  console.log(fruits[i]);
}
console.log("Terminé");`
  },

  // NIVEAU 6 : Sécurité (Secrets en dur)
  {
    id: 5,
    name: 'stripe.service.ts',
    description: "ALERTE SÉCURITÉ : Un développeur a commit une clé secrète !",
    target: '"sk_live_8347583745"',
    code: `import { Stripe } from 'stripe';

const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// TODO: Utiliser une variable d'environnement en production !
const SECRET_KEY = "sk_live_8347583745";

export function processPayment() {
  // Logique de paiement...
}`
  },

  // NIVEAU 7 : Injection SQL / Faute de frappe
  {
    id: 6,
    name: 'queries.sql',
    description: "La requête SQL échoue. Trouve l'erreur dans le mot-clé.",
    target: 'FORM',
    code: `SELECT id, username, email 
FORM users 
WHERE active = 1 
AND created_at > '2023-01-01'
ORDER BY username ASC;`
  },

  // NIVEAU 8 : React / Propriétés DOM
  {
    id: 7,
    name: 'Card.jsx',
    description: "Le style de ce composant React ne s'applique pas.",
    target: 'class',
    code: `export default function Card({ title, children }) {
  return (
    <div class="card-container">
      <h3>{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}`
  },

  // NIVEAU 10 : "Ça marche, mais ça ne devrait pas" (Console log)
  {
    id: 8,
    name: 'checkout.ts',
    description: "Nettoie le code avant le déploiement.",
    target: 'console',
    code: `submitOrder(order: Order) {
  this.validate(order);
  
  console.log("Infos carte de crédit :", order.cc);
  
  this.api.post('/orders', order).subscribe();
}`
  },

  // NIVEAU 11
  {
    id: 9,
    code: `function calculateTotal(price, tax) {
  const total = price + tax;
  console.log("Calculated!");
  return total;
}`,
    name: "cart.utils.js",
    description: "Ce code n'est pas encore prêt pour la prod...",
    target: 'console',
  },

  // NIVEAU 12
  {
    id: 10,
    name: 'auth.service.ts',
    description: 'Un F5 serait traumatisé en voyant ça...',
    target: '"admin123"',
    code: `
    import { User } from './models';
    
    export class AuthService {
      login(user: User) {
        if (user.password === "admin123") {
           return true;
        }
        return false;
      }
    }`
  }
];