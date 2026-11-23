export type SupportedLanguage = 'es' | 'de' | 'pt';

export interface LanguageContent {
  id: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  headline: string;
  intro: string;
  immersion: string;
  callToAction: string;
  howToCollabTitle: string;
  arsSection: {
    title: string;
    holderLabel: string;
    holderValue: string;
    bankLabel: string;
    bankValue: string;
    cbuLabel: string;
    cbuValue: string;
    aliasLabel: string;
    aliasValue: string;
  };
  usdSection: {
    title: string;
    cbuLabel: string;
    cbuValue: string;
    aliasLabel: string;
    aliasValue: string;
  };
  paypalSection: {
    title: string;
    recipientLabel: string;
    recipientValue: string;
  };
  receiptSection: {
    instruction: string;
    displayContact: string;
    rawPhone: string;
    whatsappMessage: string;
  };
  closingThanks: string;
  rawBroadcastText: string;
}

export const MULTILINGUAL_DATA: Record<SupportedLanguage, LanguageContent> = {
  es: {
    id: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇦🇷',
    headline: '🌱 Ayudanos a hacer crecer el impulso del Proseminario Latinoamericano',
    intro: 'El Proseminario es un espacio de formación, encuentro y profundización en la Antroposofía y el camino de la Comunidad de Cristianos.',
    immersion: 'En enero tenemos una inmersión y estamos realizando actividades y difusión para recaudar fondos.',
    callToAction: 'Cada contribución, grande o pequeña, es una forma de acompañar y hacer posible este camino. ❤️',
    howToCollabTitle: '¿Cómo podés colaborar?',
    arsSection: {
      title: '🇦🇷 Donaciones en pesos argentinos',
      holderLabel: 'Titular',
      holderValue: 'María Cecilia Fernanda Madero',
      bankLabel: 'Banco',
      bankValue: 'Brubank',
      cbuLabel: 'CBU',
      cbuValue: '1430001713043355500012',
      aliasLabel: 'Alias',
      aliasValue: 'secretaria.rectoria'
    },
    usdSection: {
      title: '💵 Donaciones en dólares',
      cbuLabel: 'CBU',
      cbuValue: '1430001714043355500020',
      aliasLabel: 'Alias',
      aliasValue: 'secretaria.rec.usd'
    },
    paypalSection: {
      title: '🌎 Donaciones desde el exterior vía PayPal',
      recipientLabel: 'Destinatario',
      recipientValue: 'proseminariolatinoamericano@comunidaddecristianos.org'
    },
    receiptSection: {
      instruction: '📩 Una vez realizado el aporte, enviá el comprobante al',
      displayContact: '223 526 3962 Gabriela',
      rawPhone: '5492235263962',
      whatsappMessage: 'Hola Gabriela, te envío el comprobante de mi donación para el viaje de inmersión del Proseminario Latinoamericano.'
    },
    closingThanks: 'Gracias por ser parte y ayudar a sostener este impulso.',
    rawBroadcastText: `🌱 Ayudanos a hacer crecer el impulso del Proseminario Latinoamericano

El Proseminario es un espacio de formación, encuentro y profundización en la Antroposofía y el camino de la Comunidad de Cristianos.

En enero tenemos una inmersión y estamos realizando actividades y difusión para recaudar fondos.

Cada contribución, grande o pequeña, es una forma de acompañar y hacer posible este camino. ❤️

¿Cómo podés colaborar?
🇦🇷 Donaciones en pesos argentinos 
Titular: María Cecilia Fernanda Madero  
Banco: Brubank  
CBU: 1430001713043355500012  
Alias: secretaria.rectoria

💵 Donaciones en dólares
CBU: 1430001714043355500020  
Alias: secretaria.rec.usd

🌎 Donaciones desde el exterior vía PayPal
Destinatario: proseminariolatinoamericano@comunidaddecristianos.org

📩 Una vez realizado el aporte, enviá el comprobante al 223 526 3962 Gabriela 

Gracias por ser parte y ayudar a sostener este impulso.`
  },

  de: {
    id: 'de',
    name: 'Alemán',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    headline: '🌱 Helfen Sie mit, den Impuls des Lateinamerikanischen Proseminars wachsen zu lassen',
    intro: 'Das Proseminar ist ein Ort der Ausbildung, der Begegnung und der Vertiefung in die Anthroposophie und den Weg der Christengemeinschaft.',
    immersion: 'Im Januar findet eine Immersion statt. Dafür organisieren wir verschiedene Aktivitäten und Öffentlichkeitsarbeit, um Spenden zu sammeln.',
    callToAction: 'Jeder Beitrag, ob groß oder klein, ist eine Möglichkeit, diesen Weg zu begleiten und mitzugestalten. ❤️',
    howToCollabTitle: 'Wie können Sie unterstützen?',
    arsSection: {
      title: '🇦🇷 Spenden in argentinischen Pesos',
      holderLabel: 'Kontoinhaberin',
      holderValue: 'María Cecilia Fernanda Madero',
      bankLabel: 'Bank',
      bankValue: 'Brubank',
      cbuLabel: 'CBU',
      cbuValue: '1430001713043355500012',
      aliasLabel: 'Alias',
      aliasValue: 'secretaria.rectoria'
    },
    usdSection: {
      title: '💵 Spenden in US-Dollar',
      cbuLabel: 'CBU',
      cbuValue: '1430001714043355500020',
      aliasLabel: 'Alias',
      aliasValue: 'secretaria.rec.usd'
    },
    paypalSection: {
      title: '🌎 Spenden aus dem Ausland via PayPal',
      recipientLabel: 'Empfänger',
      recipientValue: 'proseminariolatinoamericano@comunidaddecristianos.org'
    },
    receiptSection: {
      instruction: '📩 Bitte senden Sie nach Ihrer Spende den Zahlungsbeleg an',
      displayContact: '223 526 3962 Gabriela',
      rawPhone: '5492235263962',
      whatsappMessage: 'Hallo Gabriela, hier ist mein Zahlungsbeleg für die Unterstützung des Lateinamerikanischen Proseminars.'
    },
    closingThanks: 'Vielen Dank, dass Sie Teil dieses Weges sind und helfen, diesen Impuls zu tragen!',
    rawBroadcastText: `🌱 Helfen Sie mit, den Impuls des Lateinamerikanischen Proseminars wachsen zu lassen

Das Proseminar ist ein Ort der Ausbildung, der Begegnung und der Vertiefung in die Anthroposophie und den Weg der Christengemeinschaft.

Im Januar findet eine Immersion statt. Dafür organisieren wir verschiedene Aktivitäten und Öffentlichkeitsarbeit, um Spenden zu sammeln.

Jeder Beitrag, ob groß oder klein, ist eine Möglichkeit, diesen Weg zu begleiten und mitzugestalten. ❤️

Wie können Sie unterstützen?

🇦🇷 Spenden in argentinischen Pesos
Kontoinhaberin: María Cecilia Fernanda Madero  
Bank: Brubank  
CBU: 1430001713043355500012  
Alias: secretaria.rectoria

💵 Spenden in US-Dollar
CBU: 1430001714043355500020  
Alias: secretaria.rec.usd

🌎 Spenden aus dem Ausland via PayPal  
Empfänger: proseminariolatinoamericano@comunidaddecristianos.org

📩 Bitte senden Sie nach Ihrer Spende den Zahlungsbeleg an 223 526 3962 Gabriela 

Vielen Dank, dass Sie Teil dieses Weges sind und helfen, diesen Impuls zu tragen!`
  },

  pt: {
    id: 'pt',
    name: 'Portugués',
    nativeName: 'Português',
    flag: '🇧🇷',
    headline: '🌱 Ajude-nos a fazer crescer o impulso do Proseminário Latino-Americano',
    intro: 'O Proseminário é um espaço de formação, encontro e aprofundamento na Antroposofia e no caminho da Comunidade de Cristãos.',
    immersion: 'Em janeiro teremos uma imersão e estamos realizando atividades e ações de divulgação para arrecadar fundos.',
    callToAction: 'Cada contribuição, grande ou pequena, é uma forma de acompanhar e tornar este caminho possível. ❤️',
    howToCollabTitle: 'Como você pode colaborar?',
    arsSection: {
      title: '🇦🇷 Doações em pesos argentinos',
      holderLabel: 'Titular da conta',
      holderValue: 'María Cecilia Fernanda Madero',
      bankLabel: 'Banco',
      bankValue: 'Brubank',
      cbuLabel: 'CBU',
      cbuValue: '1430001713043355500012',
      aliasLabel: 'Alias',
      aliasValue: 'secretaria.rectoria'
    },
    usdSection: {
      title: '💵 Doações em dólares',
      cbuLabel: 'CBU',
      cbuValue: '1430001714043355500020',
      aliasLabel: 'Alias',
      aliasValue: 'secretaria.rec.usd'
    },
    paypalSection: {
      title: '🌎 Doações do exterior via PayPal',
      recipientLabel: 'Destinatário',
      recipientValue: 'proseminariolatinoamericano@comunidaddecristianos.org'
    },
    receiptSection: {
      instruction: '📩 Após realizar a contribuição, envie o comprovante para',
      displayContact: '223 526 3962 Gabriela',
      rawPhone: '5492235263962',
      whatsappMessage: 'Olá Gabriela, estou enviando o comprovante da minha doação para a imersão do Proseminário Latino-Americano.'
    },
    closingThanks: 'Obrigado por fazer parte e ajudar a sustentar este impulso!',
    rawBroadcastText: `🌱 Ajude-nos a fazer crescer o impulso do Proseminário Latino-Americano

O Proseminário é um espaço de formação, encontro e aprofundamento na Antroposofia e no caminho da Comunidade de Cristãos.

Em janeiro teremos uma imersão e estamos realizando atividades e ações de divulgação para arrecadar fundos.

Cada contribuição, grande ou pequena, es uma forma de acompanhar e tornar este caminho possível. ❤️

Como você pode colaborar?

🇦🇷 Doações em pesos argentinos  
Titular da conta: María Cecilia Fernanda Madero  
Banco: Brubank  
CBU: 1430001713043355500012  
Alias: secretaria.rectoria

💵 Doações em dólares  
CBU: 1430001714043355500020  
Alias: secretaria.rec.usd

🌎 Doações do exterior via PayPal  
Destinatário: proseminariolatinoamericano@comunidaddecristianos.org

📩 Após realizar a contribuição, envie o comprovante para 223 526 3962 Gabriela.

Obrigado por fazer parte e ajudar a sustentar este impulso!`
  }
};

export const GET_SHARE_MESSAGE_WITH_LINK = (lang: SupportedLanguage, siteUrl: string): string => {
  const content = MULTILINGUAL_DATA[lang];
  return `${content.rawBroadcastText}\n\n🔗 Web Oficial y Campaña en Vivo:\n${siteUrl}`;
};
