import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartHandshake, 
  Play, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  PiggyBank, 
  Gift, 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  CheckCircle2, 
  Sun, 
  Sprout, 
  Backpack, 
  Phone, 
  Mail, 
  Navigation, 
  ChevronRight,
  HelpCircle,
  Heart,
  Share2,
  BookOpen
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const CrowdfundingLanding: React.FC = () => {
  const { fundraiser, addDonation, immersionTrip, availableUsers, showToast } = useApp();

  // Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [videoSourceType, setVideoSourceType] = useState<'local' | 'drive'>('local');

  // Donation form state
  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState<number>(25000);
  const [donationMessage, setDonationMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const percentage = Math.min(100, Math.round((fundraiser.currentAmount / fundraiser.goalAmount) * 100));
  const remainingAmount = Math.max(0, fundraiser.goalAmount - fundraiser.currentAmount);

  // Sacerdotes and Students lists
  const priests = availableUsers.filter(u => u.role === 'sacerdote');
  const students = availableUsers.filter(u => u.role !== 'sacerdote');

  const handleCopy = (text: string, fieldName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      showToast(`Copiado al portapapeles: ${text}`);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) {
      showToast('Por favor ingresa un monto válido');
      return;
    }

    addDonation(
      isAnonymous ? 'Donante Anónimo' : (donorName.trim() || 'Amigo de la Comunidad'),
      Number(donationAmount),
      donationMessage.trim() || undefined,
      isAnonymous
    );

    setIsDonateModalOpen(false);
    setDonorName('');
    setDonationMessage('');
    showToast('¡Gracias de corazón! Tu aporte ha sido registrado en la campaña.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Campaña Solidaria: Viaje de Inmersión Proseminario 2027',
        text: 'Apoya el Viaje de Inmersión en Granja Épicos del Proseminario de la Comunidad de Cristianos (11 al 20 de Enero).',
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy(window.location.href, 'share');
      showToast('Enlace de la campaña copiado para compartir.');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const faqs = [
    {
      q: '¿Cómo se administran los fondos recaudados?',
      a: 'Somos un grupo de estudiantes del Proseminario de la Comunidad de Cristianos que estamos solicitando colaboración económica para costear los gastos del retiro de inmersión en Granja Épicos. Todos los aportes se administran de forma comunitaria y transparente, destinados íntegramente a cubrir el hospedaje, la alimentación biodinámica y los pasajes del grupo.'
    },
    {
      q: '¿Puedo colaborar desde fuera de Argentina (Uruguay, Chile, etc.)?',
      a: '¡Sí! Varios participantes y donantes son de Uruguay, Chile y otros países hermanos. Para transferencias internacionales o PayPal / Western Union, contáctanos a través del correo de los coordinadores (equipo.sacerdotes@proseminario.org) y te brindaremos los datos correspondientes.'
    },
    {
      q: '¿Es posible realizar una donación anónima?',
      a: 'Por supuesto. Al momento de registrar tu aporte en el formulario puedes marcar la casilla "Donante Anónimo". Tu monto sumará a la meta global y tu mensaje se publicará sin revelar tu identidad.'
    },
    {
      q: '¿Qué sucede si se supera la meta de $3.200.000?',
      a: 'Cualquier excedente será reservado para el Fondo de Becas Continuas del ciclo lectivo 2027, cubriendo los pasajes de los encuentros intermedios presenciales y la adquisición de bibliografía esencial para los integrantes con menores recursos.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Atmospheric Notice */}
      <div className="bg-gradient-to-r from-amber-950 via-[#352516] to-amber-950 text-amber-200 text-xs py-2 px-4 border-b border-amber-800/40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Campaña Solidaria Oficial</span>
            <span className="text-amber-400/80">•</span>
            <span>Comunidad de Cristianos — Proseminario 2027</span>
          </div>
          <div className="text-[11px] text-amber-300/80">
            Retiro en Granja Épicos: <strong>11 al 20 de Enero</strong> • Exaltación de la Cruz, Bs. As.
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white shadow-md border border-amber-600/40">
              <Sprout className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <h1 className="font-serif-sacred font-bold text-stone-900 text-lg leading-tight tracking-wide">
                Proseminario de Cristianos
              </h1>
              <p className="text-[11px] text-amber-900 font-semibold tracking-wider uppercase">
                Campaña de Recaudación Solidaria
              </p>
            </div>
          </div>

          {/* Nav Links & Action */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-stone-600">
            <a href="#video" className="hover:text-amber-800 transition-colors">¿Para qué es?</a>
            <a href="#presupuesto" className="hover:text-amber-800 transition-colors">Presupuesto</a>
            <a href="#granja" className="hover:text-amber-800 transition-colors">El Retiro & Mapa</a>
            <a href="#participantes" className="hover:text-amber-800 transition-colors">Quiénes Somos</a>
            <a href="#donar" className="hover:text-amber-800 transition-colors">Cómo Donar</a>
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              title="Compartir enlace"
              className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a
              href="#donar"
              className="px-4 py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>Colaborar Ahora</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:py-20 bg-gradient-to-b from-[#F5EFE6] via-[#FAF6EE] to-[#FBF9F5] border-b border-stone-200/80">
        <div className="absolute top-0 right-1/4 -mt-16 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 -mb-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Inmersión en la Tierra & Vida Sacramental • 11 al 20 de Enero</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-sacred text-stone-900 leading-tight max-w-4xl mx-auto">
            Hagamos posible el Viaje de Inmersión en Granja Épicos
          </h2>

          <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-serif leading-relaxed">
            Un fondo comunitario y transparente para que <strong>17 estudiantes</strong> y el equipo de sacerdotes acompañantes puedan vivir 10 días de convivencia, agricultura biodinámica y oración sin que nadie quede afuera por motivos económicos.
          </p>

          {/* Quick Date and Location Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-stone-700 pt-1">
            <span className="flex items-center bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs">
              <Calendar className="w-4 h-4 mr-1.5 text-amber-700" />
              <strong>11 al 20 de Enero (10 días)</strong>
            </span>
            <span className="flex items-center bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs">
              <MapPin className="w-4 h-4 mr-1.5 text-rose-600" />
              <span>Granja Épicos • Exaltación de la Cruz, Bs. As.</span>
            </span>
            <span className="flex items-center bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs">
              <Users className="w-4 h-4 mr-1.5 text-emerald-700" />
              <span>17 Integrantes + 5 Sacerdotes</span>
            </span>
          </div>

          {/* Progress Card Spotlight */}
          <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6 text-left mt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Recaudación Solidaria en Curso
                </span>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl sm:text-5xl font-bold font-serif-sacred text-amber-950">
                    {formatCurrency(fundraiser.currentAmount)}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-500 font-medium">
                    de {formatCurrency(fundraiser.goalAmount)}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-3xl sm:text-4xl font-bold text-amber-800 font-mono">
                  {percentage}%
                </span>
                <span className="text-xs text-stone-500 block">alcanzado del objetivo</span>
              </div>
            </div>

            {/* Visual Progress Track */}
            <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden p-0.5 border border-stone-200">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 rounded-full transition-all duration-1000 ease-out shadow-xs"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-100 text-center">
              <div className="p-2.5 rounded-xl bg-stone-50">
                <span className="text-[10px] sm:text-xs text-stone-500 block font-medium">Donaciones</span>
                <span className="text-sm sm:text-lg font-bold text-stone-900 font-mono">
                  {fundraiser.contributions.length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50">
                <span className="text-[10px] sm:text-xs text-stone-500 block font-medium">Faltante</span>
                <span className="text-sm sm:text-lg font-bold text-amber-900 font-mono">
                  {formatCurrency(remainingAmount)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50">
                <span className="text-[10px] sm:text-xs text-stone-500 block font-medium">Destino</span>
                <span className="text-sm sm:text-lg font-bold text-emerald-800">100% Solidario</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="#donar"
                className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-2xl text-center text-sm font-bold shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Gift className="w-4 h-4 text-amber-200" />
                <span>Sumar mi Colaboración Ahora</span>
              </a>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto py-3.5 px-5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-2xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-amber-700 fill-amber-700" />
                <span>Ver Video (3 min)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION ("¿Para qué necesitamos este dinero?") */}
      <section id="video" className="py-16 sm:py-20 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Video Thumbnail (7 cols) */}
            <div 
              className="lg:col-span-7 relative h-72 sm:h-96 w-full bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl group cursor-pointer"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <img
                src={fundraiser.videoThumbnail}
                alt="Video explicativo del viaje"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-2xl group-hover:bg-amber-500 group-hover:scale-110 transition-all border-2 border-white/50 ring-8 ring-amber-500/30">
                  <Play className="w-9 h-9 fill-white translate-x-0.5" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300">
                <span className="bg-black/70 px-3 py-1 rounded-full backdrop-blur-xs font-mono">
                  Duración: 3:15 min
                </span>
                <span className="text-amber-300 font-semibold flex items-center space-x-1">
                  <span>Toca para ver testimonios</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Text description (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Play className="w-3 h-3 fill-amber-300" />
                <span>La voz de los sacerdotes y estudiantes</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-stone-100 leading-tight">
                ¿Para qué necesitamos este dinero?
              </h3>

              <p className="text-sm text-stone-300 font-serif leading-relaxed">
                En este video, los sacerdotes coordinadores (Telma, Luis, Nicolás) y consejeros (Pablo, Viviane) junto a los estudiantes del Proseminario explican por qué la inmersión en la tierra biodinámica y el ritmo sagrado cotidiano no son un lujo, sino el cimiento indispensable de la vocación.
              </p>

              <blockquote className="border-l-2 border-amber-500 pl-4 text-xs text-amber-200/90 italic font-serif leading-relaxed">
                «La solidaridad comunitaria hace posible que quien tiene menos recursos reciba el apoyo fraterno de quien puede brindar un poco más.»
              </blockquote>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shadow-md"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Reproducir Video</span>
                </button>
                <a
                  href="https://drive.google.com/file/d/12zkYM2V17EQxHbh9HdTORKES05AkTieE/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5"
                >
                  <span>Ver en Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENT BUDGET BREAKDOWN SECTION */}
      <section id="presupuesto" className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <PiggyBank className="w-4 h-4 text-amber-700" />
            <span>Transparencia Presupuestaria</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold font-serif-sacred text-stone-900">
            ¿Cómo se invierte cada aporte solidario?
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl mx-auto font-serif">
            Presupuesto total estimado para los 10 días de retiro: <strong>{formatCurrency(fundraiser.goalAmount)}</strong>. Cada peso tiene una función específica y transparente:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fundraiser.breakdown.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm font-mono">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-stone-900 text-base leading-snug font-serif-sacred">
                  {item.label}
                </h4>
                <p className="text-xs text-stone-600 font-serif leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 uppercase font-semibold">Monto Asignado</span>
                <span className="text-base font-bold text-amber-900 font-mono">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-amber-200/70 text-xs text-stone-700 font-serif flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Transparencia fraterna:</strong> Somos un grupo de estudiantes del Proseminario de la Comunidad de Cristianos solicitando colaboración económica para hacer posible nuestro retiro de inmersión. No existen intermediarios ni comisiones: el 100% de lo recaudado cubre directamente la estadía, los traslados y el material pedagógico de los participantes.
          </p>
        </div>
      </section>

      {/* EL RETIRO: GRANJA ÉPICOS & MAPA INTERACTIVO */}
      <section id="granja" className="py-16 sm:py-20 bg-gradient-to-b from-[#182315] to-[#253320] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5" />
              <span>La Sede del Retiro</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-bold font-serif-sacred text-stone-100">
              Granja Épicos • Exaltación de la Cruz
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
              Ubicada en el campo bonaerense, a 80 km de Capital Federal. Un espacio fértil dedicado a la agricultura biodinámica y a la pedagogía de la tierra, donde el grupo compartirá labores cotidianas, silencios y oficios.
            </p>
          </div>

          {/* Interactive Map & Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Map Embed (7 cols) */}
            <div className="lg:col-span-7 bg-white/5 p-2 rounded-3xl border border-white/10 shadow-2xl space-y-3">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-900 border border-white/10">
                <iframe
                  src={immersionTrip.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Granja Épicos"
                  className="w-full h-full"
                />
              </div>

              <div className="p-3 flex items-center justify-between text-xs text-stone-300">
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">{immersionTrip.addressDetails}</span>
                </span>
                <a
                  href={immersionTrip.googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-semibold flex items-center space-x-1 transition-colors shrink-0"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 4 Pillars & Daily Rhythm summary (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-serif-sacred font-bold text-xl text-stone-100 border-b border-white/15 pb-2">
                Los 4 Pilares de la Convivencia
              </h4>

              <div className="space-y-3 text-xs text-stone-200">
                <div className="flex items-start space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Sprout className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Trabajo con la Tierra Biodinámica</strong>
                    <span>Compost, huerta y ritmo de la naturaleza como experiencia formativa.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Sun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Acto de Consagración Cotidiano</strong>
                    <span>Celebración diaria del sacramento del altar en la capilla del predio.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <BookOpen className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Estudio Evangélico y Cristología</strong>
                    <span>Profundización en el Evangelio de San Juan y textos de Rudolf Steiner.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Users className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Coloquios de Acompañamiento</strong>
                    <span>Diálogo individual con sacerdotes para el discernimiento vocacional sincero.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300 space-y-1">
                <span className="font-bold text-amber-300 block">¿Cómo llegar?</span>
                <p className="font-light">
                  Por Autopista Panamericana (Ruta 8 / Ramal Pilar) hasta Parada Robles / Ruta 39. Se coordinarán viajes en autos compartidos desde CABA y estaciones de tren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS: SACERDOTES Y LOS 17 ESTUDIANTES */}
      <section id="participantes" className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4 text-amber-700" />
            <span>El Grupo Humano</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold font-serif-sacred text-stone-900">
            A quiénes estás apoyando con tu aporte
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl mx-auto font-serif">
            El Proseminario 2026/2027 está integrado por personas de distintas provincias de Argentina y países limítrofes, acompañadas por un equipo pastoral dedicado.
          </p>
        </div>

        {/* Sacerdotes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h4 className="font-serif-sacred font-bold text-lg text-stone-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <span>Equipo Sacerdotal ({priests.length})</span>
            </h4>
            <span className="text-xs text-amber-900 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Telma, Luis y Nicolás (Coordinadores) • Pablo y Viviane (Consejeros)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {priests.map(priest => (
              <div
                key={priest.id}
                className="bg-white rounded-2xl border border-amber-200 p-4 shadow-2xs hover:shadow-xs transition-shadow text-center space-y-2"
              >
                <img
                  src={priest.avatar}
                  alt={priest.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-amber-300 shadow-xs"
                />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm font-serif">{priest.name}</h5>
                  <span className="text-[10px] text-amber-900 font-semibold block">
                    {priest.priestRole === 'coordinador' ? 'Sacerdote Coordinador' : 'Sacerdote Consejero'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2 italic font-serif">
                  {priest.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 17 Real Students Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h4 className="font-serif-sacred font-bold text-lg text-stone-900 flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <span>Integrantes del Proseminario ({students.length})</span>
            </h4>
            <span className="text-xs text-emerald-900 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              17 Participantes Reales
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {students.map(student => (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-stone-200 p-3 text-center space-y-1.5 shadow-2xs hover:border-emerald-300 transition-colors"
              >
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover mx-auto border border-stone-200"
                />
                <h6 className="font-bold text-stone-900 text-xs font-serif leading-tight">
                  {student.name}
                </h6>
                <span className="text-[10px] text-stone-400 block truncate">
                  {student.locality}
                </span>
                {student.role === 'coordinador' && (
                  <span className="inline-block text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                    Responsable
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO COLABORAR & REGISTRO DE APORTES */}
      <section id="donar" className="py-16 sm:py-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF6EE] border-t border-b border-amber-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <Gift className="w-4 h-4 text-amber-700" />
              <span>Canales Oficiales y Directos</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif-sacred text-stone-900">
              Elige cómo hacer tu contribución
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-serif">
              Puedes realizar una transferencia bancaria directa (CBU / Alias) o usar Mercado Pago. Luego, notifica tu aporte para sumarlo al contador.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Bank details (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-amber-300/80 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Datos Bancarios Oficiales</span>
              </div>

              {/* Alias Card */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Alias CBU / CVU</span>
                  <span className="text-base sm:text-lg font-bold text-stone-900 font-mono tracking-wide">
                    {fundraiser.aliasCbu}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(fundraiser.aliasCbu, 'alias')}
                  className="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-colors shadow-2xs"
                >
                  {copiedField === 'alias' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'alias' ? 'Copiado' : 'Copiar Alias'}</span>
                </button>
              </div>

              {/* CBU Card */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Número de CBU</span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 font-mono">
                    {fundraiser.cbuNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(fundraiser.cbuNumber, 'cbu')}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-colors"
                >
                  {copiedField === 'cbu' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'cbu' ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              {/* Account details */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1 font-serif">
                <p><strong>Titular:</strong> {fundraiser.titular}</p>
                <p><strong>Banco:</strong> {fundraiser.banco}</p>
                <p><strong>Destino:</strong> Fondo Solidario de Estudiantes del Proseminario</p>
              </div>

              {/* Mercado Pago Button */}
              <div className="pt-2">
                <a
                  href={fundraiser.mercadoPagoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#009EE3] hover:bg-[#0082ba] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors shadow-xs"
                >
                  <span>Aportar con Mercado Pago</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Col: Instant Donation / Notification Form (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs uppercase tracking-wider">
                <Gift className="w-4 h-4 text-amber-700" />
                <span>Registrar o Notificar tu Aporte</span>
              </div>
              <p className="text-xs text-stone-500 font-serif leading-relaxed">
                Si ya realizaste tu transferencia o deseas registrar tu compromiso de colaboración, completa este breve formulario para sumar tu aporte al contador público de la comunidad:
              </p>

              <form onSubmit={handleSubmitDonation} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Tu Nombre o Nombre de Familia
                  </label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    placeholder="Ej. Familia Martínez o María Elena"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                  />
                  <label className="flex items-center space-x-2 text-xs text-stone-600 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-amber-800 focus:ring-amber-500"
                    />
                    <span>Deseo que mi aporte figure como Anónimo en la cartelera</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Monto a Contribuir (ARS) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="1000"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[10000, 25000, 50000, 100000].map(sug => (
                      <button
                        type="button"
                        key={sug}
                        onClick={() => setDonationAmount(sug)}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-mono font-semibold transition-colors"
                      >
                        +{formatCurrency(sug)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Mensaje o Bendición para el Grupo (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                    placeholder="Que este viaje en Granja Épicos colme de fuerzas a los participantes..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-serif focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Confirmar y Sumar al Contador</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WALL OF GRATITUDE / RECENT CONTRIBUTIONS */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Comunidad Solidaria</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-stone-900">
              Muro de Gratitud y Aportes Recibidos
            </h3>
          </div>
          <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full font-mono font-semibold">
            {fundraiser.contributions.length} donaciones registradas
          </span>
        </div>

        {fundraiser.contributions.length === 0 ? (
          <div className="text-center py-12 px-6 bg-white rounded-3xl border border-stone-200/90 shadow-2xs space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
              <Heart className="w-7 h-7 text-amber-700" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="font-serif-sacred font-bold text-stone-900 text-lg">
                La campaña está comenzando
              </h4>
              <p className="text-xs text-stone-500 font-serif leading-relaxed">
                Sé de los primeros en colaborar con el fondo del viaje de inmersión. Tu aporte abrirá este muro y alentará a toda la comunidad.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsDonateModalOpen(true)}
              className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs inline-flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Gift className="w-4 h-4 text-amber-200" />
              <span>Hacer el Primer Aporte</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fundraiser.contributions.map((donation) => (
              <div
                key={donation.id}
                className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xs transition-shadow space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 text-xs sm:text-sm flex items-center space-x-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{donation.isAnonymous ? 'Donante Anónimo' : donation.donorName}</span>
                    </span>
                    <span className="font-bold text-amber-900 text-xs sm:text-sm font-mono">
                      {formatCurrency(donation.amount)}
                    </span>
                  </div>

                  {donation.message && (
                    <p className="text-xs text-stone-600 font-serif italic leading-relaxed bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100">
                      «{donation.message}»
                    </p>
                  )}
                </div>

                <span className="text-[10px] text-stone-400 block pt-1 border-t border-stone-100">
                  Registrado el {donation.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-20 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-stone-900">
              Respuestas a tus dudas sobre la campaña
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-[#FCFAF7] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-stone-900 text-sm flex items-center justify-between gap-4 hover:text-amber-900 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-amber-700 font-mono text-lg shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 font-serif leading-relaxed border-t border-stone-200/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-300 py-12 border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-800 text-amber-200 flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-sacred font-bold text-white text-base">
                  Comunidad de Cristianos — Proseminario 2027
                </h4>
                <p className="text-xs text-stone-400">
                  Movimiento para la Renovación Religiosa (Rama Antroposófica)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-stone-400">
              <a href="mailto:equipo.sacerdotes@proseminario.org" className="hover:text-amber-300 flex items-center space-x-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>equipo.sacerdotes@proseminario.org</span>
              </a>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5" />
                <span>+54 11 4782-1190</span>
              </span>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-400 space-y-2 font-serif">
            <p>
              Iniciativa impulsada por los estudiantes del Proseminario de la Comunidad de Cristianos para hacer posible el viaje de inmersión en Granja Épicos (11 al 20 de Enero).
            </p>
            <p className="text-[11px] text-stone-400 font-mono">
              Grupo de Estudiantes del Proseminario de la Comunidad de Cristianos • Buenos Aires, Argentina
            </p>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL PLAYER */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={fundraiser.videoTitle}
        subtitle="Testimonios de sacerdotes y estudiantes sobre el retiro en Granja Épicos"
        maxWidth="3xl"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-1 border-b border-stone-100">
            <div className="flex items-center space-x-2">
              <span className="text-stone-400 font-medium">Fuente:</span>
              <button
                type="button"
                onClick={() => setVideoSourceType('local')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  videoSourceType === 'local' 
                    ? 'bg-amber-800 text-white shadow-2xs' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Reproductor Directo (HD)
              </button>
              <button
                type="button"
                onClick={() => setVideoSourceType('drive')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  videoSourceType === 'drive' 
                    ? 'bg-amber-800 text-white shadow-2xs' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Google Drive
              </button>
            </div>

            <a
              href="https://drive.google.com/file/d/12zkYM2V17EQxHbh9HdTORKES05AkTieE/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="text-amber-800 hover:text-amber-900 font-semibold flex items-center space-x-1"
            >
              <span>Abrir en Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner flex items-center justify-center">
            {videoSourceType === 'local' ? (
              <video
                key="local-video"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                <source src="./video-inmersion.mp4" type="video/mp4" />
                Tu navegador no soporta reproducción directa de video.
              </video>
            ) : (
              <iframe
                key="drive-video"
                src="https://drive.google.com/file/d/12zkYM2V17EQxHbh9HdTORKES05AkTieE/preview"
                title="Video explicativo del viaje del Proseminario en Google Drive"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 font-serif leading-relaxed">
            <span className="font-bold text-stone-900 block mb-1">Sobre este video:</span>
            Los sacerdotes coordinadores (Telma, Luis, Nicolás) y consejeros (Pablo, Viviane) explican la trascendencia de la convivencia en la tierra y el Acto de Consagración diario para templar el alma en el camino sacerdotal antroposófico.
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setIsVideoModalOpen(false);
                setIsDonateModalOpen(true);
              }}
              className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Colaborar con el Fondo</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* QUICK DONATE MODAL (if triggered by button) */}
      <Modal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        title="Registrar o Simular Aporte"
        subtitle="Tu aporte se sumará al contador general"
        maxWidth="md"
      >
        <form onSubmit={handleSubmitDonation} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Nombre o Familia
            </label>
            <input
              type="text"
              required={!isAnonymous}
              disabled={isAnonymous}
              placeholder="Tu nombre o familia"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            />
            <label className="flex items-center space-x-2 text-xs text-stone-600 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-amber-800 focus:ring-amber-500"
              />
              <span>Deseo que figure como Anónimo</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Monto (ARS)
            </label>
            <input
              type="number"
              required
              min="1000"
              step="1000"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
              Mensaje o Bendición (Opcional)
            </label>
            <textarea
              rows={2}
              value={donationMessage}
              onChange={(e) => setDonationMessage(e.target.value)}
              placeholder="Mensaje de bendición o aliento..."
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-serif focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsDonateModalOpen(false)}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Confirmar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
