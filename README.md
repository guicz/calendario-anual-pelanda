# Calendário Anual Pelanda

App web da Rede Pedro Pelanda para visualização do calendário de marketing 360º de 2027.

## Rotas

- `/` — site institucional em português do Brasil.
- `/dashboard` — dashboard visual com visão anual, mensal e por unidade.
- `/admin` — protótipo do painel editorial.

O dashboard publicado nesta primeira versão usa um snapshot validado da planilha de planejamento. A integração persistente com Firebase está descrita em [`docs/PRD-DASHBOARD-PELANDA.md`](docs/PRD-DASHBOARD-PELANDA.md) e será implementada após a validação do PRD.

## Desenvolvimento

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000/dashboard](http://localhost:3000/dashboard) para visualizar o dashboard.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Qualidade

```bash
pnpm lint
pnpm build
```

O código usa Next.js 16, React 19 e TypeScript. Não há credenciais ou configuração de Firebase neste snapshot.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

