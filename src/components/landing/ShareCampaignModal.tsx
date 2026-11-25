import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { 
  MULTILINGUAL_DATA, 
  SupportedLanguage, 
  GET_SHARE_MESSAGE_WITH_LINK 
} from '../../data/multilingualBroadcast';
import { 
  MessageCircle, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  Globe 
} from 'lucide-react';

interface ShareCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const ShareCampaignModal: React.FC<ShareCampaignModalProps> = ({
  isOpen,
  onClose,
  showToast
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('es');
  const [copiedType, setCopiedType] = useState<'all' | 'link' | null>(null);

  const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://crowdfundingproseminario.vercel.app';
  const currentData = MULTILINGUAL_DATA[selectedLang];
  const fullShareText = GET_SHARE_MESSAGE_WITH_LINK(selectedLang, siteUrl);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(fullShareText);
      setCopiedType('all');
      showToast(`Mensaje oficial en ${currentData.name} copiado al portapapeles.`);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      showToast('No se pudo copiar automáticamente.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopiedType('link');
      showToast('Enlace web de la campaña copiado.');
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      showToast('No se pudo copiar el enlace.');
    }
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(fullShareText);
    const waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentData.headline,
          text: currentData.rawBroadcastText,
          url: siteUrl
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compartir Campaña del Proseminario"
      subtitle="Elige el idioma del mensaje para enviar por WhatsApp o copiar"
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Language Tabs */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>Seleccionar Idioma del Mensaje:</span>
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(MULTILINGUAL_DATA) as SupportedLanguage[]).map((langKey) => {
              const lang = MULTILINGUAL_DATA[langKey];
              const isSelected = selectedLang === langKey;
              return (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => setSelectedLang(langKey)}
                  className={`py-2.5 px-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                    isSelected
                      ? 'bg-amber-900 text-white border-amber-900 shadow-sm ring-2 ring-amber-700/20'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full sm:flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Compartir por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            className="w-full sm:w-auto py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            {copiedType === 'all' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-stone-600" />
            )}
            <span>{copiedType === 'all' ? '¡Mensaje Copiado!' : 'Copiar Texto'}</span>
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              title="Más opciones de compartir"
              className="w-full sm:w-auto p-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="sm:hidden">Más opciones</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            title="Copiar solo enlace web"
            className="w-full sm:w-auto p-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            {copiedType === 'link' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
            <span>{copiedType === 'link' ? 'Link Copiado' : 'Copiar Link'}</span>
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
            <span>VISTA PREVIA DEL MENSAJE ({currentData.nativeName.toUpperCase()}):</span>
            <span>Incluye datos bancarios + link oficial</span>
          </div>

          <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-amber-200/90 text-xs sm:text-[13px] text-stone-700 font-sans leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto shadow-inner select-all">
            {fullShareText}
          </div>
        </div>

        {/* Receipt quick notification hint */}
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600">📩</span>
            <span>
              <strong>Comprobantes al WhatsApp:</strong> Gabriela ({currentData.receiptSection.displayContact})
            </span>
          </div>
          <a
            href={`https://wa.me/${currentData.receiptSection.rawPhone}?text=${encodeURIComponent(currentData.receiptSection.whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-[11px] inline-flex items-center space-x-1 transition-colors"
          >
            <span>Abrir chat</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};
