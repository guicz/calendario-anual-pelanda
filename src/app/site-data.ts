export type Unit = {
  slug: string;
  name: string;
  city: string;
  state: string;
  address: string;
  hours: string;
  phone: string;
  foundation: string;
  intro: string;
  route: string;
  services: string[];
  highlights: string;
  food: string;
  mapsUrl?: string;
};

export const units: Unit[] = [
  {
    slug: "posto-pien",
    name: "Posto Piên",
    city: "Piên",
    state: "PR",
    address: "Rodovia PR-281, km 32, Fernandes — Piên/PR, CEP 83860-000",
    hours: "Posto, alimentação e conveniência abertos 24 horas. Borracharia em horário comercial.",
    phone: "(41) 3632-1756",
    foundation: "02/10/2019",
    intro: "Na PR-281, perto do acesso a Piên, esta unidade atende as rotas entre Curitiba, São Bento do Sul, o litoral e os portos.",
    route: "Próximo à Arauco e ao trevo de acesso à cidade de Piên.",
    services: ["Alimentação", "Lanchonete", "Conveniência", "Loja de presentes", "Wi-Fi", "Banho", "Borracharia", "Troca de óleo", "Estacionamento"],
    highlights: "Posto, alimentação e conveniência funcionam 24 horas. A borracharia atende em horário comercial.",
    food: "Operação de alimentação no mesmo endereço, com funcionamento informado de 24 horas.",
    mapsUrl: "https://maps.app.goo.gl/rWpQwYohv7UNcVng8",
  },
  {
    slug: "posto-rota-sul",
    name: "Posto Rota Sul",
    city: "Palmital",
    state: "SP",
    address: "Rodovia SP-270, km 420 — Palmital/SP",
    hours: "Horário de funcionamento a confirmar.",
    phone: "A confirmar",
    foundation: "03/03/1998",
    intro: "Às margens da SP-270, esta é a unidade da Rede Pedro Pelanda em Palmital, no interior de São Paulo.",
    route: "Localizado no km 420 da Rodovia Raposo Tavares, em Palmital.",
    services: ["Alimentação", "Autoelétrica", "Mecânica", "Banheiros", "Troca de óleo"],
    highlights: "O posto fica no km 420 da Rodovia Raposo Tavares. A Parada Rota Sul funciona no mesmo endereço e atende 24 horas.",
    food: "A Parada Rota Sul funciona no mesmo endereço. O questionário recebido informa atendimento 24 horas.",
    mapsUrl: "https://maps.app.goo.gl/V93PoKpDDDCTBEeJ9",
  },
  {
    slug: "posto-quatigua",
    name: "Posto Quatiguá",
    city: "Quatiguá",
    state: "PR",
    address: "PR-092, km 297,5 — Quatiguá/PR",
    hours: "Aberto 24 horas.",
    phone: "(41) 3608-1226",
    foundation: "15/07/2020",
    intro: "No km 297,5 da PR-092, o Posto Quatiguá reúne descanso e serviços para o caminhão.",
    route: "No sentido sul, o acesso é mais direto. No sentido norte, é necessário utilizar o retorno.",
    services: ["Conveniência", "Loja de presentes", "Wi-Fi", "Sala de descanso", "Água quente e gelada", "Banho", "Borracharia", "Autoelétrica", "Mecânica", "Troca de óleo", "Lavação de caminhões", "Estacionamento"],
    highlights: "O local tem sala de descanso, duchas, lavação, borracharia, oficina e pátio para veículos pesados.",
    food: "O restaurante existente no local é operado por terceiros e não faz parte da Rede Pedro Pelanda.",
    mapsUrl: "https://maps.app.goo.gl/92jXXmnAiQuEz5i28",
  },
  {
    slug: "posto-conexao",
    name: "Posto Conexão",
    city: "Jacarezinho",
    state: "PR",
    address: "BR-153, km 8,5, Parque Industrial — Jacarezinho/PR, CEP 86400-000",
    hours: "Aberto 24 horas, todos os dias.",
    phone: "(14) 99132-8939",
    foundation: "18/01/2013",
    intro: "O Posto Conexão fica na BR-153, entre Jacarezinho e Ourinhos, em uma rota que liga diferentes regiões do país.",
    route: "Unidade localizada entre Jacarezinho e Ourinhos. O acesso detalhado em cada sentido deve ser confirmado.",
    services: ["Conveniência", "Água quente e gelada", "Banheiros", "Banheiro adaptado", "Borracharia", "Estacionamento"],
    highlights: "A unidade funciona 24 horas e oferece conveniência, borracharia, banheiros e estacionamento.",
    food: "O restaurante existente no local é operado por terceiros e não faz parte da Rede Pedro Pelanda.",
    mapsUrl: "https://maps.app.goo.gl/knooia2KR7gAq2JX9",
  },
  {
    slug: "posto-perdigao",
    name: "Posto Perdigão",
    city: "Maracajá",
    state: "SC",
    address: "BR-101, km 403, nº 20, São Cristóvão — Maracajá/SC, CEP 88915-000",
    hours: "Aberto 24 horas.",
    phone: "(41) 3627-8100 · (47) 99198-6911",
    foundation: "21/02/2024",
    intro: "Na BR-101, em Maracajá, o Posto Perdigão atende caminhoneiros, viajantes e famílias durante 24 horas.",
    route: "No sentido Rio Grande do Sul, o acesso é direto. No sentido São Paulo, o retorno fica a cerca de 2 km.",
    services: ["Alimentação", "Lanchonete", "Conveniência", "Wi-Fi", "Sala de descanso", "Banho", "Borracharia", "Troca de óleo", "Estacionamento", "Acessibilidade"],
    highlights: "Alimentação, conveniência, duchas, borracharia e troca de óleo ficam no mesmo endereço.",
    food: "A Parada Perdigão é uma operação da rede no mesmo endereço.",
    mapsUrl: "https://maps.app.goo.gl/LJVwsWV5Ty8HRKDC9",
  },
  {
    slug: "posto-36",
    name: "Posto 36",
    city: "Mandirituba",
    state: "PR",
    address: "BR-116, km 136 — Mandirituba/PR",
    hours: "Aberto 24 horas.",
    phone: "A confirmar",
    foundation: "05/12/2022",
    intro: "No km 136 da BR-116, em Mandirituba, o Posto 36 funciona 24 horas.",
    route: "Localizado no km 136 da BR-116, em Mandirituba.",
    services: ["Alimentação", "Lanchonete", "Autoelétrica", "Borracharia", "Banho", "Troca de óleo"],
    highlights: "O local reúne lanchonete, banhos e serviços de borracharia, elétrica e troca de óleo.",
    food: "A operação de alimentação no local foi identificada como terceirizada. Essa relação será apresentada com clareza.",
    mapsUrl: "https://maps.app.goo.gl/CbvXK5g6BCwhztcg8",
  },
  {
    slug: "posto-pedro-pelanda",
    name: "Posto Pedro Pelanda",
    city: "Tijucas do Sul",
    state: "PR",
    address: "BR-376, km 641 — Tijucas do Sul/PR",
    hours: "Aberto 24 horas.",
    phone: "A confirmar",
    foundation: "31/10/2012",
    intro: "No km 641 da BR-376, em Tijucas do Sul, a unidade funciona 24 horas e tem área de descanso para caminhoneiros.",
    route: "Localizado no km 641 da BR-376, em Tijucas do Sul.",
    services: ["Alimentação", "Lanchonete", "Borracharia", "Loja de presentes", "Banho", "Sala do caminhoneiro", "Área de descanso", "Wi-Fi", "Troca de óleo"],
    highlights: "Alimentação, lanchonete, banhos, sala do caminhoneiro e troca de óleo para veículos pesados ficam no local.",
    food: "A Parada Pedro Pelanda é uma operação da rede no mesmo endereço.",
    mapsUrl: "https://maps.app.goo.gl/Y1cEX2x53UvfMLfy8",
  },
  {
    slug: "posto-residencia-fuck",
    name: "Posto Residência Fuck",
    city: "Monte Castelo",
    state: "SC",
    address: "BR-116, km 99, Residência Fuck — Monte Castelo/SC, CEP 89397-000",
    hours: "Posto aberto 24 horas. Serviços parceiros têm horários próprios.",
    phone: "(41) 3608-1226",
    foundation: "18/04/1994",
    intro: "Na BR-116, perto da Serra do Espigão, esta unidade recebe caminhoneiros que percorrem rotas nacionais e internacionais.",
    route: "Próximo à Serra do Espigão e após a praça de pedágio de Monte Castelo.",
    services: ["Wi-Fi", "Sala de descanso", "Água quente e gelada", "Banho", "Acessibilidade", "Borracharia", "Autoelétrica", "Troca de óleo", "Lavação de caminhões", "Estacionamento"],
    highlights: "O posto funciona 24 horas. Há sala de descanso, duchas, lavação, serviços para o caminhão e pátio amplo.",
    food: "O restaurante no local é operado por terceiros e não faz parte da Rede Pedro Pelanda.",
    mapsUrl: "https://maps.app.goo.gl/otgskiBVrM1GYw317",
  },
  {
    slug: "posto-juliane-pelanda",
    name: "Posto Juliane Pelanda",
    city: "São José dos Pinhais",
    state: "PR",
    address: "BR-376, km 633 — São José dos Pinhais/PR",
    hours: "Aberto 24 horas.",
    phone: "A confirmar",
    foundation: "Data do posto a confirmar",
    intro: "No km 633 da BR-376, o Posto Juliane Pelanda reúne abastecimento, alimentação e serviços para o veículo.",
    route: "Localizado no km 633 da BR-376, em São José dos Pinhais.",
    services: ["Alimentação", "Conveniência", "Loja de presentes", "Sala do caminhoneiro", "Wi-Fi", "Banho", "Troca de óleo", "Autoelétrica", "Borracharia"],
    highlights: "A unidade tem sala do caminhoneiro, conveniência, Wi-Fi, borracharia, elétrica e troca de óleo.",
    food: "A Parada Juliane Pelanda é uma operação da rede no mesmo endereço.",
    mapsUrl: "https://maps.app.goo.gl/psm495HzWoGb4p4k8",
  },
  {
    slug: "posto-27",
    name: "Posto 27",
    city: "São José dos Pinhais",
    state: "PR",
    address: "BR-376, km 626 — São José dos Pinhais/PR",
    hours: "Aberto 24 horas.",
    phone: "A confirmar",
    foundation: "28/06/2017",
    intro: "No km 626 da BR-376, o Posto 27 funciona 24 horas e concentra diferentes serviços no mesmo endereço.",
    route: "Localizado no km 626 da BR-376, em São José dos Pinhais.",
    services: ["Alimentação", "Conveniência", "Loja de presentes", "Banho", "Sala do caminhoneiro", "Wi-Fi", "Troca de óleo", "Autoelétrica", "Mecânica", "Borracharia"],
    highlights: "Alimentação, conveniência, banhos, sala do caminhoneiro e serviços mecânicos fazem parte da unidade.",
    food: "A Parada 27 é uma operação da rede no mesmo endereço.",
    mapsUrl: "https://maps.app.goo.gl/3rjubFooEryWdEsy7",
  },
  {
    slug: "posto-22",
    name: "Posto 22",
    city: "Fazenda Rio Grande",
    state: "PR",
    address: "Avenida das Américas, 2901, Gralha Azul — Fazenda Rio Grande/PR, CEP 83824-020",
    hours: "Posto diesel aberto 24 horas. Os demais horários precisam ser confirmados.",
    phone: "(41) 3608-1226",
    foundation: "19/02/1979",
    intro: "Em Fazenda Rio Grande, o Posto 22 guarda a origem da Rede Pedro Pelanda.",
    route: "Na Avenida das Américas, próximo à Havan e ao acesso da BR-116.",
    services: ["Acesso para cadeirantes", "Wi-Fi", "Água quente e gelada", "Banheiros", "Borracharia", "Autoelétrica", "Mecânica", "Troca de óleo", "Estacionamento", "Barbeiro", "Loja de presentes"],
    highlights: "Além do abastecimento, o local reúne serviços para o veículo, loja de presentes, barbeiro e pátio.",
    food: "O restaurante no local é operado por terceiros e não faz parte da Rede Pedro Pelanda.",
    mapsUrl: "https://maps.app.goo.gl/rHiWtYMpqYNJZ5DG7",
  },
  {
    slug: "posto-paranazao",
    name: "Posto Paranazão",
    city: "Arapoti",
    state: "PR",
    address: "Rodovia Governador Parigot de Souza (PR-092), km 217, Lagoa — Arapoti/PR, CEP 84990-000",
    hours: "Aberto 24 horas.",
    phone: "(41) 3608-1226",
    foundation: "Inauguração em 14/07/2026",
    intro: "Inaugurado em julho de 2026, o Paranazão fica no km 217 da PR-092, em Arapoti.",
    route: "O acesso no sentido sul é mais direto. No sentido norte, a travessia e a espera no acostamento precisam ser explicadas no mapa.",
    services: ["Alimentação", "Churrascaria", "Lanchonete", "Conveniência", "Loja de presentes", "Wi-Fi", "Banho", "Borracharia", "Mecânica", "Estacionamento"],
    highlights: "A unidade tem alimentação, churrascaria, lanchonete e pátio para veículos pesados.",
    food: "O Restaurante Paranazão é uma operação da rede no mesmo endereço e tem funcionamento informado de 24 horas.",
  },
  {
    slug: "posto-cristo-rei-ii",
    name: "Posto Cristo Rei II",
    city: "Wenceslau Braz",
    state: "PR",
    address: "Rodovia Governador Parigot de Souza (PR-092), km 269, Água Grande — Wenceslau Braz/PR, CEP 84950-000",
    hours: "Posto aberto 24 horas. Restaurante e lanchonete das 6h às 23h.",
    phone: "(41) 3608-1226",
    foundation: "Inauguração do posto em 04/08/2026",
    intro: "No km 269 da PR-092, o Cristo Rei II foi projetado para receber um grande volume de caminhões.",
    route: "O acesso no sentido norte é mais direto. No sentido sul, a orientação de entrada deve ser confirmada.",
    services: ["Alimentação", "Churrascaria aos domingos", "Lanchonete", "Conveniência", "Sala do caminhoneiro", "Wi-Fi", "Banho", "Borracharia", "Autoelétrica", "Mecânica", "Troca de óleo", "Estacionamento"],
    highlights: "Os materiais informam pátio para cerca de 500 caminhões e dois blocos com dez suítes de banho cada.",
    food: "O Restaurante Cristo Rei II é uma operação da rede, com inauguração prevista para 11/08/2026.",
  },
  {
    slug: "posto-cana-verde",
    name: "Posto Cana Verde",
    city: "Siqueira Campos",
    state: "PR",
    address: "Rodovia Governador Parigot de Souza, nº 1107 (PR-092), km 297, Nações — Siqueira Campos/PR, CEP 84940-000",
    hours: "Posto aberto 24 horas. Horários dos demais serviços precisam ser confirmados.",
    phone: "(41) 3608-1226",
    foundation: "Inauguração prevista para 18/08/2026",
    intro: "O Posto Cana Verde está previsto para abrir no km 297 da PR-092, em Siqueira Campos.",
    route: "O acesso no sentido sul é mais direto. No sentido norte, a orientação de entrada deve ser confirmada.",
    services: ["Lanchonete", "Conveniência", "Loja de presentes", "Wi-Fi", "Banho", "Acessibilidade", "Troca de óleo", "Estacionamento"],
    highlights: "A previsão é de atendimento 24 horas no posto. Os horários dos demais serviços ainda precisam ser fechados.",
    food: "A operação de alimentação e sua relação com a rede ainda precisam ser confirmadas antes da publicação.",
  },
];

