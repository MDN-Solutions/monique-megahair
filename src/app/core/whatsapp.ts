import { SITE } from './site.config';

/**
 * Link do WhatsApp com mensagem pré-preenchida.
 * Enquanto o número do estúdio não for informado, os botões levam à seção de contato
 * (assim nenhum botão fica quebrado).
 */
export function whatsappUrl(message: string = SITE.contact.whatsappMessage): string {
  const number = SITE.contact.whatsapp.replace(/\D/g, '');
  if (!number) return '#contato';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const hasWhatsapp = (): boolean => SITE.contact.whatsapp.replace(/\D/g, '').length > 0;
