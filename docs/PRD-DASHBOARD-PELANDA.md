# PRD — Dashboard Anual de Marketing Pedro Pelanda

**Status:** rascunho para validação humana  
**Versão:** 0.1  
**Data:** 26/08/2026  
**Produto:** `calendario-anual-pelanda`  
**Fonte inicial:** [Calendário de Marketing 360º 2027](https://docs.google.com/spreadsheets/d/1YGQpiiTS8J3thN9t0t4N8ITA2UqWJuwbXvdogTscrd4/edit?gid=1847905513#gid=1847905513)

## 1. Resumo

Construir um app web para apresentar o calendário anual de marketing da Rede Pedro Pelanda a clientes convidados, permitindo que cada cliente selecione as ações que deseja manter ou executar. Um painel administrativo interno permitirá revisar cada ação e marcar seu estado operacional:

- **Verde:** será feito;
- **Vermelho:** não será feito;
- **Amarelo:** em análise.

O app atual já entrega a primeira camada visual com visão anual, mensal e por unidade. A próxima fase é transformar o snapshot em um produto multi-cliente com acesso controlado e persistência no Firebase.

## 2. Objetivos

### Objetivos do MVP

1. Compartilhar uma versão identificada do calendário com um cliente específico.
2. Permitir entrada do cliente por um PIN temporário e revogável.
3. Permitir que o cliente selecione as ações que deseja manter/executar.
4. Permitir que o administrador defina o status operacional de cada ação.
5. Preservar histórico das escolhas e mudanças relevantes.
6. Manter as cores da marca ou do cliente quando forem fornecidas em formato aprovado.

### Fora do escopo inicial

- Execução automática de campanhas.
- Publicação automática em redes sociais.
- Gestão de orçamento, compra de mídia ou faturamento.
- Integração com Google Ads, Meta Ads ou CRM.
- Upload aberto de arquivos pelo cliente.
- Chat ou comentários em tempo real.
- Login administrativo por PIN.

## 3. Usuários e permissões

### Administrador interno

- Acessa o painel por autenticação administrativa do Firebase.
- Cria clientes e projetos.
- Importa ou revisa uma versão do calendário.
- Gera, expira e revoga códigos de acesso do cliente.
- Visualiza escolhas do cliente.
- Marca cada ação como verde, vermelho ou amarelo.
- Registra observação interna e histórico da alteração.

### Cliente convidado

- Acessa somente o projeto para o qual foi convidado.
- Entra por link do app e PIN válido.
- Visualiza a versão do calendário compartilhada.
- Filtra por ano, mês, unidade e categoria.
- Seleciona as ações que deseja manter/executar.
- Salva ou envia sua seleção para revisão.
- Não altera o status administrativo.
- Não acessa dados de outros clientes ou projetos.

## 4. Fluxos principais

### Fluxo A — Preparação interna

1. Administrador cria o cliente e um projeto de calendário.
2. Administrador importa ou associa uma versão da planilha.
3. Sistema cria um snapshot imutável da versão compartilhada.
4. Administrador configura identidade visual, prazo e PIN.
5. Sistema gera link de acesso e registra a validade do convite.

### Fluxo B — Seleção do cliente

1. Cliente abre o link recebido.
2. Informa o PIN.
3. Sistema valida o convite, aplica limite de tentativas e cria uma sessão restrita.
4. Cliente navega pelo ano, meses e unidades.
5. Cliente marca as ações que deseja manter.
6. Cliente salva rascunho ou envia a seleção para revisão.
7. Sistema registra data, versão e usuário convidado.

### Fluxo C — Revisão administrativa

1. Administrador abre o projeto e vê as escolhas do cliente.
2. Para cada ação, marca um status:
   - verde: será feito;
   - vermelho: não será feito;
   - amarelo: em análise.
3. Pode registrar uma observação interna.
4. Sistema registra autor, data, valor anterior e novo valor.
5. Cliente visualiza somente o status e as informações liberadas para ele.

## 5. Regras de negócio

1. A escolha do cliente e o status administrativo são campos diferentes.
2. O cliente pode selecionar uma ação sem que ela esteja aprovada internamente.
3. O status administrativo prevalece na leitura operacional do painel.
4. Ações vermelhas não devem desaparecer: continuam visíveis para auditoria e histórico.
5. O status amarelo é o estado inicial para itens ainda não decididos.
6. Toda alteração de status deve gerar histórico.
7. O calendário deve ser versionado; mudanças na planilha não podem alterar silenciosamente um projeto já enviado.
8. Datas ou eventos ainda não confirmados devem permanecer identificados como pendentes.
9. O sistema não deve inventar endereço, horário, contato, orçamento ou resultado de campanha.
10. A seleção do cliente deve ter estado explícito: rascunho, enviada para revisão ou encerrada.

## 6. Modelo funcional inicial

### Entidades

- **Client:** cliente, nome, organização, status, identidade visual.
- **Project:** calendário compartilhado, ano, cliente, versão, prazo e estado.
- **Action:** ação do calendário, mês, data, unidade, categoria, abrangência, conteúdo e mídia paga.
- **ClientSelection:** escolha do cliente por ação, autor, data e estado.
- **AdminDecision:** status verde/vermelho/amarelo, observação e histórico.
- **Invite:** código/PIN, projeto, validade, tentativas, revogação e último uso.
- **AuditEvent:** alterações relevantes, autor, timestamp e referência do registro.

### Estados sugeridos

**Projeto:** `draft`, `shared`, `client_submitted`, `under_review`, `approved`, `closed`.  
**Seleção:** `not_selected`, `selected`, `submitted`.  
**Decisão:** `analysis`, `approved`, `rejected`.

## 7. Direção técnica Firebase

- **Firebase Hosting:** hospedagem do app web.
- **Firebase Authentication:** autenticação dos administradores.
- **Cloud Firestore:** clientes, projetos, ações, seleções, decisões e auditoria.
- **Cloud Functions 2nd Gen:** validação do PIN, criação de sessão restrita, importação/versionamento e operações administrativas sensíveis.
- **Firebase App Check:** avaliar antes da publicação pública.
- **Storage:** somente se a identidade visual exigir upload de logos ou arquivos; não é necessário para o MVP se as cores forem campos HEX.

### Recomendação de segurança para o PIN

PIN não deve ser um usuário compartilhado permanente. Para o MVP, usar um convite por projeto com PIN temporário, validade, revogação, limite de tentativas, hash armazenado no servidor e sessão Firebase restrita ao `projectId` autorizado. Se o conteúdo for comercialmente sensível ou o acesso precisar ser individual, substituir ou complementar o PIN por convite autenticado e-mail/OIDC.

## 8. Critérios de aceite do MVP

- [ ] Cliente válido entra somente no projeto correto.
- [ ] PIN expirado, revogado ou excedendo tentativas não permite acesso.
- [ ] Cliente consegue selecionar ações e salvar rascunho.
- [ ] Cliente consegue enviar sua seleção para revisão.
- [ ] Administrador consegue marcar cada ação com verde, vermelho ou amarelo.
- [ ] Cliente não consegue alterar decisão administrativa nem acessar outro projeto.
- [ ] Alterações de decisão aparecem no histórico.
- [ ] Filtros por ano, mês e unidade mantêm os números coerentes.
- [ ] App funciona em desktop e celular sem estouro horizontal.
- [ ] Regras do Firestore são testadas com usuário administrador, cliente autorizado, cliente não autorizado e usuário anônimo.
- [ ] Build, lint e fluxo público de convite passam antes da publicação.

## 9. Dados que ainda precisamos definir

### Produto e operação

1. Será um único cliente por vez ou vários clientes/projetos simultâneos?
2. O cliente apenas seleciona ações ou também pode editar texto, datas, unidades e ideias?
3. Depois de enviar, o cliente pode reabrir a seleção ou ela fica bloqueada?
4. O cliente vê o status verde/vermelho/amarelo ou somente a seleção final?
5. O status será por ação individual, por mês ou pelos dois níveis?
6. Haverá prazo de resposta e lembretes manuais?
7. O administrador poderá alterar uma ação depois da aprovação do cliente?

### Acesso e segurança

1. Qual será o nível de sensibilidade do calendário: público, interno ou confidencial?
2. O PIN terá validade definida? Sugestão inicial: convite com validade configurável e revogação manual.
3. O cliente será uma pessoa, uma equipe ou vários usuários do mesmo projeto?
4. Como o administrador fará login: Google Workspace, e-mail/senha ou outro provedor?
5. É necessário recuperar acesso sem intervenção manual?

### Marca e conteúdo

1. As cores enviadas serão da Rede Pedro Pelanda ou de cada cliente/projeto?
2. As cores serão fornecidas em HEX, imagem de referência ou manual de marca?
3. As cores alteram somente a interface ou também o status das ações?
4. O cliente poderá enviar logo e materiais ou isso continuará interno?

### Fonte de dados e publicação

1. A planilha continuará sendo a fonte principal ou será apenas a carga inicial?
2. A importação será manual por versão ou deverá sincronizar automaticamente?
3. Qual projeto Firebase será usado?
4. Qual conta terá acesso administrativo ao Firebase e ao GitHub?
5. Qual região do Firebase deve ser adotada? Sugestão: `southamerica-east1`, sujeita à validação de disponibilidade e custo.
6. Qual domínio será usado para compartilhar o app?
7. Há orçamento/billing habilitado para Hosting, Functions e Firestore?
8. Quem aprova o go-live e qual será o procedimento de rollback?

## 10. Plano de implementação recomendado

### Fase 1 — Produto e contrato

- Validar este PRD.
- Fechar modelo de dados, permissões, estados e fluxo do PIN.
- Confirmar cores e regras de marca.

### Fase 2 — Backend seguro

- Criar projeto Firebase separado por ambiente.
- Implementar Auth administrativo.
- Implementar Firestore, Functions de convite/PIN e regras de segurança.
- Criar testes de autorização e auditoria.

### Fase 3 — Integração do app

- Trocar snapshot estático por leitura do projeto Firebase.
- Implementar seleção do cliente.
- Implementar painel de decisões administrativo.
- Exibir histórico e estado de envio.

### Fase 4 — Publicação controlada

- Rodar lint, build e testes.
- Validar convite real com conta de teste.
- Publicar em ambiente de staging.
- Obter aprovação humana.
- Publicar em produção e verificar o fluxo público.

## 11. Arquitetura de agentes selecionada

### Decisão do orchestration-architect

- **Primário:** reutilizar o workspace atual e os skills existentes, com escopo estrito no app e no backend futuro.
- **Delegação:** usar agentes especialistas somente nas fases independentes; não criar uma nova skill ou plugin.
- **Isolamento:** permanecer no workspace atual para o dashboard; usar ambiente Firebase separado para staging e produção.
- **Risco:** o projeto futuro cruza frontend, autenticação, Firestore e publicação; a definição do contrato deve vir antes da paralelização.

### Perfis recomendados

1. **Product/PRD:** `planning-and-task-breakdown` para transformar decisões em fatias verticais e critérios testáveis.
2. **Frontend/UI:** `frontend-design` + `delightful-frontends` para manter a direção visual e responsividade.
3. **Contrato de dados/API:** `api-and-interface-design` para definir entidades, estados, funções e payloads antes do código.
4. **Firebase/security:** especialista de Firebase/Firestore para regras, Functions, PIN e testes de autorização.
5. **QA:** `code-review-and-quality` + `browser-testing-with-devtools` para revisão de código, fluxo real, console e acessibilidade.
6. **Release:** `ci-cd-and-automation` somente quando staging, rollback e publicação estiverem definidos.

### Ordem de execução

`PRD aprovado → contrato de dados → segurança Firebase → fatia cliente/PIN → fatia seleção → fatia painel admin → QA integrado → staging → aprovação → produção`

## 12. Próxima ação

Validar as perguntas da seção 9 e enviar as cores. Com isso fechado, o próximo artefato será o contrato técnico do Firebase, antes de qualquer criação de projeto, regra, usuário ou deploy.