export type Restaurant = {
  slug: string;
  name: string;
  address: string;
  hours: string;
  date: string;
  intro: string;
  title: string;
  about: string;
  review?: string;
};

export const restaurants: Restaurant[] = [
  { slug: "parada-27", name: "Parada 27", address: "BR-376, km 626 — São José dos Pinhais/PR", hours: "Aberto até as 23h", date: "Fundação em 25/09/2017", intro: "No km 626 da BR-376, a Parada 27 recebe quem passa por São José dos Pinhais.", title: "Alimentação junto ao Posto 27", about: "O restaurante fica no mesmo endereço do posto e tem funcionamento informado até as 23h." },
  { slug: "parada-juliane-pelanda", name: "Parada Juliane Pelanda", address: "BR-376, km 633 — São José dos Pinhais/PR", hours: "Aberto até as 23h", date: "Fundação em 20/03/2019", intro: "A Parada Juliane Pelanda fica no km 633 da BR-376, em São José dos Pinhais.", title: "Alimentação no km 633 da BR-376", about: "A operação funciona junto ao Posto Juliane Pelanda e atende até as 23h, conforme os materiais recebidos." },
  { slug: "parada-pedro-pelanda", name: "Parada Pedro Pelanda", address: "BR-376, km 641 — Tijucas do Sul/PR", hours: "Aberto até as 23h", date: "Fundação em 01/04/2019", intro: "Em Tijucas do Sul, a Parada Pedro Pelanda atende quem passa pelo km 641 da BR-376.", title: "Alimentação junto ao Posto Pedro Pelanda", about: "A unidade fica no mesmo endereço do posto. O horário informado vai até as 23h." },
  { slug: "parada-perdigao", name: "Parada Perdigão", address: "BR-101, km 403, nº 20 — Maracajá/SC", hours: "Aberto até as 23h", date: "Fundação em 24/08/2023", intro: "Na BR-101, em Maracajá, a Parada Perdigão funciona junto ao posto da rede.", title: "Uma pausa no caminho pelo sul de Santa Catarina", about: "O restaurante atende no mesmo endereço do Posto Perdigão. O horário informado vai até as 23h." },
  { slug: "parada-rota-sul", name: "Parada Rota Sul", address: "Rodovia SP-270, km 420 — Palmital/SP", hours: "Aberta 24 horas", date: "Fundação em 29/07/2025", intro: "A Parada Rota Sul fica no km 420 da Rodovia Raposo Tavares, em Palmital.", title: "Alimentação 24 horas na Rodovia Raposo Tavares", about: "A operação fica junto ao Posto Rota Sul e funciona 24 horas, segundo o questionário recebido.", review: "Confirmar o CEP, as coordenadas, as fotos e o perfil público no Google antes da publicação." },
  { slug: "parada-pien", name: "Parada Piên", address: "Rodovia PR-281, km 32 — Piên/PR", hours: "Funcionamento informado de 24 horas", date: "Fundação em 30/09/2025", intro: "Na PR-281, a Parada Piên atende motoristas, caminhoneiros e moradores da região.", title: "Alimentação aberto dia e noite em Piên", about: "O funcionamento informado é de 24 horas, no mesmo endereço do Posto Piên." },
  { slug: "restaurante-paranazao", name: "Restaurante Paranazão", address: "PR-092, km 217 — Arapoti/PR", hours: "Funcionamento informado de 24 horas", date: "Inauguração em 14/07/2026", intro: "No km 217 da PR-092, o Paranazão reúne restaurante, churrascaria e lanchonete.", title: "Uma parada ampla na PR-092", about: "O restaurante foi inaugurado em julho de 2026 e tem funcionamento informado de 24 horas." },
  { slug: "restaurante-cristo-rei-ii", name: "Restaurante Cristo Rei II", address: "PR-092, km 269 — Wenceslau Braz/PR", hours: "Das 6h às 23h", date: "Inauguração prevista para 11/08/2026", intro: "O restaurante do Cristo Rei II fica no km 269 da PR-092, em Wenceslau Braz.", title: "Alimentação diária e churrascaria aos domingos", about: "A abertura está prevista para 11 de agosto de 2026. O horário informado é das 6h às 23h.", review: "Confirmar abertura, cardápio, horários, contatos, acessibilidade, fotos e coordenadas antes da publicação." },
  { slug: "restaurante-cana-verde", name: "Restaurante Cana Verde", address: "PR-092, km 297 — Siqueira Campos/PR", hours: "Horário a confirmar", date: "Inauguração prevista para 25/08/2026", intro: "O restaurante previsto para o Cana Verde fica no km 297 da PR-092, em Siqueira Campos.", title: "Operação ainda em confirmação", about: "A relação da operação com a rede precisa ser confirmada antes da publicação.", review: "Não publicar esta página como operação confirmada antes da validação da equipe." },
];

