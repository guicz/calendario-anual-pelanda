export type MonthData = {
  month: string;
  short: string;
  total: number;
  local: number;
  paid: number;
  focus: string;
  categories: string[];
  highlights: { date: string; location: string; event: string; category: string; paid: boolean }[];
};

export type UnitData = {
  tab: string;
  city: string;
  name: string;
  total: number;
  paid: number;
  local: number;
  months: number[];
};

export const sourceUrl = "https://docs.google.com/spreadsheets/d/1YGQpiiTS8J3thN9t0t4N8ITA2UqWJuwbXvdogTscrd4/edit?gid=1847905513#gid=1847905513";

export const months: MonthData[] = [
  { month: "Janeiro", short: "JAN", total: 14, local: 6, paid: 3, focus: "Férias, aniversários locais e acolhimento", categories: ["Comercial", "Aniversários", "Endomarketing"], highlights: [
    { date: "08/01", location: "São José dos Pinhais — Postos 27 e Juliane", event: "Aniversário do município", category: "Aniversário municipal", paid: true },
    { date: "18/01", location: "Jacarezinho — Posto Conexão", event: "14 anos do Posto Pelanda Conexão", category: "Aniversário de unidade", paid: false },
    { date: "20/01", location: "Palmital — Posto Rota Sul", event: "Fundação de Palmital e São Sebastião", category: "Cívico / Religioso", paid: false },
  ]},
  { month: "Fevereiro", short: "FEV", total: 8, local: 2, paid: 3, focus: "Carnaval, segurança e volta às aulas", categories: ["Comercial", "Segurança", "Aniversários"], highlights: [
    { date: "19/02", location: "Fazenda Rio Grande — Posto 22", event: "48 anos do Posto Pelanda 22", category: "Aniversário de unidade", paid: false },
    { date: "21/02", location: "Maracajá — Posto Perdigão", event: "3 anos do Posto Pelanda Perdigão", category: "Aniversário de unidade", paid: false },
  ]},
  { month: "Março", short: "MAR", total: 11, local: 3, paid: 2, focus: "Consumidor, Páscoa e pessoas", categories: ["Aniversários", "Institucional", "Comercial"], highlights: [
    { date: "03/03", location: "Palmital — Posto Rota Sul", event: "29 anos do Posto Pelanda Rota Sul", category: "Aniversário de unidade", paid: false },
    { date: "20/03", location: "São José dos Pinhais — Restaurante Juliane", event: "8 anos do Restaurante Juliane Pelanda", category: "Aniversário de unidade", paid: false },
  ]},
  { month: "Abril", short: "ABR", total: 13, local: 4, paid: 6, focus: "Feriados, Palmital e Jacarezinho", categories: ["Gastronomia", "Aniversários", "Sazonal"], highlights: [
    { date: "01/04", location: "Tijucas do Sul — Restaurante Pedro Pelanda", event: "8 anos do Restaurante Pedro Pelanda", category: "Aniversário de unidade", paid: false },
    { date: "02/04", location: "Jacarezinho — Posto Conexão", event: "Aniversário de Jacarezinho", category: "Aniversário municipal", paid: true },
    { date: "18/04", location: "Monte Castelo — Posto Residencial Fuck", event: "33 anos do Posto Residencial Fuck", category: "Aniversário de unidade", paid: false },
  ]},
  { month: "Maio", short: "MAI", total: 12, local: 3, paid: 5, focus: "Trabalho, mães, trânsito e festas de SC", categories: ["Endomarketing", "Segurança", "Cultura"], highlights: [
    { date: "12/05", location: "Maracajá — Posto Perdigão", event: "Aniversário de Maracajá", category: "Aniversário municipal", paid: true },
    { date: "15/05", location: "Monte Castelo — Residencial Fuck", event: "Aniversário de Monte Castelo / Festa do Tropeiro", category: "Aniversário / Tradicional", paid: true },
  ]},
  { month: "Junho", short: "JUN", total: 9, local: 2, paid: 3, focus: "Inverno, festas juninas e agro", categories: ["Sazonal", "ESG", "Aniversários"], highlights: [
    { date: "28/06", location: "São José dos Pinhais — Posto 27", event: "10 anos do Posto Pelanda 27", category: "Aniversário de unidade", paid: false },
    { date: "Junho", location: "Arapoti — Paranazão", event: "Dia da Imigração Holandesa / Open Day", category: "Cultural / Agro", paid: false },
  ]},
  { month: "Julho", short: "JUL", total: 12, local: 7, paid: 5, focus: "Férias, motorista e eventos locais", categories: ["Turismo", "Aniversários", "Relacionamento"], highlights: [
    { date: "14/07", location: "Arapoti — Posto Paranazão", event: "1 ano do Posto Pedro Pelanda Paranazão", category: "Aniversário de unidade", paid: false },
    { date: "14/07", location: "Arapoti — Restaurante Paranazão", event: "1 ano do Restaurante Paranazão", category: "Aniversário de unidade", paid: false },
    { date: "15/07", location: "Quatiguá — Posto Quatiguá", event: "7 anos do Posto Pelanda Quatiguá", category: "Aniversário de unidade", paid: false },
  ]},
  { month: "Agosto", short: "AGO", total: 13, local: 8, paid: 4, focus: "Religiosidade, café e manutenção", categories: ["Turismo", "Serviço", "Aniversários"], highlights: [
    { date: "01–06/08", location: "Siqueira Campos — Cana Verde", event: "Festa do Senhor Bom Jesus da Cana Verde", category: "Religioso / Turismo", paid: true },
    { date: "04/08", location: "Wenceslau Braz — Posto Cristo Rei II", event: "1 ano do Posto Pedro Pelanda Cristo Rei II", category: "Aniversário de unidade", paid: false },
    { date: "11/08", location: "Wenceslau Braz — Restaurante Cristo Rei II", event: "1 ano do Restaurante Cristo Rei II", category: "Aniversário de unidade", paid: false },
  ]},
  { month: "Setembro", short: "SET", total: 9, local: 4, paid: 3, focus: "Trânsito, saúde mental e pertencimento", categories: ["Saúde", "Segurança", "Aniversários"], highlights: [
    { date: "23/09", location: "Siqueira Campos — Cana Verde", event: "Aniversário de Siqueira Campos", category: "Aniversário municipal", paid: true },
    { date: "25/09", location: "São José dos Pinhais — Restaurante Pelanda 27", event: "10 anos do Restaurante Pelanda 27", category: "Aniversário de unidade", paid: false },
    { date: "30/09", location: "Piên — Restaurante Piên", event: "2 anos do Restaurante Piên", category: "Aniversário de unidade", paid: false },
  ]},
  { month: "Outubro", short: "OUT", total: 10, local: 4, paid: 3, focus: "Crianças, prevenção e comércio local", categories: ["Saúde", "Aniversários", "Pet friendly"], highlights: [
    { date: "02/10", location: "Piên — Posto Piên", event: "8 anos do Posto Pelanda Piên", category: "Aniversário de unidade", paid: false },
    { date: "26/10", location: "Quatiguá — Posto Quatiguá", event: "Aniversário de Quatiguá", category: "Aniversário municipal", paid: true },
    { date: "31/10", location: "Tijucas do Sul — Posto Pedro Pelanda", event: "15 anos do Posto Pedro Pelanda", category: "Aniversário de unidade", paid: false },
  ]},
  { month: "Novembro", short: "NOV", total: 8, local: 3, paid: 4, focus: "Black Friday e aniversários municipais", categories: ["Aniversários", "Saúde", "Comercial"], highlights: [
    { date: "01/11", location: "Piên — Posto Piên", event: "Aniversário de Piên", category: "Aniversário municipal", paid: true },
    { date: "16/11", location: "Tijucas do Sul — Posto Pedro Pelanda", event: "Aniversário de Tijucas do Sul", category: "Aniversário municipal", paid: true },
    { date: "26/11", location: "Wenceslau Braz — Cristo Rei II", event: "Aniversário de Wenceslau Braz", category: "Aniversário municipal", paid: true },
  ]},
  { month: "Dezembro", short: "DEZ", total: 9, local: 3, paid: 5, focus: "Natal, pico rodoviário e Arapoti", categories: ["Comercial", "Segurança", "Família"], highlights: [
    { date: "05/12", location: "Mandirituba — Posto 36", event: "5 anos do Posto Pelanda 36", category: "Aniversário de unidade", paid: false },
    { date: "18/12", location: "Arapoti — Paranazão", event: "Aniversário de Arapoti / Festa do Peão", category: "Aniversário / Rodeio", paid: true },
    { date: "Dezembro", location: "São José dos Pinhais — Postos 27 e Juliane", event: "Casa do Papai Noel / Natal municipal", category: "Turismo / Família", paid: true },
  ]},
];

