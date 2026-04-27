// File: frontend-datheon/src/app/(lang)/[lang]/sectores/ecommerce/SectorPageContent.tsx
'use client'

import { MdShoppingCart } from 'react-icons/md'
import { SectorPageTemplate } from '../SectorPageTemplate'
import type { SectorPageContent as T, Lang } from '../SectorPageTemplate'

const content: T = {
  slug:     'ecommerce',
  color:    '#F59E0B',
  calendly: 'https://calendly.com/team_datheon/saas-web-apps-e-commerce-clone',
  icon:     <MdShoppingCart size={16}/>,

  breadcrumb: {
    home:    { es: 'Inicio',    en: 'Home',     fr: 'Accueil'   },
    sectors: { es: 'Sectores', en: 'Sectors',  fr: 'Secteurs'  },
    current: { es: 'E-commerce', en: 'E-commerce', fr: 'E-commerce' },
  },

  hero: {
    badge:    { es: 'Sector · E-commerce', en: 'Sector · E-commerce', fr: 'Secteur · E-commerce' },
    title:    { es: 'E-commerce que', en: 'E-commerce that', fr: 'E-commerce qui' },
    accent:   { es: 'vende solo.', en: 'sells itself.', fr: 'se vend tout seul.' },
    subtitle: {
      es: 'Implementamos IA en tu tienda para aumentar el ticket promedio, reducir abandonos y convertir más visitantes en compradores reales.',
      en: 'We implement AI in your store to increase the average ticket, reduce abandonment and convert more visitors into real buyers.',
      fr: "Nous implémentons l'IA dans votre boutique pour augmenter le panier moyen, réduire les abandons et convertir plus de visiteurs en acheteurs réels.",
    },
    cta:    { es: 'Agendar consulta gratuita', en: 'Schedule free consultation', fr: 'Planifier une consultation gratuite' },
    ctaSub: { es: 'Ver planes', en: 'View plans', fr: 'Voir les plans' },
    social: { es: '3 tiendas online aumentaron sus ventas con nosotros este año', en: '3 online stores increased their sales with us this year', fr: '3 boutiques en ligne ont augmenté leurs ventes avec nous cette année' },
  },

  metrics: ['+35% ticket promedio', '-30% abandonos', '+40% satisfacción', '+25% conversión'],

  solutions: {
    title: { es: '¿Qué implementamos?', en: 'What we implement?', fr: 'Ce que nous implémentons' },
    items: [
      {
        icon: '🎯',
        title:   { es: 'Recomendaciones personalizadas', en: 'Personalized recommendations', fr: 'Recommandations personnalisées' },
        desc:    { es: 'Motor de recomendación entrenado con el historial de compras y comportamiento de cada usuario.', en: 'Recommendation engine trained with purchase history and each user\'s behavior.', fr: 'Moteur de recommandation entraîné avec l\'historique d\'achats et le comportement de chaque utilisateur.' },
      },
      {
        icon: '🤖',
        title:   { es: 'Chatbot de ventas 24/7', en: '24/7 sales chatbot', fr: 'Chatbot de vente 24/7' },
        desc:    { es: 'Asistente conversacional que resuelve dudas, recomienda productos y acompaña al usuario hasta el checkout.', en: 'Conversational assistant that resolves doubts, recommends products and accompanies the user to checkout.', fr: 'Assistant conversationnel qui résout les doutes, recommande des produits et accompagne l\'utilisateur jusqu\'au checkout.' },
      },
      {
        icon: '⚡',
        title:   { es: 'Optimización de checkout', en: 'Checkout optimization', fr: 'Optimisation du checkout' },
        desc:    { es: 'Flujo de pago simplificado con detección de intención de abandono y recuperación automática.', en: 'Simplified payment flow with abandonment intent detection and automatic recovery.', fr: 'Flux de paiement simplifié avec détection d\'intention d\'abandon et récupération automatique.' },
      },
      {
        icon: '📊',
        title:   { es: 'Analytics de comportamiento', en: 'Behavior analytics', fr: 'Analytique comportementale' },
        desc:    { es: 'Dashboard con heatmaps, embudos de conversión y segmentación de clientes en tiempo real.', en: 'Dashboard with heatmaps, conversion funnels and real-time customer segmentation.', fr: 'Tableau de bord avec heatmaps, entonnoirs de conversion et segmentation clients en temps réel.' },
      },
      {
        icon: '📧',
        title:   { es: 'Email marketing automatizado', en: 'Automated email marketing', fr: 'Email marketing automatisé' },
        desc:    { es: 'Secuencias de recuperación de carrito, reactivación de usuarios y promociones personalizadas.', en: 'Cart recovery sequences, user reactivation and personalized promotions.', fr: 'Séquences de récupération de panier, réactivation d\'utilisateurs et promotions personnalisées.' },
      },
      {
        icon: '🔍',
        title:   { es: 'Búsqueda semántica', en: 'Semantic search', fr: 'Recherche sémantique' },
        desc:    { es: 'Motor de búsqueda interno que entiende intención, sinónimos y errores tipográficos del usuario.', en: 'Internal search engine that understands intent, synonyms and typographical errors.', fr: 'Moteur de recherche interne qui comprend l\'intention, les synonymes et les erreurs typographiques.' },
      },
    ],
  },

  useCases: {
    title: { es: 'Casos de uso reales', en: 'Real use cases', fr: "Cas d'utilisation réels" },
    items: [
      {
        icon: '🛒', profile: 'Fashion & Ropa',
        pain:     { es: 'Tasa de abandono del 80% y recomendaciones genéricas que no convierten', en: '80% abandonment rate and generic recommendations that don\'t convert', fr: '80% de taux d\'abandon et recommandations génériques qui ne convertissent pas' },
        solution: { es: 'Motor de recomendación personalizado + chatbot que acompaña en la decisión de compra', en: 'Personalized recommendation engine + chatbot that accompanies the purchase decision', fr: 'Moteur de recommandation personnalisé + chatbot qui accompagne la décision d\'achat' },
        result:   { es: '+42% en ticket promedio y -35% en abandono en 60 días', en: '+42% in average ticket and -35% in abandonment in 60 days', fr: '+42% de panier moyen et -35% d\'abandon en 60 jours' },
      },
      {
        icon: '🍕', profile: 'Food Delivery',
        pain:     { es: 'Usuarios que no saben qué pedir y alta tasa de primera compra sin repetición', en: 'Users who don\'t know what to order and high first-purchase no-repeat rate', fr: 'Utilisateurs qui ne savent pas quoi commander et taux élevé de première commande sans répétition' },
        solution: { es: 'Recomendaciones basadas en historial, hora del día y preferencias declaradas', en: 'Recommendations based on history, time of day and stated preferences', fr: 'Recommandations basées sur l\'historique, l\'heure et les préférences déclarées' },
        result:   { es: '+28% en recompra y +15% en ticket en el primer mes', en: '+28% in repurchase and +15% in ticket in the first month', fr: '+28% en rachat et +15% de panier le premier mois' },
      },
      {
        icon: '💻', profile: 'Electrónica',
        pain:     { es: 'Búsquedas que no encuentran el producto correcto y soporte que no escala', en: 'Searches that don\'t find the right product and support that doesn\'t scale', fr: 'Recherches qui ne trouvent pas le bon produit et support qui ne s\'adapte pas' },
        solution: { es: 'Búsqueda semántica + chatbot especializado en especificaciones técnicas', en: 'Semantic search + chatbot specialized in technical specifications', fr: 'Recherche sémantique + chatbot spécialisé en spécifications techniques' },
        result:   { es: '-45% en tickets de soporte y +20% en conversión de búsqueda', en: '-45% in support tickets and +20% in search conversion', fr: '-45% de tickets de support et +20% de conversion de recherche' },
      },
      {
        icon: '💄', profile: 'Beauty & Cosmética',
        pain:     { es: 'Alta devolución por productos que no encajan con el tono de piel del cliente', en: 'High returns due to products that don\'t match the customer\'s skin tone', fr: 'Taux de retour élevé dû aux produits qui ne correspondent pas au teint du client' },
        solution: { es: 'Recomendador de productos basado en perfil de piel con IA y quiz interactivo', en: 'AI-based skin profile product recommender with interactive quiz', fr: 'Recommandateur de produits basé sur le profil de peau avec IA et quiz interactif' },
        result:   { es: '-60% en devoluciones y +33% en satisfacción del cliente', en: '-60% in returns and +33% in customer satisfaction', fr: '-60% de retours et +33% de satisfaction client' },
      },
    ],
  },

  results: {
    title: { es: 'Resultados promedio de nuestros clientes', en: 'Average results from our clients', fr: 'Résultats moyens de nos clients' },
    items: [
      { value: '+35%', label: { es: 'Ticket promedio', en: 'Average ticket', fr: 'Panier moyen' }, sub: { es: 'Con recomendaciones IA', en: 'With AI recommendations', fr: 'Avec recommandations IA' } },
      { value: '-30%', label: { es: 'Tasa de abandono', en: 'Abandonment rate', fr: "Taux d'abandon" }, sub: { es: 'Checkout optimizado', en: 'Optimized checkout', fr: 'Checkout optimisé' } },
      { value: '+40%', label: { es: 'Satisfacción', en: 'Satisfaction', fr: 'Satisfaction' }, sub: { es: 'NPS medido', en: 'Measured NPS', fr: 'NPS mesuré' } },
      { value: '24/7', label: { es: 'Soporte activo', en: 'Active support', fr: 'Support actif' }, sub: { es: 'Chatbot sin intervención', en: 'Chatbot without intervention', fr: 'Chatbot sans intervention' } },
    ],
  },

  pricing: {
    title:    { es: 'Planes E-commerce', en: 'E-commerce Plans', fr: 'Plans E-commerce' },
    subtitle: { es: 'Precios en USD. Implementación + configuración incluida.', en: 'Prices in USD. Implementation + configuration included.', fr: 'Prix en USD. Implémentation + configuration incluses.' },
    tiers: [
      {
        name:     { es: 'Starter',   en: 'Starter',   fr: 'Starter'   },
        tagline:  { es: 'Para tiendas que arrancan', en: 'For starting stores', fr: 'Pour les boutiques qui démarrent' },
        price:    '$3,500',
        range:    'USD',
        time:     { es: '3–4 semanas', en: '3–4 weeks', fr: '3–4 semaines' },
        color:    '#F59E0B',
        featured: false,
        features: {
          es: ['Chatbot de ventas básico', 'Recuperación de carrito por email', 'Analytics de comportamiento', 'Integración Shopify / WooCommerce', 'Soporte 30 días'],
          en: ['Basic sales chatbot', 'Email cart recovery', 'Behavior analytics', 'Shopify / WooCommerce integration', '30-day support'],
          fr: ['Chatbot de vente basique', 'Récupération de panier par email', 'Analytique comportementale', 'Intégration Shopify / WooCommerce', 'Support 30 jours'],
        },
        cta: { es: 'Solicitar propuesta', en: 'Request proposal', fr: 'Demander une proposition' },
      },
      {
        name:     { es: 'Growth',    en: 'Growth',    fr: 'Growth'    },
        tagline:  { es: 'Para tiendas listas para escalar', en: 'For stores ready to scale', fr: 'Pour les boutiques prêtes à évoluer' },
        price:    '$8,000',
        range:    '– $15,000 USD',
        time:     { es: '6–8 semanas', en: '6–8 weeks', fr: '6–8 semaines' },
        color:    '#F59E0B',
        featured: true,
        features: {
          es: ['Motor de recomendación personalizado', 'Chatbot avanzado multicanal', 'Búsqueda semántica integrada', 'Email marketing automatizado', 'Dashboard analytics completo', 'Optimización de checkout', 'Soporte 90 días'],
          en: ['Custom recommendation engine', 'Advanced multichannel chatbot', 'Integrated semantic search', 'Automated email marketing', 'Full analytics dashboard', 'Checkout optimization', '90-day support'],
          fr: ['Moteur de recommandation personnalisé', 'Chatbot avancé multicanal', 'Recherche sémantique intégrée', 'Email marketing automatisé', 'Dashboard analytique complet', 'Optimisation checkout', 'Support 90 jours'],
        },
        cta: { es: 'El más solicitado', en: 'Most requested', fr: 'Le plus demandé' },
      },
      {
        name:     { es: 'Enterprise', en: 'Enterprise', fr: 'Enterprise' },
        tagline:  { es: 'Para operaciones de alto volumen', en: 'For high-volume operations', fr: 'Pour les opérations à grand volume' },
        price:    'Desde $15,000',
        range:    'USD',
        time:     { es: '2–3 meses', en: '2–3 months', fr: '2–3 mois' },
        color:    '#F59E0B',
        featured: false,
        features: {
          es: ['Todo lo del plan Growth', 'IA predictiva de demanda', 'Pricing dinámico automático', 'Integración ERP/WMS', 'SLA garantizado', 'Equipo dedicado'],
          en: ['Everything in Growth plan', 'Predictive demand AI', 'Automatic dynamic pricing', 'ERP/WMS integration', 'Guaranteed SLA', 'Dedicated team'],
          fr: ['Tout du plan Growth', 'IA prédictive de la demande', 'Tarification dynamique automatique', 'Intégration ERP/WMS', 'SLA garanti', 'Équipe dédiée'],
        },
        cta: { es: 'Hablar con el equipo', en: 'Talk to the team', fr: "Parler à l'équipe" },
      },
    ],
  },

  faq: {
    title: { es: 'Preguntas frecuentes', en: 'Frequently asked questions', fr: 'Questions fréquentes' },
    items: [
      {
        q: { es: '¿Con qué plataformas de e-commerce trabajan?', en: 'What e-commerce platforms do you work with?', fr: 'Avec quelles plateformes e-commerce travaillez-vous ?' },
        a: { es: 'Shopify, WooCommerce, Magento, VTEX y plataformas custom. También integramos con Mercado Libre y Amazon.', en: 'Shopify, WooCommerce, Magento, VTEX and custom platforms. We also integrate with Mercado Libre and Amazon.', fr: 'Shopify, WooCommerce, Magento, VTEX et plateformes custom. Nous intégrons aussi avec Mercado Libre et Amazon.' },
      },
      {
        q: { es: '¿Cuánto tarda en verse resultados?', en: 'How long does it take to see results?', fr: 'Combien de temps faut-il pour voir des résultats ?' },
        a: { es: 'Los primeros resultados se ven en 2–4 semanas. Los mejores resultados (ticket promedio, retención) se consolidan en 60–90 días.', en: 'First results are seen in 2–4 weeks. The best results (average ticket, retention) consolidate in 60–90 days.', fr: 'Les premiers résultats apparaissent en 2–4 semaines. Les meilleurs résultats (panier moyen, rétention) se consolident en 60–90 jours.' },
      },
      {
        q: { es: '¿Necesito mucho tráfico para que funcione la IA?', en: 'Do I need a lot of traffic for AI to work?', fr: "Ai-je besoin de beaucoup de trafic pour que l'IA fonctionne ?" },
        a: { es: 'Con 500+ visitas mensuales ya hay suficientes datos para entrenar los modelos. Por debajo de eso empezamos con reglas y pasamos a ML cuando hay más datos.', en: 'With 500+ monthly visits there is already enough data to train the models. Below that we start with rules and move to ML when there is more data.', fr: 'Avec 500+ visites mensuelles il y a déjà assez de données pour entraîner les modèles. En dessous, on commence par des règles et on passe au ML avec plus de données.' },
      },
      {
        q: { es: '¿Funciona con cualquier pasarela de pago?', en: 'Does it work with any payment gateway?', fr: 'Ça fonctionne avec n\'importe quelle passerelle de paiement ?' },
        a: { es: 'Sí. La optimización de checkout es agnóstica a la pasarela. Trabajamos con Stripe, Conekta, MercadoPago, PayPal y más.', en: 'Yes. Checkout optimization is gateway-agnostic. We work with Stripe, Conekta, MercadoPago, PayPal and more.', fr: 'Oui. L\'optimisation du checkout est agnostique à la passerelle. Nous travaillons avec Stripe, Conekta, MercadoPago, PayPal et plus.' },
      },
      {
        q: { es: '¿Qué pasa con los datos de mis clientes?', en: 'What happens with my customer data?', fr: 'Que se passe-t-il avec les données de mes clients ?' },
        a: { es: 'Todos los datos quedan en tu infraestructura o en servidores que tú controlas. No compartimos ni vendemos datos de tus clientes.', en: 'All data stays in your infrastructure or servers you control. We don\'t share or sell your customer data.', fr: 'Toutes les données restent dans votre infrastructure ou sur des serveurs que vous contrôlez. Nous ne partageons ni ne vendons les données de vos clients.' },
      },
    ],
  },

  form: {
    title:    { es: 'Cuéntanos tu tienda', en: 'Tell us about your store', fr: 'Parlez-nous de votre boutique' },
    subtitle: { es: 'Te respondemos en menos de 24 horas.', en: 'We respond in less than 24 hours.', fr: 'Nous répondons en moins de 24 heures.' },
    nameLbl:  { es: 'Tu nombre', en: 'Your name', fr: 'Votre nom' },
    emailLbl: { es: 'Email empresarial', en: 'Business email', fr: 'Email professionnel' },
    coLbl:    { es: 'Nombre de tu tienda', en: 'Store name', fr: 'Nom de votre boutique' },
    msgLbl:   { es: '¿Cuál es tu mayor reto de ventas hoy?', en: 'What is your biggest sales challenge today?', fr: "Quel est votre plus grand défi de vente aujourd'hui ?" },
    submit:   { es: 'Enviar →', en: 'Send →', fr: 'Envoyer →' },
    loading:  { es: 'Enviando...', en: 'Sending...', fr: 'Envoi...' },
    success:  { es: '¡Recibido! Te contactamos en menos de 24h.', en: 'Received! We\'ll contact you in less than 24h.', fr: 'Reçu ! Nous vous contactons en moins de 24h.' },
  },

  finalCta: {
    title:    { es: '¿Listo para que tu tienda venda sola?', en: 'Ready for your store to sell itself?', fr: 'Prêt pour que votre boutique se vende toute seule ?' },
    subtitle: { es: 'Primera reunión gratuita. Te mostramos exactamente qué implementaríamos en tu tienda.', en: 'Free first meeting. We show you exactly what we would implement in your store.', fr: 'Première réunion gratuite. Nous vous montrons exactement ce que nous implémenterions dans votre boutique.' },
    cta:      { es: 'Agendar reunión gratuita', en: 'Schedule free meeting', fr: 'Planifier une réunion gratuite' },
    note:     { es: 'Sin compromiso · Respuesta en 24h', en: 'No commitment · Response in 24h', fr: 'Sans engagement · Réponse en 24h' },
  },

  sticky: { es: 'Agendar consulta gratuita', en: 'Schedule free consultation', fr: 'Planifier une consultation gratuite' },
}

export function SectorPageContent({ lang }: { lang: Lang }) {
  return <SectorPageTemplate t={content} lang={lang} />
}