export const newsItems = [
  { slug: "uma-boa-parada", category: "Na estrada", title: "Uma boa parada faz toda a diferença na viagem", excerpt: "Informações para planejar uma parada com mais tranquilidade, alimentação e apoio na estrada." },
  { slug: "gente-que-move-a-rede", category: "Gente que move", title: "Quem está sempre em movimento pode contar com a gente", excerpt: "As pessoas que fazem cada unidade funcionar todos os dias." },
  { slug: "um-ponto-de-apoio", category: "Unidades", title: "Seu ponto de apoio em cada novo caminho", excerpt: "Conheça as unidades e consulte os serviços antes de seguir viagem." },
];

const photoSequence = (folder: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${folder}/${String(index + 1).padStart(2, "0")}.jpg`);

export const unitPhotos: Record<string, string[]> = {
  "posto-pien": photoSequence("/media/units/posto-pien", 3),
  "posto-rota-sul": photoSequence("/media/units/posto-rota-sul", 1),
  "posto-perdigao": photoSequence("/media/units/posto-perdigao", 1),
  "posto-36": photoSequence("/media/units/posto-36", 3),
  "posto-pedro-pelanda": photoSequence("/media/units/posto-pedro-pelanda", 3),
  "posto-residencia-fuck": photoSequence("/media/units/posto-residencia-fuck", 3),
  "posto-juliane-pelanda": photoSequence("/media/units/posto-juliane-pelanda", 3),
  "posto-27": photoSequence("/media/units/posto-27", 3),
  "posto-22": photoSequence("/media/units/posto-22", 3),
  "posto-paranazao": photoSequence("/media/units/posto-paranazao", 3),
  "posto-cristo-rei-ii": photoSequence("/media/units/posto-cristo-rei-ii", 3),
  "posto-cana-verde": photoSequence("/media/units/posto-cana-verde", 3),
};

export const restaurantPhotos: Record<string, string[]> = {
  "parada-27": photoSequence("/media/restaurants/parada-27", 2),
  "parada-juliane-pelanda": ["/media/units/posto-juliane-pelanda/02.jpg", "/media/units/posto-juliane-pelanda/03.jpg"],
  "parada-pedro-pelanda": photoSequence("/media/restaurants/parada-pedro-pelanda", 2),
  "parada-perdigao": photoSequence("/media/restaurants/parada-perdigao", 1),
  "parada-rota-sul": photoSequence("/media/restaurants/parada-rota-sul", 1),
  "parada-pien": photoSequence("/media/restaurants/parada-pien", 2),
  "restaurante-paranazao": photoSequence("/media/restaurants/restaurante-paranazao", 2),
  "restaurante-cristo-rei-ii": photoSequence("/media/restaurants/restaurante-cristo-rei-ii", 1),
  "restaurante-cana-verde": photoSequence("/media/restaurants/restaurante-cana-verde", 1),
};

export const unitBySlug = (slug: string) => units.find((unit) => unit.slug === slug);
export const restaurantBySlug = (slug: string) => restaurants.find((restaurant) => restaurant.slug === slug);
export const newsBySlug = (slug: string) => newsItems.find((item) => item.slug === slug);
export const photosForUnit = (slug: string) => unitPhotos[slug] ?? [];
export const photosForRestaurant = (slug: string) => restaurantPhotos[slug] ?? [];
