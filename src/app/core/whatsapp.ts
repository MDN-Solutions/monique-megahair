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

/** Perfil do Instagram (vazio se o usuário não estiver preenchido). */
export const instagramUrl = (): string =>
  SITE.contact.instagram ? `https://www.instagram.com/${SITE.contact.instagram}/` : '';

/** 5581985466153 -> (81) 98546-6153 */
export function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('55') && d.length >= 12) d = d.slice(2);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return raw;
}