export const units: UnitData[] = [
  { tab: "Piên", city: "Piên/PR", name: "Posto Piên", total: 82, paid: 27, local: 3, months: [8, 6, 8, 9, 9, 7, 5, 5, 6, 7, 6, 6] },
  { tab: "Palmital", city: "Palmital/SP", name: "Posto Rota Sul", total: 84, paid: 27, local: 5, months: [10, 6, 9, 10, 9, 7, 6, 5, 5, 6, 5, 6] },
  { tab: "Quatiguá", city: "Quatiguá/PR", name: "Posto Quatiguá", total: 81, paid: 27, local: 2, months: [8, 6, 8, 9, 9, 7, 6, 5, 5, 7, 5, 6] },
  { tab: "Jacarezinho", city: "Jacarezinho/PR", name: "Posto Conexão", total: 82, paid: 28, local: 3, months: [9, 6, 8, 10, 9, 7, 5, 6, 5, 6, 5, 6] },
  { tab: "Maracajá", city: "Maracajá/SC", name: "Posto Perdigão", total: 84, paid: 28, local: 5, months: [8, 7, 8, 9, 10, 7, 6, 7, 5, 6, 5, 6] },
  { tab: "Mandirituba", city: "Mandirituba/PR", name: "Posto 36", total: 81, paid: 27, local: 2, months: [8, 6, 8, 9, 9, 7, 6, 5, 5, 6, 5, 7] },
  { tab: "Tijucas do Sul", city: "Tijucas do Sul/PR", name: "Posto Pedro Pelanda", total: 82, paid: 27, local: 3, months: [8, 6, 8, 10, 9, 7, 5, 5, 5, 7, 6, 6] },
  { tab: "Monte Castelo", city: "Monte Castelo/SC", name: "Posto Residencial Fuck", total: 82, paid: 27, local: 3, months: [8, 6, 8, 10, 11, 7, 5, 5, 5, 6, 5, 6] },
  { tab: "SJP - Juliane", city: "São José dos Pinhais/PR", name: "Posto Juliane Pelanda", total: 84, paid: 29, local: 5, months: [9, 6, 10, 9, 9, 7, 5, 5, 6, 6, 5, 7] },
  { tab: "SJP - Posto 27", city: "São José dos Pinhais/PR", name: "Posto 27", total: 85, paid: 29, local: 6, months: [9, 6, 9, 9, 9, 8, 5, 5, 7, 6, 5, 7] },
  { tab: "Fazenda Rio Grande", city: "Fazenda Rio Grande/PR", name: "Posto 22", total: 81, paid: 27, local: 2, months: [9, 7, 8, 9, 9, 7, 5, 5, 5, 6, 5, 6] },
  { tab: "Arapoti", city: "Arapoti/PR", name: "Posto Paranazão", total: 83, paid: 27, local: 4, months: [8, 6, 8, 9, 9, 8, 7, 5, 5, 6, 5, 7] },
  { tab: "Wenceslau Braz", city: "Wenceslau Braz/PR", name: "Cristo Rei II", total: 83, paid: 27, local: 4, months: [9, 6, 8, 9, 9, 7, 5, 7, 5, 6, 6, 6] },
  { tab: "Siqueira Campos", city: "Siqueira Campos/PR", name: "Cana Verde", total: 85, paid: 30, local: 6, months: [8, 6, 8, 9, 9, 7, 6, 8, 6, 7, 5, 6] },
];
