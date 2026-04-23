// File: frontend-datheon/src/app/(lang)/[lang]/servicios/iot-hardware/Servicepagecontent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {
    badge: 'Servicio · IoT & Hardware',
    breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'IoT & Hardware' },
    hero: { title: 'Conecta tu hardware', titleAccent: 'a la nube en tiempo real.', subtitle: 'Diseñamos y desarrollamos sistemas IoT completos: desde el firmware en el microcontrolador hasta el dashboard en la nube. ESP32, MQTT, Grafana y más.', cta: 'Agendar consulta gratuita', ctaSub: 'Ver precios' },
    social: '3 empresas industriales implementaron IoT con nosotros este año',
    includes: { title: '¿Qué incluye?', items: [
      { icon: '🔌', title: 'Firmware embebido', desc: 'Desarrollo en C/C++ o MicroPython para ESP32, Arduino, Raspberry Pi y otros microcontroladores.' },
      { icon: '📡', title: 'Protocolo MQTT', desc: 'Comunicación eficiente y en tiempo real entre dispositivos y servidor central.' },
      { icon: '☁️', title: 'Backend IoT', desc: 'API REST + WebSockets para recibir, procesar y almacenar datos de sensores en tiempo real.' },
      { icon: '📊', title: 'Dashboard Grafana', desc: 'Visualización en tiempo real de telemetría, alertas y reportes históricos.' },
      { icon: '🔒', title: 'Seguridad TLS', desc: 'Comunicación cifrada, autenticación de dispositivos y gestión de certificados.' },
      { icon: '🔄', title: 'OTA Updates', desc: 'Actualizaciones de firmware remotas sin necesidad de acceso físico al dispositivo.' },
    ]},
    useCases: { title: 'Casos de uso reales', items: [
      { icon: '🏭', profile: 'Manufactura', pain: 'Máquinas sin monitoreo, paros no planificados cuestan miles', solution: 'Sensores en equipos críticos con alertas en tiempo real y mantenimiento predictivo', result: 'Reduce paros no planificados hasta 70%' },
      { icon: '🌱', profile: 'Agricultura', pain: 'Riego manual ineficiente y desperdicio de agua', solution: 'Sistema de sensores de humedad con riego automatizado según condiciones reales', result: 'Ahorra hasta 40% en agua y aumenta rendimiento' },
      { icon: '🏢', profile: 'Edificios inteligentes', pain: 'Consumo energético alto sin visibilidad de causas', solution: 'Sensores de consumo, temperatura y ocupación con dashboard en tiempo real', result: 'Reduce consumo energético 25-35%' },
      { icon: '🚛', profile: 'Logística', pain: 'Flotilla sin visibilidad de ubicación ni condiciones de carga', solution: 'GPS + sensores de temperatura/humedad con alertas automáticas', result: 'Evita pérdidas de carga y optimiza rutas' },
    ]},
    results: { title: 'Lo que logramos', items: [
      { value: '<100ms', label: 'Latencia MQTT', sub: 'Datos en tiempo real' },
      { value: '99.5%', label: 'Uptime dispositivos', sub: 'Con reconexión automática' },
      { value: '70%', label: 'Menos paros', sub: 'Con mantenimiento predictivo' },
      { value: '40%', label: 'Ahorro energético', sub: 'Promedio en edificios' },
    ]},
    pricing: { title: 'Planes IoT & Hardware', subtitle: 'Precios en USD. Incluyen firmware, backend y dashboard.', tiers: [
      { name: 'Prototipo IoT', tagline: 'Para validar tu idea conectada', price: '$5,000', range: '– $12,000 USD', time: '6–8 semanas', color: '#059669', featured: false, features: ['Diseño del circuito', 'Firmware básico', 'Conectividad MQTT/WiFi', 'Backend de ingesta', 'Dashboard básico', 'Documentación técnica'], cta: 'Solicitar propuesta' },
      { name: 'Sistema IoT Completo', tagline: 'Para operaciones en producción', price: '$12,000', range: '– $30,000 USD', time: '3–4 meses', color: '#00AEEF', featured: true, features: ['Firmware avanzado + OTA', 'Gateway de dispositivos', 'Backend escalable', 'Dashboard Grafana completo', 'Alertas y notificaciones', 'Seguridad TLS', 'Soporte 90 días'], cta: 'El más solicitado' },
      { name: 'IoT Enterprise', tagline: 'Para grandes despliegues', price: 'Desde $30,000', range: 'USD', time: '4–8 meses', color: '#F59E0B', featured: false, features: ['Diseño de PCB personalizado', 'Certificación FCC/CE', 'Manufactura asistida', 'Infraestructura cloud propia', 'SLA garantizado', 'Equipo dedicado'], cta: 'Hablar con el equipo' },
    ]},
    faq: { title: 'Preguntas frecuentes', items: [
      { q: '¿Qué microcontroladores trabajan?', a: 'Principalmente ESP32 y ESP8266. También trabajamos con Arduino, Raspberry Pi y STM32 según el caso de uso.' },
      { q: '¿El sistema funciona sin internet?', a: 'Sí. Diseñamos con modo offline: el dispositivo almacena datos localmente y sincroniza cuando recupera conexión.' },
      { q: '¿Cuántos dispositivos puede manejar?', a: 'Desde 10 hasta miles de dispositivos. La arquitectura escala horizontalmente en la nube.' },
      { q: '¿Qué tan segura es la comunicación?', a: 'Usamos TLS 1.3 para cifrado, autenticación por certificado por dispositivo y rotación automática de credenciales.' },
      { q: '¿Pueden fabricar el hardware?', a: 'Diseñamos el esquemático y PCB, y te acompañamos con fabricantes. La manufactura masiva no la hacemos directamente.' },
    ]},
    form: { title: 'Cuéntanos tu proyecto IoT', subtitle: 'Te respondemos en menos de 24 horas.', name: 'Tu nombre', email: 'Email empresarial', company: 'Empresa', useCase: '¿Qué quieres monitorear o controlar?', submit: 'Enviar →', loading: 'Enviando...', success: '¡Recibido! Te contactamos pronto.' },
    finalCta: { title: '¿Listo para conectar tu operación a la nube?', subtitle: 'Primera reunión gratuita. Analizamos tu caso y proponemos la arquitectura ideal.', cta: 'Agendar reunión gratuita', note: 'Sin compromiso · Respuesta en 24h' },
    sticky: 'Agendar consulta IoT gratuita',
  },
  en: {
    badge: 'Service · IoT & Hardware',
    breadcrumb: { home: 'Home', services: 'Services', current: 'IoT & Hardware' },
    hero: { title: 'Connect your hardware', titleAccent: 'to the cloud in real time.', subtitle: 'We design and develop complete IoT systems: from firmware on the microcontroller to the cloud dashboard. ESP32, MQTT, Grafana and more.', cta: 'Schedule free consultation', ctaSub: 'View pricing' },
    social: '3 industrial companies implemented IoT with us this year',
    includes: { title: "What's included?", items: [
      { icon: '🔌', title: 'Embedded firmware', desc: 'Development in C/C++ or MicroPython for ESP32, Arduino, Raspberry Pi and other microcontrollers.' },
      { icon: '📡', title: 'MQTT Protocol', desc: 'Efficient real-time communication between devices and central server.' },
      { icon: '☁️', title: 'IoT Backend', desc: 'REST API + WebSockets to receive, process and store sensor data in real time.' },
      { icon: '📊', title: 'Grafana Dashboard', desc: 'Real-time visualization of telemetry, alerts and historical reports.' },
      { icon: '🔒', title: 'TLS Security', desc: 'Encrypted communication, device authentication and certificate management.' },
      { icon: '🔄', title: 'OTA Updates', desc: 'Remote firmware updates without physical access to the device.' },
    ]},
    useCases: { title: 'Real use cases', items: [
      { icon: '🏭', profile: 'Manufacturing', pain: 'Machines without monitoring, unplanned downtime costs thousands', solution: 'Sensors on critical equipment with real-time alerts and predictive maintenance', result: 'Reduces unplanned downtime by up to 70%' },
      { icon: '🌱', profile: 'Agriculture', pain: 'Inefficient manual irrigation and waste of water', solution: 'Humidity sensor system with automated irrigation based on real conditions', result: 'Saves up to 40% in water and increases yield' },
      { icon: '🏢', profile: 'Smart buildings', pain: 'High energy consumption without visibility of causes', solution: 'Power, temperature and occupancy sensors with real-time dashboard', result: 'Reduces energy consumption 25-35%' },
      { icon: '🚛', profile: 'Logistics', pain: 'Fleet without visibility of location or cargo conditions', solution: 'GPS + temperature/humidity sensors with automatic alerts', result: 'Avoids cargo losses and optimizes routes' },
    ]},
    results: { title: 'What we achieve', items: [
      { value: '<100ms', label: 'MQTT latency', sub: 'Real-time data' },
      { value: '99.5%', label: 'Device uptime', sub: 'With auto-reconnection' },
      { value: '70%', label: 'Less downtime', sub: 'With predictive maintenance' },
      { value: '40%', label: 'Energy savings', sub: 'Average in buildings' },
    ]},
    pricing: { title: 'IoT & Hardware Plans', subtitle: 'Prices in USD. Include firmware, backend and dashboard.', tiers: [
      { name: 'IoT Prototype', tagline: 'To validate your connected idea', price: '$5,000', range: '– $12,000 USD', time: '6–8 weeks', color: '#059669', featured: false, features: ['Circuit design', 'Basic firmware', 'MQTT/WiFi connectivity', 'Ingestion backend', 'Basic dashboard', 'Technical documentation'], cta: 'Request proposal' },
      { name: 'Full IoT System', tagline: 'For production operations', price: '$12,000', range: '– $30,000 USD', time: '3–4 months', color: '#00AEEF', featured: true, features: ['Advanced firmware + OTA', 'Device gateway', 'Scalable backend', 'Full Grafana dashboard', 'Alerts and notifications', 'TLS security', '90-day support'], cta: 'Most requested' },
      { name: 'IoT Enterprise', tagline: 'For large deployments', price: 'From $30,000', range: 'USD', time: '4–8 months', color: '#F59E0B', featured: false, features: ['Custom PCB design', 'FCC/CE certification', 'Assisted manufacturing', 'Own cloud infrastructure', 'Guaranteed SLA', 'Dedicated team'], cta: 'Talk to the team' },
    ]},
    faq: { title: 'Frequently asked questions', items: [
      { q: 'What microcontrollers do you work with?', a: 'Mainly ESP32 and ESP8266. We also work with Arduino, Raspberry Pi and STM32 depending on the use case.' },
      { q: 'Does the system work without internet?', a: 'Yes. We design with offline mode: the device stores data locally and syncs when it recovers connection.' },
      { q: 'How many devices can the system handle?', a: 'From 10 to thousands of devices. The architecture scales horizontally in the cloud.' },
      { q: 'How secure is the communication?', a: 'We use TLS 1.3 for encryption, per-device certificate authentication and automatic credential rotation.' },
      { q: 'Can you manufacture the hardware?', a: 'We design the schematic and PCB and assist with manufacturers. We do not do mass manufacturing directly.' },
    ]},
    form: { title: 'Tell us about your IoT project', subtitle: 'We respond in less than 24 hours.', name: 'Your name', email: 'Business email', company: 'Company', useCase: 'What do you want to monitor or control?', submit: 'Send →', loading: 'Sending...', success: "Received! We'll contact you soon." },
    finalCta: { title: 'Ready to connect your operation to the cloud?', subtitle: 'Free first meeting. We analyze your case and propose the ideal architecture.', cta: 'Schedule free meeting', note: 'No commitment · Response in 24h' },
    sticky: 'Schedule free IoT consultation',
  },
  fr: {
    badge: 'Service · IoT & Hardware',
    breadcrumb: { home: 'Accueil', services: 'Services', current: 'IoT & Hardware' },
    hero: { title: 'Connectez votre hardware', titleAccent: 'au cloud en temps réel.', subtitle: "Nous concevons et développons des systèmes IoT complets : du firmware sur le microcontrôleur au tableau de bord cloud. ESP32, MQTT, Grafana et plus.", cta: 'Planifier une consultation gratuite', ctaSub: 'Voir les tarifs' },
    social: "3 entreprises industrielles ont implémenté l'IoT avec nous cette année",
    includes: { title: "Qu'est-ce qui est inclus ?", items: [
      { icon: '🔌', title: 'Firmware embarqué', desc: 'Développement en C/C++ ou MicroPython pour ESP32, Arduino, Raspberry Pi et autres microcontrôleurs.' },
      { icon: '📡', title: 'Protocole MQTT', desc: 'Communication efficace et en temps réel entre appareils et serveur central.' },
      { icon: '☁️', title: 'Backend IoT', desc: 'API REST + WebSockets pour recevoir, traiter et stocker les données de capteurs en temps réel.' },
      { icon: '📊', title: 'Dashboard Grafana', desc: 'Visualisation en temps réel de la télémétrie, alertes et rapports historiques.' },
      { icon: '🔒', title: 'Sécurité TLS', desc: "Communication chiffrée, authentification des appareils et gestion des certificats." },
      { icon: '🔄', title: 'Mises à jour OTA', desc: "Mises à jour du firmware à distance sans accès physique à l'appareil." },
    ]},
    useCases: { title: "Cas d'utilisation réels", items: [
      { icon: '🏭', profile: 'Industrie', pain: "Machines sans surveillance, les arrêts non planifiés coûtent des milliers", solution: 'Capteurs sur équipements critiques avec alertes temps réel et maintenance prédictive', result: "Réduit les arrêts non planifiés jusqu'à 70%" },
      { icon: '🌱', profile: 'Agriculture', pain: "Irrigation manuelle inefficace et gaspillage d'eau", solution: "Système de capteurs d'humidité avec irrigation automatisée", result: "Économise jusqu'à 40% en eau et augmente le rendement" },
      { icon: '🏢', profile: 'Bâtiments intelligents', pain: 'Consommation énergétique élevée sans visibilité', solution: 'Capteurs de consommation, température et occupation avec tableau de bord temps réel', result: 'Réduit la consommation énergétique de 25-35%' },
      { icon: '🚛', profile: 'Logistique', pain: 'Flotte sans visibilité de localisation ni conditions de cargaison', solution: 'GPS + capteurs de température/humidité avec alertes automatiques', result: 'Évite les pertes de cargaison et optimise les routes' },
    ]},
    results: { title: 'Ce que nous réalisons', items: [
      { value: '<100ms', label: 'Latence MQTT', sub: 'Données en temps réel' },
      { value: '99.5%', label: 'Disponibilité appareils', sub: 'Avec reconnexion auto' },
      { value: '70%', label: "Moins d'arrêts", sub: 'Avec maintenance prédictive' },
      { value: '40%', label: 'Économies énergétiques', sub: 'Moyenne en bâtiments' },
    ]},
    pricing: { title: 'Plans IoT & Hardware', subtitle: 'Prix en USD. Incluent firmware, backend et tableau de bord.', tiers: [
      { name: 'Prototype IoT', tagline: 'Pour valider votre idée connectée', price: '5 000 $', range: '– 12 000 $ USD', time: '6–8 semaines', color: '#059669', featured: false, features: ['Conception du circuit', 'Firmware de base', 'Connectivité MQTT/WiFi', "Backend d'ingestion", 'Dashboard basique', 'Documentation technique'], cta: 'Demander une proposition' },
      { name: 'Système IoT Complet', tagline: 'Pour les opérations en production', price: '12 000 $', range: '– 30 000 $ USD', time: '3–4 mois', color: '#00AEEF', featured: true, features: ['Firmware avancé + OTA', "Passerelle d'appareils", 'Backend évolutif', 'Dashboard Grafana complet', 'Alertes et notifications', 'Sécurité TLS', 'Support 90 jours'], cta: 'Le plus demandé' },
      { name: 'IoT Enterprise', tagline: 'Pour les grands déploiements', price: 'À partir de 30 000 $', range: 'USD', time: '4–8 mois', color: '#F59E0B', featured: false, features: ['Conception PCB personnalisée', 'Certification FCC/CE', 'Fabrication assistée', 'Infrastructure cloud propre', 'SLA garanti', 'Équipe dédiée'], cta: "Parler à l'équipe" },
    ]},
    faq: { title: 'Questions fréquentes', items: [
      { q: 'Avec quels microcontrôleurs travaillez-vous ?', a: "Principalement ESP32 et ESP8266. Nous travaillons aussi avec Arduino, Raspberry Pi et STM32 selon le cas d'utilisation." },
      { q: 'Le système fonctionne-t-il sans internet ?', a: "Oui. Nous concevons avec un mode hors ligne : l'appareil stocke les données localement et synchronise à la reconnexion." },
      { q: "Combien d'appareils le système peut-il gérer ?", a: "De 10 à des milliers d'appareils. L'architecture s'adapte horizontalement dans le cloud." },
      { q: 'Quelle est la sécurité de la communication ?', a: "Nous utilisons TLS 1.3 pour le chiffrement, l'authentification par certificat par appareil et la rotation automatique des identifiants." },
      { q: 'Pouvez-vous fabriquer le hardware ?', a: "Nous concevons le schéma et le PCB et accompagnons avec des fabricants. Nous ne faisons pas directement la fabrication en masse." },
    ]},
    form: { title: 'Parlez-nous de votre projet IoT', subtitle: 'Nous répondons en moins de 24 heures.', name: 'Votre nom', email: 'Email professionnel', company: 'Entreprise', useCase: 'Que voulez-vous surveiller ou contrôler ?', submit: 'Envoyer →', loading: 'Envoi...', success: 'Reçu ! Nous vous contactons bientôt.' },
    finalCta: { title: 'Prêt à connecter votre opération au cloud ?', subtitle: 'Première réunion gratuite. Nous analysons votre cas et proposons l\'architecture idéale.', cta: 'Planifier une réunion gratuite', note: 'Sans engagement · Réponse en 24h' },
    sticky: 'Planifier une consultation IoT gratuite',
  },
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'iot-hardware',
    icon: <span style={{ fontSize: '12px' }}>📡</span>,
  }
  return <ServicePageTemplate t={t} />
}