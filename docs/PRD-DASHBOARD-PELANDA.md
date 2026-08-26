# PRD — Dashboard Anual de Marketing Pedro Pelanda

**Status:** requisitos atualizados para validação humana  
**Versão:** 0.2  
**Data:** 26/08/2026  
**Produto:** `calendario-anual-pelanda`  
**Fonte inicial:** [Calendário de Marketing 360º 2027](https://docs.google.com/spreadsheets/d/1YGQpiiTS8J3thN9t0t4N8ITA2UqWJuwbXvdogTscrd4/edit?gid=1847905513#gid=1847905513)

## 1. Resumo

Construir um app web para apresentar o calendário anual de marketing da Rede Pedro Pelanda a clientes convidados, permitindo que cada cliente selecione as ações que deseja manter ou executar. Um painel administrativo interno permitirá revisar cada ação e marcar seu estado operacional:

- **Verde:** será feito;
- **Vermelho:** não será feito;
- **Amarelo:** em análise.

O app atual já entrega a primeira camada visual com visão anual, mensal e por unidade. A próxima fase é transformar o snapshot em um produto de cliente único, com acesso controlado e persistência no Firebase.

### Decisões confirmadas nesta versão

- O MVP terá um único cliente e um único projeto/calendário.
- Administradores entrarão com contas `@dg5.com.br`.
- O cliente usará um PIN permanente, cadastrado internamente.
- O cliente poderá apenas responder, por ação, se ela será feita ou não.
- O cliente poderá visualizar o status administrativo verde, vermelho ou amarelo.
- O sistema registrará que a escolha foi feita pelo cliente.
- A planilha será usada somente como carga inicial.
- Logos e cores serão reutilizados do projeto; não haverá upload de identidade visual no MVP.
- O domínio de produção será `pelanda.dg5.com.br`, hospedado no Firebase e apontado pelo Cloudflare.

## 2. Objetivos

### Objetivos do MVP

1. Compartilhar uma versão identificada do calendário com o cliente definido para o MVP.
2. Permitir entrada do cliente por um PIN permanente, protegido e revogável manualmente.
3. Permitir que o cliente responda somente se cada ação será feita ou não.
4. Permitir que o administrador defina o status operacional de cada ação.
5. Preservar histórico das escolhas e mudanças relevantes.
6. Reutilizar as logos, cores e assets de marca já presentes no projeto.

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

- Acessa o painel por autenticação do Firebase com conta `@dg5.com.br`.
- Gerencia o único cliente e projeto do MVP.
- Importa ou revisa uma versão do calendário.
- Cadastra, altera ou revoga o PIN permanente em caso de necessidade.
- Visualiza escolhas do cliente.
- Marca cada ação como verde, vermelho ou amarelo.
- Registra observação interna e histórico da alteração, incluindo a origem da escolha.

### Cliente convidado

- Acessa somente o projeto para o qual foi convidado.
- Entra por link do app e PIN válido.
- Visualiza a versão do calendário compartilhada.
- Filtra por ano, mês, unidade e categoria.
- Responde somente **será feito** ou **não será feito** para cada ação.
- Confirma/envia as escolhas para o painel administrativo.
- Visualiza o status administrativo verde, vermelho ou amarelo.
- Não edita texto, data, unidade, categoria, orçamento ou qualquer outro dado.
- Não altera o status administrativo.

## 4. Fluxos principais

### Fluxo A — Preparação interna

1. Administrador configura o cliente e o único projeto de calendário.
2. Administrador importa ou associa uma versão da planilha.
3. Sistema cria um snapshot imutável da versão compartilhada.
4. Sistema reutiliza a identidade visual existente e o administrador cadastra o PIN permanente.
5. Sistema gera o link de acesso e registra o convite sem data de expiração.

### Fluxo B — Seleção do cliente

1. Cliente abre o link recebido.
2. Informa o PIN.
3. Sistema valida o convite, aplica limite de tentativas e cria uma sessão restrita.
4. Cliente navega pelo ano, meses e unidades.
5. Cliente responde, para cada ação, **será feito** ou **não será feito**.
6. Cliente confirma e envia as respostas para revisão.
7. Sistema registra data, versão, convite e a origem `client` da escolha.
8. Cliente consegue visualizar os status administrativos já definidos.

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
10. A resposta do cliente deve ter estado explícito: não respondida, será feita, não será feita ou enviada.
11. O histórico deve informar claramente quando uma escolha foi feita pelo cliente.
12. O PIN não expira automaticamente, mas pode ser revogado ou regenerado manualmente pelo administrador.
13. O acesso administrativo deve aceitar somente contas autenticadas cujo e-mail termine em `@dg5.com.br`.

## 6. Modelo funcional inicial

### Entidades

- **Client:** o cliente único, nome, organização e status.
- **Project:** o único calendário compartilhado, ano, versão, prazo opcional e estado.
- **Action:** ação do calendário, mês, data, unidade, categoria, abrangência, conteúdo e mídia paga.
- **ClientSelection:** resposta binária do cliente por ação, autor, data, estado e origem `client`.
- **AdminDecision:** status verde/vermelho/amarelo, observação e histórico.
- **Invite:** código/PIN em hash, projeto, tentativas, revogação e último uso; sem expiração automática.
- **AuditEvent:** alterações relevantes, autor, timestamp e referência do registro.

### Estados sugeridos

**Projeto:** `draft`, `shared`, `client_submitted`, `under_review`, `approved`, `closed`.  
**Seleção:** `unanswered`, `will_do`, `will_not_do`, `submitted`.  
**Decisão:** `analysis`, `approved`, `rejected`.

## 7. Direção técnica Firebase

- **Firebase Hosting:** hospedagem do app web.
- **Firebase Authentication:** autenticação dos administradores com provedor Google e restrição ao domínio `@dg5.com.br`.
- **Cloud Firestore:** clientes, projetos, ações, seleções, decisões e auditoria.
- **Cloud Functions 2nd Gen:** validação do PIN, criação de sessão restrita, importação/versionamento e operações administrativas sensíveis.
- **Firebase App Check:** avaliar antes da publicação pública.
- **Storage:** não necessário para o MVP; logos e cores já existem no projeto.
- **Projeto Firebase informado:** [`clendario-pelanda`](https://console.firebase.google.com/u/0/project/clendario-pelanda/overview).
- **Domínio final:** `pelanda.dg5.com.br`, configurado no Firebase Hosting e apontado pelo Cloudflare.

### Recomendação de segurança para o PIN

O MVP usará um PIN permanente por decisão de produto. O PIN não deve ser armazenado em texto puro: deve ser validado por função segura, armazenado somente como hash, ter limite de tentativas e permitir revogação/regeneração manual. A sessão do cliente deve ficar restrita ao projeto único autorizado. Todos os usuários administrativos de teste devem autenticar com contas `@dg5.com.br`; o frontend não deve confiar apenas no domínio informado pelo navegador.

## 8. Critérios de aceite do MVP

- [ ] Cliente válido entra somente no projeto correto.
- [ ] PIN revogado ou excedendo tentativas não permite acesso; o PIN não expira automaticamente.
- [ ] Cliente consegue responder somente será feito/não será feito por ação.
- [ ] Cliente consegue enviar suas respostas para revisão.
- [ ] Administrador consegue marcar cada ação com verde, vermelho ou amarelo.
- [ ] Cliente consegue visualizar os status administrativos já definidos.
- [ ] Cliente não consegue alterar decisão administrativa nem acessar outro projeto.
- [ ] Escolhas do cliente e alterações de decisão aparecem no histórico com autor/origem.
- [ ] Filtros por ano, mês e unidade mantêm os números coerentes.
- [ ] App funciona em desktop e celular sem estouro horizontal.
- [ ] Regras do Firestore são testadas com usuário administrador, cliente autorizado, cliente não autorizado e usuário anônimo.
- [ ] Build, lint e fluxo público de convite passam antes da publicação.

## 9. Dados que ainda precisamos definir

### Produto e operação — decidido

1. O MVP terá um único cliente e um único projeto.
2. O cliente somente responde será feito/não será feito; não edita outros dados.
3. O cliente poderá visualizar os status verde/vermelho/amarelo definidos pelo administrador.
4. O cliente poderá confirmar e enviar suas respostas; o sistema registrará a origem da escolha.
5. O status administrativo será por ação individual.
6. A planilha será somente carga inicial; não haverá sincronização automática.

### Produto e operação — confirmar antes do contrato técnico

1. Após enviar, o cliente poderá alterar novamente suas respostas ou o envio ficará bloqueado?
2. O PIN será um único PIN compartilhado para o projeto, conforme a leitura atual, ou haverá PINs separados por pessoa?
3. O administrador poderá alterar a decisão depois do envio do cliente? Recomendação: sim, mantendo o histórico.

### Acesso e segurança — decidido

1. Administradores: contas autenticadas com domínio `@dg5.com.br`.
2. Todos os usuários `@dg5.com.br` poderão testar o painel, conforme as regras de autorização.
3. Cliente: acesso por PIN permanente.

### Acesso e segurança — confirmar antes da publicação

1. O login admin será exclusivamente Google Workspace ou também aceitará e-mail/senha?
2. O domínio `dg5.com.br` está configurado no Google/Firebase para permitir o provedor escolhido?
3. Qual conta fará a primeira configuração do Firebase e será responsável pelo billing?

### Marca e conteúdo — decidido

1. O projeto já contém as logos, cores e assets oficiais a serem reutilizados.
2. O cliente não fará upload nem edição de identidade visual.
3. As cores de status continuam fixas: verde será feito, vermelho não será feito e amarelo em análise.

### Fonte de dados e publicação

1. Fonte: a planilha será somente carga inicial; o Firestore será a fonte após a importação.
2. Projeto Firebase: `clendario-pelanda`.
3. Domínio: `pelanda.dg5.com.br`, com DNS gerenciado/apontado pelo Cloudflare para o Firebase Hosting.
4. Conta responsável pelo Firebase, billing e primeira configuração.
5. Região do Firestore/Functions, com recomendação inicial de `southamerica-east1`, sujeita à confirmação de disponibilidade e custo.
6. Quem aprova o go-live e qual será o procedimento de rollback.

## 10. Plano de implementação recomendado

### Fase 1 — Produto e contrato

- Validar este PRD.
- Fechar modelo de dados, permissões, estados e fluxo do PIN.
- Confirmar cores e regras de marca.

### Fase 2 — Backend seguro

- Usar o projeto Firebase informado para o MVP; criar staging separado somente se for necessário e aprovado.
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

Validar os pontos ainda abertos da seção 9, confirmar a conta administradora/billing e o provedor de login. Com isso fechado, o próximo artefato será o contrato técnico do Firebase, antes de qualquer criação de regra, usuário ou deploy.
